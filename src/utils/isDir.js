import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

export default async function isDir(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}
