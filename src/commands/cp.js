import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import displayCurDir from '../utils/displayCurDir.js';
import isDir from '../utils/isDir.js';
import isFile from '../utils/isFile.js';

export default async function handleCp([pathFile, pathDir]) {
  try {
    const isNotDir = !(await isDir(pathDir));
    const isNotFile = !(await isFile(pathFile));

    if (isNotDir || isNotFile) {
      console.log('Invalid input');
    } else {
      pathFile = resolve(pathFile);
      const { base } = parse(pathFile);
      pathDir = resolve(pathDir, base);
      const readableStream = createReadStream(pathFile);
      const writableStream = createWriteStream(pathDir);
      await pipeline(readableStream, writableStream);
      console.log('File successfully copied!');
      displayCurDir();
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
