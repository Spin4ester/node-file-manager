import { cwd } from 'node:process';

export default function displayCurDir() {
  console.log(`You are currently in ${cwd()}`);
}
