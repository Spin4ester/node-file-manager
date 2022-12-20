export async function handleInput(eventEmitter, input) {
  try {
    input = input.trim();
    let [action, ...args] = input.split(' ');

    const oneArgAction = ['cd', 'cat', 'add', 'rm', 'os', 'hash'];
    const twoArgAction = ['rn', 'cp', 'mv', 'compress', 'decompress'];

    if (action === 'up' || action === 'ls') {
      eventEmitter.emit(action);
    } else if (action === '.exit') {
      this.close();
    } else if (oneArgAction.some((el) => el === action) && args.length === 1) {
      eventEmitter.emit(action, args);
    } else if (twoArgAction.some((el) => el === action) && args.length === 2) {
      eventEmitter.emit(action, args);
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.error('Operation failed');
  }
}
