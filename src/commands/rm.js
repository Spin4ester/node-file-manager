import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import displayCurDir from '../utils/displayCurDir.js';

export default async function handleRm([path]) {
  try {
    path = resolve(path);
    await unlink(path);
    console.log('File successfully removed!');
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
