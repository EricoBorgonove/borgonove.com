<?php
header('Content-Type: application/json; charset=utf-8');

function contact_log($message) {
  $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
  $localLog = __DIR__ . '/contact-debug.log';
  if (@file_put_contents($localLog, $line, FILE_APPEND) === false) {
    @file_put_contents(sys_get_temp_dir() . '/borgonove_contact.log', $line, FILE_APPEND);
  }
}

function env_or_default($key, $default = '') {
  $value = getenv($key);
  if ($value === false || $value === null || $value === '') {
    return $default;
  }
  return $value;
}

function smtp_read_response($socket) {
  $response = '';
  while (!feof($socket)) {
    $line = fgets($socket, 515);
    if ($line === false) {
      break;
    }
    $response .= $line;
    // Resposta final: "250 " (código + espaço)
    if (preg_match('/^\d{3}\s/', $line)) {
      break;
    }
  }
  return $response;
}

function smtp_expect_code($response, $expectedCodes) {
  if (!preg_match('/^(\d{3})/m', $response, $matches)) {
    return false;
  }
  $code = (int) $matches[1];
  return in_array($code, $expectedCodes, true);
}

function smtp_send_command($socket, $command, $expectedCodes) {
  if ($command !== null) {
    fwrite($socket, $command . "\r\n");
  }
  $response = smtp_read_response($socket);
  if (!smtp_expect_code($response, $expectedCodes)) {
    throw new Exception('SMTP_ERROR: ' . trim($response));
  }
  return $response;
}

function smtp_send_mail($config, $to, $subject, $body) {
  $host = $config['host'];
  $port = (int) $config['port'];
  $username = $config['username'];
  $password = $config['password'];
  $fromName = $config['from_name'];
  $fromEmail = $config['from_email'];
  $encryption = strtolower($config['encryption']);
  $useAuth = isset($config['auth']) ? (bool) $config['auth'] : true;

  $remoteHost = ($encryption === 'ssl' ? 'ssl://' : '') . $host;
  $context = stream_context_create([
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true,
    ],
  ]);

  $socket = @stream_socket_client(
    $remoteHost . ':' . $port,
    $errno,
    $errstr,
    15,
    STREAM_CLIENT_CONNECT,
    $context
  );

  if (!$socket) {
    throw new Exception('SMTP_CONNECT_FAIL: ' . $errstr . ' (' . $errno . ')');
  }

  stream_set_timeout($socket, 20);

  try {
    smtp_send_command($socket, null, [220]);
    smtp_send_command($socket, 'EHLO borgonove.tech', [250]);

    if ($encryption === 'tls') {
      smtp_send_command($socket, 'STARTTLS', [220]);
      $cryptoOk = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
      if ($cryptoOk !== true) {
        throw new Exception('SMTP_STARTTLS_FAIL');
      }
      smtp_send_command($socket, 'EHLO borgonove.tech', [250]);
    }

    if ($useAuth) {
      smtp_send_command($socket, 'AUTH LOGIN', [334]);
      smtp_send_command($socket, base64_encode($username), [334]);
      smtp_send_command($socket, base64_encode($password), [235]);
    }

    smtp_send_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
    smtp_send_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
    smtp_send_command($socket, 'DATA', [354]);

    $subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
      'Date: ' . date('r'),
      'From: ' . $fromName . ' <' . $fromEmail . '>',
      'To: <' . $to . '>',
      'Reply-To: ' . $fromEmail,
      'Subject: ' . $subjectEncoded,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      'X-Mailer: PHP/' . phpversion(),
    ];

    $message = implode("\r\n", $headers) . "\r\n\r\n" . str_replace(["\r\n", "\r", "\n"], "\r\n", $body);
    // Dot-stuffing (RFC 5321)
    $message = preg_replace('/^\./m', '..', $message);

    fwrite($socket, $message . "\r\n.\r\n");
    $dataResponse = smtp_read_response($socket);
    if (!smtp_expect_code($dataResponse, [250])) {
      throw new Exception('SMTP_DATA_FAIL: ' . trim($dataResponse));
    }

    smtp_send_command($socket, 'QUIT', [221]);
    fclose($socket);
    return true;
  } catch (Exception $e) {
    fclose($socket);
    throw $e;
  }
}

function php_mail_fallback($to, $subject, $body, $fromEmail) {
  $subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $headers = [];
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'Content-Type: text/plain; charset=UTF-8';
  $headers[] = 'Content-Transfer-Encoding: 8bit';
  $headers[] = "From: Borgonove Tech <{$fromEmail}>";
  $headers[] = "Reply-To: {$fromEmail}";
  $headers[] = "Return-Path: {$fromEmail}";
  $headers[] = 'X-Mailer: PHP/' . phpversion();

  $headersString = implode("\r\n", $headers);
  $sent = @mail($to, $subjectEncoded, $body, $headersString, "-f{$fromEmail}");
  if ($sent) {
    return true;
  }
  return @mail($to, $subjectEncoded, $body, $headersString);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
  exit;
}

$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');
$website = trim($_POST['website'] ?? '');

if ($website !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

$nome = preg_replace("/[\r\n]+/", ' ', $nome);
$email = preg_replace("/[\r\n]+/", '', $email);

if ($nome === '' || $email === '' || $mensagem === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'CAMPOS_OBRIGATORIOS']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'EMAIL_INVALIDO']);
  exit;
}

$mensagemLength = function_exists('mb_strlen') ? mb_strlen($mensagem) : strlen($mensagem);
if ($mensagemLength > 2000) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'MENSAGEM_LONGA']);
  exit;
}

