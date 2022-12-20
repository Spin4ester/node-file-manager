import * as fs from 'fs';
import { resolve } from 'node:path';
import displayCurDir from '../utils/displayCurDir.js';
import isDir from '../utils/isDir.js';
import streamToString from '../utils/streamToString.js';

export default async function handleCat([path]) {
  try {
    path = resolve(path);

    const isNotDir = !(await isDir(path));

    if (!isNotDir) {
      console.log('Invalid Input');
    } else {
      const readableStream = fs.createReadStream(path, { encoding: 'utf8' });
      await streamToString(readableStream, (data) => {
        console.log(data);
        displayCurDir();
      });
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
