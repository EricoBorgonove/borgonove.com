import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const requiredCopies = [
  { from: path.join(root, "public", ".htaccess"), to: path.join(distDir, ".htaccess") },
  { from: path.join(root, "public", "404.shtml"), to: path.join(distDir, "404.shtml") },
];

function fail(message) {
  console.error(`[cpanel-dist] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fail("dist directory was not found. Run vite build before this script.");
}

for (const file of requiredCopies) {
  if (!fs.existsSync(file.from)) {
    fail(`required source file is missing: ${path.relative(root, file.from)}`);
  }
  fs.copyFileSync(file.from, file.to);
}

const indexPath = path.join(distDir, "index.html");
const htaccessPath = path.join(distDir, ".htaccess");
const notFoundPath = path.join(distDir, "404.shtml");

for (const filePath of [indexPath, htaccessPath, notFoundPath]) {
  if (!fs.existsSync(filePath)) {
    fail(`required deploy file is missing: ${path.relative(root, filePath)}`);
  }
}

const htaccess = fs.readFileSync(htaccessPath, "utf8");
const requiredRules = [
  "ErrorDocument 404 /404.shtml",
  "Options -MultiViews",
  "AddType application/javascript .js .mjs",
  "Header set Cache-Control \"no-cache, no-store, must-revalidate\"",
  "RewriteEngine On",
  "RewriteRule . /index.html [END]",
];

for (const rule of requiredRules) {
  if (!htaccess.includes(rule)) {
    fail(`dist/.htaccess is missing rule: ${rule}`);
  }
}

console.log("[cpanel-dist] dist contains index.html, .htaccess, and 404.shtml for cPanel.");
