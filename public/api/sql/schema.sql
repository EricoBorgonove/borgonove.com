CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(180) NOT NULL,
  title_pt VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  excerpt_pt TEXT NULL,
  excerpt_en TEXT NULL,
  content_pt LONGTEXT NOT NULL,
  content_en LONGTEXT NOT NULL,
  cover_image_url VARCHAR(600) NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_posts_slug (slug),
  KEY idx_blog_posts_status_pub (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_users (username, display_name, password_hash, is_active)
VALUES
  (
    'ericoBorgonove',
    'Erico Borgonove',
    '$2y$10$MdKx8S7CwZtMVLStiZ2pzu.ZLbT1XlpIOGQtnE0iBsCN4DijzXPZK',
    1
  )
ON DUPLICATE KEY UPDATE
  display_name = VALUES(display_name),
  password_hash = VALUES(password_hash),
  is_active = VALUES(is_active);

INSERT INTO blog_posts (
  slug,
  title_pt,
  title_en,
  excerpt_pt,
  excerpt_en,
  content_pt,
  content_en,
  status,
  published_at
)
VALUES
  (
    'bem-vindo-ao-blog-tech',
    'Bem-vindo ao blog da Borgonove.Tech',
    'Welcome to the Borgonove.Tech blog',
    'Este espaco vai concentrar artigos tecnicos, trilhas e atualizacoes das disciplinas.',
    'This space will centralize technical articles, study tracks, and discipline updates.',
    'Este e o primeiro post da estrutura nova do blog. A partir daqui, os artigos serao publicados pela area administrativa.',
    'This is the first post of the new blog structure. From here, articles will be published from the administrative area.',
    'published',
    NOW()
  )
ON DUPLICATE KEY UPDATE
  title_pt = VALUES(title_pt),
  title_en = VALUES(title_en),
  excerpt_pt = VALUES(excerpt_pt),
  excerpt_en = VALUES(excerpt_en),
  content_pt = VALUES(content_pt),
  content_en = VALUES(content_en),
  status = VALUES(status),
  published_at = VALUES(published_at);
