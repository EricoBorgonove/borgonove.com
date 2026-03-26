<?php
declare(strict_types=1);

function db_env_or_default(string $key, string $default = ''): string
{
  $value = getenv($key);
  if ($value === false || $value === null || trim((string) $value) === '') {
    return $default;
  }
  return trim((string) $value);
}

function db_load_config(): array
{
  $config = [
    'host' => db_env_or_default('DB_HOST', 'localhost'),
    'port' => db_env_or_default('DB_PORT', '3306'),
    'name' => db_env_or_default('DB_NAME', ''),
    'user' => db_env_or_default('DB_USER', ''),
    'password' => db_env_or_default('DB_PASSWORD', ''),
    'charset' => db_env_or_default('DB_CHARSET', 'utf8mb4'),
  ];

  $localConfigFile = dirname(__DIR__) . '/db-config.php';
  if (file_exists($localConfigFile)) {
    $localConfig = include $localConfigFile;
    if (is_array($localConfig)) {
      $config = array_merge($config, $localConfig);
    }
  }

  return $config;
}

function db_connect(): PDO
{
  static $pdo = null;
  if ($pdo instanceof PDO) {
    return $pdo;
  }

  $config = db_load_config();
  if (
    trim((string) $config['name']) === '' ||
    trim((string) $config['user']) === '' ||
    trim((string) $config['host']) === ''
  ) {
    throw new RuntimeException('DB_CONFIG_INCOMPLETA');
  }

  $dsn = sprintf(
    'mysql:host=%s;port=%s;dbname=%s;charset=%s',
    $config['host'],
    $config['port'],
    $config['name'],
    $config['charset']
  );

  $pdo = new PDO(
    $dsn,
    (string) $config['user'],
    (string) $config['password'],
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ]
  );

  return $pdo;
}
