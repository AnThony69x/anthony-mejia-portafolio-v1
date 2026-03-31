import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Generates a unique build id to bust SW caches every deploy
const buildId = process.env.BUILD_ID || new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
const swPath = join(process.cwd(), 'public', 'sw.js');

const original = readFileSync(swPath, 'utf8');
const updated = original.replace(/const BUILD_ID = '.*?';/, `const BUILD_ID = '${buildId}';`);

if (updated === original) {
  throw new Error('BUILD_ID placeholder not found in public/sw.js');
}

writeFileSync(swPath, updated, 'utf8');
console.log(`SW BUILD_ID set to ${buildId}`);