$smtpConfig = [
  'host' => env_or_default('CONTACT_SMTP_HOST', 'localhost'),
  'port' => env_or_default('CONTACT_SMTP_PORT', '587'),
  'username' => env_or_default('CONTACT_SMTP_USER', 'contato@borgonove.tech'),
  'password' => env_or_default('CONTACT_SMTP_PASS', ''),
  'from_name' => env_or_default('CONTACT_FROM_NAME', 'Borgonove Tech'),
  'from_email' => env_or_default('CONTACT_FROM_EMAIL', 'contato@borgonove.tech'),
  'encryption' => env_or_default('CONTACT_SMTP_ENCRYPTION', 'tls'), // tls | ssl | none
  'auth' => env_or_default('CONTACT_SMTP_AUTH', '1') !== '0',
  'debug' => env_or_default('CONTACT_SMTP_DEBUG', '0') === '1',
];

$localConfigFile = __DIR__ . '/contact-config.php';
if (file_exists($localConfigFile)) {
  $localConfig = include $localConfigFile;
  if (is_array($localConfig)) {
    $smtpConfig = array_merge($smtpConfig, $localConfig);
  }
}

if (!empty($smtpConfig['auth']) && $smtpConfig['password'] === '') {
  contact_log('SMTP_CONFIG_INCOMPLETA senha vazia');
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'SMTP_CONFIG_INCOMPLETA']);
  exit;
}

$to = 'contato@borgonove.tech';
$subject = "Contato via site - {$nome}";
$body = "Nome: {$nome}\r\nEmail: {$email}\r\n\r\n{$mensagem}\r\n";

try {
  $attempts = [$smtpConfig];
  $hostLower = strtolower(trim((string) $smtpConfig['host']));
  $portNum = (int) $smtpConfig['port'];
  $encLower = strtolower(trim((string) $smtpConfig['encryption']));
  $fromEmailLower = strtolower(trim((string) $smtpConfig['from_email']));
  $fromDomain = '';
  if (strpos($fromEmailLower, '@') !== false) {
    $parts = explode('@', $fromEmailLower);
    $fromDomain = end($parts);
  }

  // Fallback útil para cPanel/HostGator: localhost sem auth na porta 25.
  if ($hostLower === 'localhost' && (($portNum === 587 && $encLower === 'tls') || ($portNum === 465 && $encLower === 'ssl'))) {
    $fallback = $smtpConfig;
    $fallback['port'] = 25;
    $fallback['encryption'] = 'none';
    $fallback['auth'] = false;
    $fallback['username'] = '';
    $fallback['password'] = '';
    $attempts[] = $fallback;
  }

  // Fallback extra: tenta host de e-mail do próprio domínio.
  if ($fromDomain !== '') {
    $autoHosts = [
      ['host' => 'mail.' . $fromDomain, 'port' => 465, 'encryption' => 'ssl', 'auth' => true],
      ['host' => 'mail.' . $fromDomain, 'port' => 587, 'encryption' => 'tls', 'auth' => true],
      ['host' => $fromDomain, 'port' => 465, 'encryption' => 'ssl', 'auth' => true],
      ['host' => $fromDomain, 'port' => 587, 'encryption' => 'tls', 'auth' => true],
    ];

    foreach ($autoHosts as $auto) {
      $candidate = $smtpConfig;
      $candidate['host'] = $auto['host'];
      $candidate['port'] = $auto['port'];
      $candidate['encryption'] = $auto['encryption'];
      $candidate['auth'] = $auto['auth'];

      $alreadyExists = false;
      foreach ($attempts as $existing) {
        if (
          strtolower(trim((string) $existing['host'])) === strtolower(trim((string) $candidate['host'])) &&
          (int) $existing['port'] === (int) $candidate['port'] &&
          strtolower(trim((string) $existing['encryption'])) === strtolower(trim((string) $candidate['encryption']))
        ) {
          $alreadyExists = true;
          break;
        }
      }

      if (!$alreadyExists) {
        $attempts[] = $candidate;
      }
    }
  }

  $lastError = null;
  foreach ($attempts as $index => $cfg) {
    try {
      smtp_send_mail($cfg, $to, $subject, $body);
      contact_log("ENVIO_OK tentativa=" . ($index + 1) . " email={$email}");
      echo json_encode(['ok' => true]);
      exit;
    } catch (Exception $inner) {
      $lastError = $inner;
      $hostInfo = strtolower(trim((string) ($cfg['host'] ?? '')));
      $portInfo = (int) ($cfg['port'] ?? 0);
      $encInfo = strtolower(trim((string) ($cfg['encryption'] ?? 'none')));
      $authInfo = !empty($cfg['auth']) ? '1' : '0';
      contact_log(
        "SMTP_TENTATIVA_FALHOU tentativa=" . ($index + 1) .
        " host={$hostInfo} port={$portInfo} enc={$encInfo} auth={$authInfo} detalhe=" . $inner->getMessage()
      );
    }
  }

  if ($lastError) {
    throw $lastError;
  }

  contact_log("ENVIO_OK email={$email}");
  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  contact_log("SMTP_FAIL email={$email} detalhe=" . $e->getMessage() . " tentando_fallback_mail=1");

  $fallbackOk = php_mail_fallback($to, $subject, $body, $smtpConfig['from_email']);
  if ($fallbackOk) {
    contact_log("FALLBACK_MAIL_OK email={$email}");
    echo json_encode(['ok' => true, 'fallback' => 'php_mail']);
    exit;
  }

  contact_log("FALLBACK_MAIL_FAIL email={$email}");
  http_response_code(500);
  if (!empty($smtpConfig['debug'])) {
    echo json_encode([
      'ok' => false,
      'error' => 'SMTP_ENVIO_FALHOU',
      'message' => $e->getMessage(),
    ]);
  } else {
    echo json_encode(['ok' => false, 'error' => 'SMTP_ENVIO_FALHOU']);
  }
}
