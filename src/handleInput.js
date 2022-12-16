export async function handleInput(eventEmitter, input) {
  try {
    input = input.trim();
    let [action, ...args] = input.split(' ');

    if (action === 'up' || action === 'ls') {
      eventEmitter.emit(action);
    }
  } catch (err) {
    console.error('Operation failed');
  }
}
