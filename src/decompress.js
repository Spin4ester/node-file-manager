import { parse, resolve } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import displayCurDir from './displayCurDir.js';
import isDir from './isDir.js';
import isFile from './isFile.js';
import isExist from './isExist.js';

export default async function handleDecompress([pathFile, pathDir]) {
  try {
    const isNotDir = !(await isDir(pathDir));
    const isNotFile = !(await isFile(pathFile));

    if (isNotDir || isNotFile) {
      console.log('Please write source file and destination directory!');
    } else {
      pathFile = resolve(pathFile);
      const { name, ext } = parse(pathFile);
      pathDir = resolve(pathDir, name);
      const doesNotExist = !(await isExist(pathDir));

      if (!ext.includes('.br')) {
        console.log('Can not decompress this file');
      } else if (!doesNotExist) {
        console.log('File already exist');
      } else {
        const readableStream = createReadStream(pathFile);
        const writableStream = createWriteStream(pathDir);
        const brotliDecompress = createBrotliDecompress();

        await pipeline(readableStream, brotliDecompress, writableStream);
        displayCurDir();
      }
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
