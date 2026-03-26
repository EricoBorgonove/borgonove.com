<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/_lib/http.php';
require_once dirname(__DIR__) . '/_lib/db.php';
require_once dirname(__DIR__) . '/_lib/admin-auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  api_json_response(405, ['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
}

admin_start_session();

$input = api_read_input();
$username = trim((string) ($input['username'] ?? ''));
$password = (string) ($input['password'] ?? '');

if ($username === '' || $password === '') {
  api_json_response(400, ['ok' => false, 'error' => 'CREDENCIAIS_OBRIGATORIAS']);
}

try {
  $pdo = db_connect();
  $statement = $pdo->prepare(
    'SELECT id, username, display_name, password_hash, is_active
     FROM admin_users
     WHERE username = :username
     LIMIT 1'
  );
  $statement->execute(['username' => $username]);
  $user = $statement->fetch();

  $isValid =
    is_array($user) &&
    (int) ($user['is_active'] ?? 0) === 1 &&
    password_verify($password, (string) ($user['password_hash'] ?? ''));

  if (!$isValid) {
    usleep(250000);
    api_json_response(401, ['ok' => false, 'error' => 'LOGIN_INVALIDO']);
  }

  $authUser = admin_login_user($user);

  api_json_response(200, [
    'ok' => true,
    'authenticated' => true,
    'user' => $authUser,
  ]);
} catch (Throwable $exception) {
  api_json_response(500, ['ok' => false, 'error' => 'ADMIN_LOGIN_ERRO']);
}
