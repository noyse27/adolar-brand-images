#!/usr/bin/env node

/**
 * Lightweight repository sanity checks.
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "package.json",
  "package-lock.json",
  ".github/workflows/build-assets.yml",
  "logo/adolar-logo.svg",
  "rocket/rocket-mz1.svg",
  "animations/rocket-mz1-state-machine.svg",
  "variants/manifest.json",
  "social/github-social-preview.svg",
  "docs/styleguide.md",
  "docs/build-automation.md",
  "docs/variant-system.md",
  "docs/animation-system.md"
];

let failed = false;

async function exists(rel) {
  const file = path.join(ROOT, rel);

  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function requireFile(rel) {
  if (await exists(rel)) {
    console.log(`ok: ${rel}`);
    return;
  }

  console.error(`missing: ${rel}`);
  failed = true;
}

async function readJson(rel) {
  return JSON.parse(await fs.readFile(path.join(ROOT, rel), "utf8"));
}

for (const rel of requiredFiles) {
  await requireFile(rel);
}

let variantNames = [];

try {
  const manifest = await readJson("variants/manifest.json");
  variantNames = Object.keys(manifest);
} catch (error) {
  console.error(`invalid: variants/manifest.json (${error.message})`);
  failed = true;
}

for (const variant of variantNames) {
  await requireFile(`variants/${variant}/README.md`);
  await requireFile(`variants/${variant}/${variant}-icon.svg`);
  await requireFile(`social/variants/${variant}-social-preview.svg`);
}

if (failed) {
  process.exit(1);
}

console.log("All required Adolar brand files are present.");
