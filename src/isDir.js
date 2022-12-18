import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';
import { cwd } from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default async function isDir(path) {
  try {
    path = resolve(cwd(), path);
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}
