import { rename } from 'node:fs/promises';
import { resolve, parse } from 'node:path';
import displayCurDir from './displayCurDir.js';

export default async function handleRn([path, fileName]) {
  try {
    const forbiddenSymbols = '/:*?"<>|';
    const checkSymbols = () => {
      return fileName.split('').some((el) => forbiddenSymbols.includes(el));
    };
    if (checkSymbols()) {
      console.log('Invalid file name');
    } else {
      path = resolve(path);
      const { dir } = parse(path);
      const pathFromFile = resolve(dir, fileName);
      await rename(path, pathFromFile);
      displayCurDir();
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
