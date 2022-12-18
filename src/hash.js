import * as fs from 'fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';
import displayCurDir from './displayCurDir.js';

export default async function handleHash([path]) {
  try {
    path = resolve(path);
    fs.readFile(path, (err, data) => {
      if (err) throw new Error('Invalid Input');
      const hashHex = createHash('sha3-256').update(data).digest('hex');
      console.log(hashHex);
      displayCurDir();
    });
  } catch (error) {
    console.error('Operation failed');
  }
}
