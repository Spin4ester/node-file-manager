import EventEmitter from 'node:events';
import { argv, chdir, exit, stdin, stdout } from 'node:process';
import readline from 'node:readline';
import displayCurDir from './utils/displayCurDir.js';
import { handleInput } from './handleInput.js';
import handleLs from './commands/ls.js';
import handleUp from './commands/up.js';
import { homedir } from 'os';
import handleCd from './commands/cd.js';
import handleHash from './commands/hash.js';
import handleCat from './commands/cat.js';
import handleRn from './commands/rn.js';
import handleRm from './commands/rm.js';
import handleAdd from './commands/add.js';
import handleCp from './commands/cp.js';
import handleMv from './commands/mv.js';
import handleCompress from './commands/compress.js';
import handleDecompress from './commands/decompress.js';
import handleOs from './commands/os.js';

const args = Object.fromEntries(
  argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=');
    return [key, value];
  })
);

const userName = args['--username'] ? args['--username'] : 'Anonymous';
console.log(`Welcome to the File Manager, ${userName}!`);

const eventEmitter = new EventEmitter();
eventEmitter
  .on('up', handleUp)
  .on('ls', handleLs)
  .on('cd', handleCd)
  .on('hash', handleHash)
  .on('cat', handleCat)
  .on('rn', handleRn)
  .on('rm', handleRm)
  .on('add', handleAdd)
  .on('cp', handleCp)
  .on('mv', handleMv)
  .on('compress', handleCompress)
  .on('decompress', handleDecompress)
  .on('os', handleOs);

// const userHomeDir = homedir();
// eventEmitter.emit(chdir(userHomeDir));
displayCurDir();

const rl = readline.createInterface(stdin, stdout);

rl.on('line', handleInput.bind(rl, eventEmitter)).on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`);
  exit(0);
});
