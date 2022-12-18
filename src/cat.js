import * as fs from 'fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import displayCurDir from './displayCurDir.js';
import streamToString from './streamToString.js';

export default async function handleCat([path]) {
  try {
    path = resolve(path);
    const readableStream = fs.createReadStream(path, { encoding: 'utf8' });
    await streamToString(readableStream, (data) => {
      console.log(data);
      displayCurDir();
    });
  } catch (error) {
    console.error('Operation failed');
  }
}
