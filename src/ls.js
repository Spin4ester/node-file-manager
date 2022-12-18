import displayCurDir from './displayCurDir.js';
import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import isDir from './isDir.js';

export default async function handleLs() {
  try {
    const curDir = resolve(cwd());
    const files = await readdir(curDir);
    const checkDir = await Promise.all(files.map((el) => isDir(el)));
    const obj = files.map((el) => {
      return {
        Name: el,
        Type: checkDir[files.indexOf(el)] === true ? 'directory' : 'file',
      };
    });
    console.table(obj);
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
