import { unlink } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import displayCurDir from './displayCurDir.js';
import isDir from './isDir.js';

export default async function handleMv([pathFile, pathDir]) {
  try {
    const isNotDir = !(await isDir(pathDir));
    console.log(pathDir, isNotDir);
    if (isNotDir) {
      console.log('Invalid input');
    } else {
      pathFile = resolve(pathFile);
      const { base } = parse(pathFile);
      pathDir = resolve(pathDir, base);
      const readableStream = createReadStream(pathFile);
      const writableStream = createWriteStream(pathDir);
      await pipeline(readableStream, writableStream);
      await unlink(pathFile);
      displayCurDir();
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
