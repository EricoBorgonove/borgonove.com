<?php
declare(strict_types=1);

require_once dirname(dirname(__DIR__)) . '/_lib/http.php';
require_once dirname(dirname(__DIR__)) . '/_lib/db.php';
require_once dirname(dirname(__DIR__)) . '/_lib/admin-auth.php';

function admin_blog_normalize_status(string $status): string
{
  $normalized = strtolower(trim($status));
  return in_array($normalized, ['draft', 'published'], true) ? $normalized : 'draft';
}

function admin_blog_normalize_datetime(?string $value): ?string
{
  $raw = trim((string) $value);
  if ($raw === '') {
    return null;
  }

  $timestamp = strtotime($raw);
  if ($timestamp === false) {
    return null;
  }

  return date('Y-m-d H:i:s', $timestamp);
}

function admin_blog_unique_slug(PDO $pdo, string $baseSlug, ?int $ignoreId = null): string
{
  $candidate = $baseSlug !== '' ? $baseSlug : 'post';
  $counter = 2;

  while (true) {
    if ($ignoreId !== null) {
      $query = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug AND id <> :id LIMIT 1');
      $query->execute(['slug' => $candidate, 'id' => $ignoreId]);
    } else {
      $query = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug LIMIT 1');
      $query->execute(['slug' => $candidate]);
    }

    if (!$query->fetch()) {
      return $candidate;
    }

    $candidate = $baseSlug . '-' . $counter;
    $counter++;
  }
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], true)) {
  api_json_response(405, ['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
}

admin_start_session();
admin_require_user();

try {
  $pdo = db_connect();
  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
    $statement = $pdo->query(
      "SELECT
        id,
        slug,
        title_pt,
        title_en,
        excerpt_pt,
        excerpt_en,
        content_pt,
        content_en,
        cover_image_url,
        status,
        published_at,
        created_at,
        updated_at
      FROM blog_posts
      ORDER BY created_at DESC, id DESC"
    );
    api_json_response(200, ['ok' => true, 'posts' => $statement->fetchAll()]);
  }

  $input = api_read_input();

  if ($method === 'POST') {
    $titlePt = trim((string) ($input['title_pt'] ?? ''));
    $titleEn = trim((string) ($input['title_en'] ?? ''));
    $excerptPt = trim((string) ($input['excerpt_pt'] ?? ''));
    $excerptEn = trim((string) ($input['excerpt_en'] ?? ''));
    $contentPt = trim((string) ($input['content_pt'] ?? ''));
    $contentEn = trim((string) ($input['content_en'] ?? ''));
    $coverImageUrl = trim((string) ($input['cover_image_url'] ?? ''));
    $status = admin_blog_normalize_status((string) ($input['status'] ?? 'draft'));
    $publishedAt = admin_blog_normalize_datetime($input['published_at'] ?? null);

    if ($titlePt === '' && $titleEn === '') {
      api_json_response(400, ['ok' => false, 'error' => 'TITULO_OBRIGATORIO']);
    }

    if ($contentPt === '' && $contentEn === '') {
      api_json_response(400, ['ok' => false, 'error' => 'CONTEUDO_OBRIGATORIO']);
    }

    if ($status === 'published' && $publishedAt === null) {
      $publishedAt = date('Y-m-d H:i:s');
    }
    if ($status === 'draft') {
      $publishedAt = null;
    }

    $rawSlug = trim((string) ($input['slug'] ?? ''));
    if ($rawSlug === '') {
      $rawSlug = $titlePt !== '' ? $titlePt : $titleEn;
    }
    $slug = admin_blog_unique_slug($pdo, api_slugify($rawSlug));

    $insert = $pdo->prepare(
      'INSERT INTO blog_posts
      (
        slug,
        title_pt,
        title_en,
        excerpt_pt,
        excerpt_en,
        content_pt,
        content_en,
        cover_image_url,
        status,
        published_at
      ) VALUES (
        :slug,
        :title_pt,
        :title_en,
        :excerpt_pt,
        :excerpt_en,
        :content_pt,
        :content_en,
        :cover_image_url,
        :status,
        :published_at
      )'
    );

    $insert->execute([
      'slug' => $slug,
      'title_pt' => $titlePt,
      'title_en' => $titleEn,
      'excerpt_pt' => $excerptPt,
      'excerpt_en' => $excerptEn,
      'content_pt' => $contentPt,
      'content_en' => $contentEn,
      'cover_image_url' => $coverImageUrl !== '' ? $coverImageUrl : null,
      'status' => $status,
      'published_at' => $publishedAt,
    ]);

    api_json_response(201, ['ok' => true, 'id' => (int) $pdo->lastInsertId()]);
  }

  if ($method === 'PUT' || $method === 'PATCH') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
      api_json_response(400, ['ok' => false, 'error' => 'ID_INVALIDO']);
    }

    $existingQuery = $pdo->prepare('SELECT id, slug FROM blog_posts WHERE id = :id LIMIT 1');
    $existingQuery->execute(['id' => $id]);
    $existing = $existingQuery->fetch();
    if (!$existing) {
      api_json_response(404, ['ok' => false, 'error' => 'POST_NAO_ENCONTRADO']);
    }

    $titlePt = trim((string) ($input['title_pt'] ?? ''));
    $titleEn = trim((string) ($input['title_en'] ?? ''));
    $excerptPt = trim((string) ($input['excerpt_pt'] ?? ''));
    $excerptEn = trim((string) ($input['excerpt_en'] ?? ''));
    $contentPt = trim((string) ($input['content_pt'] ?? ''));
    $contentEn = trim((string) ($input['content_en'] ?? ''));
    $coverImageUrl = trim((string) ($input['cover_image_url'] ?? ''));
    $status = admin_blog_normalize_status((string) ($input['status'] ?? 'draft'));
    $publishedAt = admin_blog_normalize_datetime($input['published_at'] ?? null);

    if ($titlePt === '' && $titleEn === '') {
      api_json_response(400, ['ok' => false, 'error' => 'TITULO_OBRIGATORIO']);
    }

    if ($contentPt === '' && $contentEn === '') {
      api_json_response(400, ['ok' => false, 'error' => 'CONTEUDO_OBRIGATORIO']);
    }

    if ($status === 'published' && $publishedAt === null) {
      $publishedAt = date('Y-m-d H:i:s');
    }
    if ($status === 'draft') {
      $publishedAt = null;
    }

    $requestedSlug = trim((string) ($input['slug'] ?? ''));
    if ($requestedSlug === '') {
      $requestedSlug = $titlePt !== '' ? $titlePt : $titleEn;
    }
    $slug = admin_blog_unique_slug($pdo, api_slugify($requestedSlug), $id);

    $update = $pdo->prepare(
      'UPDATE blog_posts SET
        slug = :slug,
        title_pt = :title_pt,
        title_en = :title_en,
        excerpt_pt = :excerpt_pt,
        excerpt_en = :excerpt_en,
        content_pt = :content_pt,
        content_en = :content_en,
        cover_image_url = :cover_image_url,
        status = :status,
        published_at = :published_at
      WHERE id = :id'
    );

    $update->execute([
      'id' => $id,
      'slug' => $slug,
      'title_pt' => $titlePt,
      'title_en' => $titleEn,
      'excerpt_pt' => $excerptPt,
      'excerpt_en' => $excerptEn,
      'content_pt' => $contentPt,
      'content_en' => $contentEn,
      'cover_image_url' => $coverImageUrl !== '' ? $coverImageUrl : null,
      'status' => $status,
      'published_at' => $publishedAt,
    ]);

    api_json_response(200, ['ok' => true, 'id' => $id]);
  }

  if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? ($input['id'] ?? 0));
    if ($id <= 0) {
      api_json_response(400, ['ok' => false, 'error' => 'ID_INVALIDO']);
    }

    $delete = $pdo->prepare('DELETE FROM blog_posts WHERE id = :id');
    $delete->execute(['id' => $id]);

    api_json_response(200, ['ok' => true, 'deleted' => $delete->rowCount() > 0]);
  }
} catch (Throwable $exception) {
  api_json_response(500, ['ok' => false, 'error' => 'BLOG_ADMIN_ERRO']);
}
