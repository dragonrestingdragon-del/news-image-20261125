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

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));

console.log(`news-image-20261125: wrote ${join(outDir, 'entry.png')}`);
