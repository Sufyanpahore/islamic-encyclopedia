#!/usr/bin/env node
"use strict";

// Downloads the raw upstream Urdu edition payloads without changing their contents.
// Run from the repository root: node scripts/import-quran-urdu.js
// Requires Node.js 18+.

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const manifestPath = path.join(__dirname, "..", "data/upstream/quran-fawaz/urdu-editions.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const root = path.resolve(__dirname, "..");
const concurrency = 3;

async function download(item) {
  const destination = path.join(root, item.output);
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  const response = await fetch(item.url, {
    headers: { "user-agent": "Islamic-Encyclopedia-Upstream-Importer/1.0" }
  });
  if (!response.ok) throw new Error(item.id + ": HTTP " + response.status);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) throw new Error(item.id + ": empty response");

  // Validate JSON, but write the original response bytes unchanged.
  JSON.parse(bytes.toString("utf8"));
  fs.writeFileSync(destination, bytes);

  return {
    id: item.id,
    path: item.output,
    bytes: bytes.length,
    sha256: crypto.createHash("sha256").update(bytes).digest("hex")
  };
}

async function main() {
  const results = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, manifest.editions.length) }, async () => {
    while (next < manifest.editions.length) {
      const item = manifest.editions[next++];
      results.push(await download(item));
      console.log("Downloaded " + item.id);
    }
  });
  await Promise.all(workers);

  results.sort((a, b) => a.id.localeCompare(b.id));
  const report = {
    source_repository: manifest.source_repository,
    source_ref: manifest.source_ref,
    imported_at: new Date().toISOString(),
    count: results.length,
    files: results
  };
  const reportPath = path.join(root, "data/upstream/quran-fawaz/urdu-import-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log("Verified " + results.length + " Urdu editions. Report: " + path.relative(root, reportPath));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
