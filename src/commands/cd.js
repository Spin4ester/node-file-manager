import { chdir } from 'node:process';
import displayCurDir from '../utils/displayCurDir.js';

export default async function handleCd([path]) {
  try {
    chdir(path);
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
