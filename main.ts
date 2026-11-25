// news-image-20261125 — "Sum up 25 November's world news in one image"
//
// The artwork lives in this repository as entry.png, beside this file.
// The program's whole job is to deliver those exact bytes to the output
// directory as entry.png: it locates its own folder, creates the output
// directory when missing, and copies the file. No network, no clock, no
// randomness — every run writes byte-identical output.
//
// Run locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader's container the output directory defaults to /output.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(here, 'entry.png');
const outputPath = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

// Verify the copy landed whole: the written file must be exactly as large
// as the source artwork. A short or truncated copy would hand the judge a
// broken image, so fail loudly instead of reporting success.
const sourceBytes = statSync(sourcePath).size;
const writtenBytes = statSync(outputPath).size;
if (writtenBytes !== sourceBytes) {
  console.error(
    `news-image-20261125: copy verification failed: ${outputPath} is ${writtenBytes} bytes, source ${sourcePath} is ${sourceBytes} bytes`,
  );
  process.exit(1);
}

console.log(`news-image-20261125: wrote ${outputPath} (${writtenBytes} bytes, verified against source)`);
