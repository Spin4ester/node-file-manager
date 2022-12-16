import { chdir } from 'node:process';
import displayCurDir from './displayCurDir.js';

export default async function handleUp() {
  try {
    chdir('..');
    displayCurDir();
  } catch (err) {
    console.error('Operation failed');
  }
}
