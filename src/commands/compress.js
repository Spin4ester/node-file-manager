import { parse, resolve } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import displayCurDir from '../utils/displayCurDir.js';
import isDir from '../utils/isDir.js';
import isFile from '../utils/isFile.js';

export default async function handleCompress([pathFile, pathDir]) {
  try {
    const isNotDir = !(await isDir(pathDir));
    const isNotFile = !(await isFile(pathFile));

    if (isNotDir || isNotFile) {
      console.log('Invalid input');
    } else {
      pathFile = resolve(pathFile);
      const { base } = parse(pathFile);
      const fileName = `${base}.br`;

      pathDir = resolve(pathDir, fileName);
      const readableStream = createReadStream(pathFile);
      const writableStream = createWriteStream(pathDir);
      const brotliCompress = createBrotliCompress();

      await pipeline(readableStream, brotliCompress, writableStream);
      console.log('File successfully compressed!');
      displayCurDir();
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
