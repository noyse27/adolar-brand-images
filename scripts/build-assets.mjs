#!/usr/bin/env node

/**
 * Build Adolar brand exports from SVG sources.
 *
 * Requirements:
 *   npm install
 *
 * Usage:
 *   npm run build
 *   npm run build:clean
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const clean = process.argv.includes("--clean");

const sizes = [16, 24, 32, 48, 64, 128, 256, 512];

const variants = [
  "adolar",
  "radio",
  "disco",
  "tv",
  "player",
  "core"
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function removeDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function renderPng(svgPath, pngPath, width, height = width) {
  await ensureDir(path.dirname(pngPath));
  await sharp(svgPath)
    .resize(width, height)
    .png()
    .toFile(pngPath);
}

async function copyIfExists(src, dest) {
  if (await exists(src)) {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
  }
}

async function buildVariantIcon(variant) {
  const svgPath = path.join(ROOT, "variants", variant, `${variant}-icon.svg`);

  if (!(await exists(svgPath))) {
    console.warn(`Skipping ${variant}: missing ${svgPath}`);
    return;
  }

  for (const size of sizes) {
    await renderPng(
      svgPath,
      path.join(ROOT, "exports", "png", variant, `${variant}-icon-${size}.png`),
      size
    );
  }

  // Sharp cannot write multi-size ICO directly. We still generate a 256px png
  // that can be converted to .ico by ImageMagick, Inkscape or a release job.
  await copyIfExists(
    path.join(ROOT, "exports", "png", variant, `${variant}-icon-256.png`),
    path.join(ROOT, "exports", "ico", `${variant}-ico-source-256.png`)
  );
}

async function buildFavicons() {
  const adolarIcon = path.join(ROOT, "variants", "adolar", "adolar-icon.svg");

  if (!(await exists(adolarIcon))) {
    console.warn("Skipping favicons: missing Adolar icon SVG.");
    return;
  }

  await renderPng(adolarIcon, path.join(ROOT, "favicons", "favicon-16x16.png"), 16);
  await renderPng(adolarIcon, path.join(ROOT, "favicons", "favicon-32x32.png"), 32);
  await renderPng(adolarIcon, path.join(ROOT, "favicons", "favicon-48x48.png"), 48);
  await renderPng(adolarIcon, path.join(ROOT, "favicons", "android-chrome-192x192.png"), 192);
  await renderPng(adolarIcon, path.join(ROOT, "favicons", "android-chrome-512x512.png"), 512);
  await renderPng(adolarIcon, path.join(ROOT, "favicons", "apple-touch-icon.png"), 180);
}

async function buildSocialPreview() {
  const svgPath = path.join(ROOT, "social", "github-social-preview.svg");

  if (await exists(svgPath)) {
    await renderPng(svgPath, path.join(ROOT, "social", "github-social-preview.png"), 1280, 640);
  }

  for (const variant of variants) {
    const variantSvg = path.join(ROOT, "social", "variants", `${variant}-social-preview.svg`);
    if (await exists(variantSvg)) {
      await renderPng(
        variantSvg,
        path.join(ROOT, "social", "variants", `${variant}-social-preview.png`),
        1280,
        640
      );
    }
  }
}

async function writeManifest() {
  const manifest = {
    name: "Adolar",
    short_name: "Adolar",
    description: "Adolar WebMediaPlayer",
    start_url: "/",
    display: "standalone",
    background_color: "#070D22",
    theme_color: "#6E44FF",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  await ensureDir(path.join(ROOT, "favicons"));
  await fs.writeFile(
    path.join(ROOT, "favicons", "site.webmanifest"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );
}

async function main() {
  if (clean) {
    await removeDir(path.join(ROOT, "exports", "png"));
    await removeDir(path.join(ROOT, "exports", "ico"));
    await removeDir(path.join(ROOT, "favicons"));
  }

  for (const variant of variants) {
    await buildVariantIcon(variant);
  }

  await buildFavicons();
  await buildSocialPreview();
  await writeManifest();

  console.log("Adolar brand exports built.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
