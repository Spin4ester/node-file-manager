import { cpus, EOL, userInfo } from 'node:os';
import displayCurDir from '../utils/displayCurDir.js';
import { arch } from 'node:process';

export default async function handleOs([data]) {
  try {
    if (!data) {
      console.log('Invalid input. Please specify the parameter');
    } else {
      const { username, homedir } = userInfo();
      const cpusStat = cpus().map(({ model, speed }) => {
        speed = `${speed / 1000}GHz`;
        return { model, speed };
      });

      const osStat = {
        '--EOL': JSON.stringify(EOL),
        '--cpus': cpusStat,
        '--homedir': homedir,
        '--username': username,
        '--architecture': arch,
      };

      if (!osStat[data]) {
        console.log('Wrong parameter');
      } else {
        console.table(osStat[data]);
        displayCurDir();
      }
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
