import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';
import { cwd } from 'node:process';

export default async function isFile(path) {
  try {
    path = resolve(cwd(), path);
    const stats = await stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}
