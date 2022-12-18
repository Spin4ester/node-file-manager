import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import displayCurDir from './displayCurDir.js';

export default async function handleCp([origPath, newPath]) {
  try {
    origPath = resolve(origPath);
    const { base } = parse(origPath);
    newPath = resolve(newPath, base);
    const readableStream = createReadStream(origPath);
    const writableStream = createWriteStream(newPath);
    await pipeline(readableStream, writableStream);
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
