import { chdir } from 'node:process';
import displayCurDir from '../utils/displayCurDir.js';

export default async function handleUp() {
  try {
    chdir('..');
    displayCurDir();
  } catch (error) {
    console.error('Operation failed');
  }
}
