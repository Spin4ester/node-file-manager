import * as fs from 'fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import displayCurDir from './displayCurDir.js';

export default async function handleCat([path]) {
  try {
    path = resolve(path);
    const readableStream = fs.createReadStream(path, { encoding: 'utf8' });
    await pipeline(readableStream, () => process.stdout(readableStream));
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
