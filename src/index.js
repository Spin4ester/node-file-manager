import EventEmitter from 'node:events';
import { argv, chdir, exit, stdin, stdout } from 'node:process';
import readline from 'node:readline';
import displayCurDir from './displayCurDir.js';
import { handleInput } from './handleInput.js';
import handleLs from './ls.js';
import handleUp from './up.js';
import { homedir } from 'os';
import handleCd from './cd.js';
import handleHash from './hash.js';
import handleCat from './cat.js';
import handleRn from './rn.js';
import handleRm from './rm.js';

const args = Object.fromEntries(
  argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=');
    return [key, value];
  })
);

const userName = args['--username'] ? args['--username'] : 'anonymous';
console.log(`Welcome to the File Manager, ${userName}!`);
displayCurDir();

const eventEmitter = new EventEmitter();
eventEmitter
  .on('up', handleUp)
  .on('ls', handleLs)
  .on('cd', handleCd)
  .on('hash', handleHash)
  .on('cat', handleCat)
  .on('rn', handleRn)
  .on('rm', handleRm);

// const userHomeDir = homedir();
// eventEmitter.emit(chdir(userHomeDir));

const rl = readline.createInterface(stdin, stdout);

// process.on('exit', () => {
//   console.log(`Thank you for using File Manager, ${userName}!`);
//   exit(0);
// });
// process.on('SIGINT', () => exit(0));

rl.on('line', handleInput.bind(rl, eventEmitter)).on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`);
  exit(0);
});
