<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/_lib/http.php';
require_once dirname(__DIR__) . '/_lib/admin-auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  api_json_response(405, ['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
}

admin_start_session();
$user = admin_current_user();

api_json_response(200, [
  'ok' => true,
  'authenticated' => $user !== null,
  'user' => $user,
]);
