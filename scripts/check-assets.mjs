#!/usr/bin/env node

/**
 * Lightweight repository sanity checks.
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const required = [
  "README.md",
  "logo/adolar-logo.svg",
  "rocket/rocket-mz1.svg",
  "animations/rocket-mz1-state-machine.svg",
  "variants/manifest.json",
  "docs/styleguide.md",
  "docs/variant-system.md",
  "docs/animation-system.md"
];

let failed = false;

for (const rel of required) {
  const file = path.join(ROOT, rel);

  try {
    await fs.access(file);
    console.log(`ok: ${rel}`);
  } catch {
    console.error(`missing: ${rel}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("All required Adolar brand files are present.");
