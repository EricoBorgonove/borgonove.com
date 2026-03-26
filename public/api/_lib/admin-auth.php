<?php
declare(strict_types=1);

require_once __DIR__ . '/http.php';

function admin_is_https(): bool
{
  if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    return true;
  }

  $forwardedProto = strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? ''));
  return $forwardedProto === 'https';
}

function admin_start_session(): void
{
  if (session_status() === PHP_SESSION_ACTIVE) {
    return;
  }

  session_name('borgonove_admin');
  session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => admin_is_https(),
    'httponly' => true,
    'samesite' => 'Lax',
  ]);

  session_start();
}

function admin_current_user(): ?array
{
  if (empty($_SESSION['admin_user']) || !is_array($_SESSION['admin_user'])) {
    return null;
  }

  $user = $_SESSION['admin_user'];
  if (!isset($user['id'], $user['username'])) {
    return null;
  }

  return [
    'id' => (int) $user['id'],
    'username' => (string) $user['username'],
    'displayName' => (string) ($user['displayName'] ?? $user['username']),
  ];
}

function admin_require_user(): array
{
  $user = admin_current_user();
  if ($user === null) {
    api_json_response(401, [
      'ok' => false,
      'error' => 'ADMIN_NAO_AUTENTICADO',
    ]);
  }

  return $user;
}

function admin_login_user(array $user): array
{
  session_regenerate_id(true);

  $sessionUser = [
    'id' => (int) $user['id'],
    'username' => (string) $user['username'],
    'displayName' => (string) ($user['display_name'] ?? $user['username']),
  ];

  $_SESSION['admin_user'] = $sessionUser;

  return [
    'id' => $sessionUser['id'],
    'username' => $sessionUser['username'],
    'displayName' => $sessionUser['displayName'],
  ];
}

function admin_logout_user(): void
{
  $_SESSION = [];

  if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(
      session_name(),
      '',
      [
        'expires' => time() - 3600,
        'path' => $params['path'] ?? '/',
        'domain' => $params['domain'] ?? '',
        'secure' => (bool) ($params['secure'] ?? false),
        'httponly' => (bool) ($params['httponly'] ?? true),
        'samesite' => $params['samesite'] ?? 'Lax',
      ]
    );
  }

  session_destroy();
}
