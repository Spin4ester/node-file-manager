import { resolve } from 'node:path';
import { open } from 'node:fs/promises';
import displayCurDir from '../utils/displayCurDir.js';
import { cwd } from 'node:process';

export default async function handleAdd([fileName]) {
  let addFile;
  try {
    const path = resolve(cwd(), fileName);
    addFile = await open(path, 'wx');
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  } finally {
    addFile?.close();
  }
}
