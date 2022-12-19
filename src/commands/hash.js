import * as fs from 'fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import displayCurDir from '../utils/displayCurDir.js';
import isFile from '../utils/isFile.js';

export default async function handleHash([path]) {
  try {
    path = resolve(path);
    const isNotFile = !(await isFile(path));
    if (isNotFile) {
      console.log('Invalid input');
    } else {
      fs.readFile(path, (err, data) => {
        const hashHex = createHash('sha3-256').update(data).digest('hex');
        console.log('Hash value: ' + hashHex);
        displayCurDir();
      });
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
