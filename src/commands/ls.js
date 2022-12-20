import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import displayCurDir from '../utils/displayCurDir.js';
import isDir from '../utils/isDir.js';

export default async function handleLs() {
  try {
    const curDir = resolve(cwd());
    const files = await readdir(curDir);
    const checkDir = await Promise.all(files.map((el) => isDir(el)));
    const obj = files
      .map((el) => {
        return {
          Name: el,
          Type: checkDir[files.indexOf(el)] === true ? 'directory' : 'file',
        };
      })
      .sort((a, b) => {
        if (a.Type > b.Type) return 1;
        if (a.Type < b.Type) return -1;
        if (a.Name > b.Name) return 1;
        if (a.Name < b.Name) return -1;
      });
    console.table(obj);
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
