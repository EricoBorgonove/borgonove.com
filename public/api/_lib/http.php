<?php
declare(strict_types=1);

function api_json_response(int $status, array $payload): void
{
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function api_read_input(): array
{
  $contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
  $raw = file_get_contents('php://input');

  if (str_contains($contentType, 'application/json')) {
    $decoded = json_decode($raw ?: '[]', true);
    return is_array($decoded) ? $decoded : [];
  }

  if (!empty($_POST)) {
    return $_POST;
  }

  if (str_contains($contentType, 'application/x-www-form-urlencoded')) {
    parse_str($raw ?: '', $parsed);
    return is_array($parsed) ? $parsed : [];
  }

  return [];
}

function api_slugify(string $value): string
{
  $value = trim($value);
  if ($value === '') {
    return 'post';
  }

  if (function_exists('iconv')) {
    $normalized = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
    if ($normalized !== false) {
      $value = $normalized;
    }
  }

  $value = strtolower($value);
  $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
  $value = trim($value, '-');

  return $value !== '' ? $value : 'post';
}
