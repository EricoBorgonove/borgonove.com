<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/_lib/http.php';
require_once dirname(__DIR__) . '/_lib/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  api_json_response(405, ['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
}

try {
  $pdo = db_connect();
  $slug = trim((string) ($_GET['slug'] ?? ''));

  if ($slug !== '') {
    $statement = $pdo->prepare(
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
      WHERE slug = :slug
        AND status = 'published'
        AND (published_at IS NULL OR published_at <= NOW())
      LIMIT 1"
    );
    $statement->execute(['slug' => $slug]);
    $post = $statement->fetch();

    if (!$post) {
      api_json_response(404, ['ok' => false, 'error' => 'POST_NAO_ENCONTRADO']);
    }

    api_json_response(200, ['ok' => true, 'post' => $post]);
  }

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
    WHERE status = 'published'
      AND (published_at IS NULL OR published_at <= NOW())
    ORDER BY COALESCE(published_at, created_at) DESC, id DESC"
  );

  api_json_response(200, ['ok' => true, 'posts' => $statement->fetchAll()]);
} catch (Throwable $exception) {
  api_json_response(500, ['ok' => false, 'error' => 'BLOG_LISTAGEM_ERRO']);
}
