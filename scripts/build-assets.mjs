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
const icoSizes = [16, 32, 48, 256];
const skipped = [];

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

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function readVariants() {
  const manifestPath = path.join(ROOT, "variants", "manifest.json");

  if (!(await exists(manifestPath))) {
    throw new Error(`Missing variant manifest: ${manifestPath}`);
  }

  return Object.keys(await readJson(manifestPath));
}

async function writeIco(pngPaths, icoPath) {
  const images = await Promise.all(
    pngPaths.map(async ({ size, file }) => ({
      size,
      data: await fs.readFile(file)
    }))
  );

  const headerSize = 6;
  const entrySize = 16;
  let imageOffset = headerSize + images.length * entrySize;
  const header = Buffer.alloc(headerSize);
  const entries = [];

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  for (const image of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 0);
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.data.length, 8);
    entry.writeUInt32LE(imageOffset, 12);
    entries.push(entry);
    imageOffset += image.data.length;
  }

  await ensureDir(path.dirname(icoPath));
  await fs.writeFile(
    icoPath,
    Buffer.concat([header, ...entries, ...images.map((image) => image.data)])
  );
}

async function buildVariantIcon(variant) {
  const svgPath = path.join(ROOT, "variants", variant, `${variant}-icon.svg`);

  if (!(await exists(svgPath))) {
    skipped.push(`variant icon "${variant}" missing source SVG at ${svgPath}`);
    return;
  }

  for (const size of sizes) {
    await renderPng(
      svgPath,
      path.join(ROOT, "exports", "png", variant, `${variant}-icon-${size}.png`),
      size
    );
  }

  await writeIco(
    icoSizes.map((size) => ({
      size,
      file: path.join(ROOT, "exports", "png", variant, `${variant}-icon-${size}.png`)
    })),
    path.join(ROOT, "exports", "ico", `${variant}.ico`)
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
  const variants = await readVariants();

  if (await exists(svgPath)) {
    await renderPng(svgPath, path.join(ROOT, "social", "github-social-preview.png"), 1280, 640);
  } else {
    skipped.push(`main social preview missing source SVG at ${svgPath}`);
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
    } else {
      skipped.push(`social preview "${variant}" missing source SVG at ${variantSvg}`);
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
  const variants = await readVariants();

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

  for (const item of skipped) {
    console.warn(`Skipped optional asset: ${item}`);
  }

  console.log("Adolar brand exports built.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
