#!/usr/bin/env node
/**
 * PT. Selatox Bio Pharma — Project initialization script.
 * Run: npm run init:selatox (or node scripts/init-selatox.js)
 */

const fs = require("fs");
const path = require("path");

const DIRS = [
  "app/[locale]/home/(sections)",
  "src/components/ui",
  "src/components/layout",
  "src/lib",
  "src/hooks",
  "src/styles",
  "public/assets",
  "scripts",
];

const root = path.resolve(__dirname, "..");

console.log("Selatox Bio Pharma — Initializing directory structure...\n");

DIRS.forEach((dir) => {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    console.log("  Created:", dir);
  }
});

console.log("\nDone. Run: npm install && npm run dev\n");
