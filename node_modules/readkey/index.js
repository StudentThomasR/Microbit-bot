const readline = require('readline');
//Example:
/*
const keyCommands = [
  { fn: (str,key) => str==='p', command: () => push(options) },
  { fn: (str,key) => key.ctrl && key.name === 'c', command: () => process.exit() },
  { fn: (str,key) => key.name === 'q', command: () => process.exit() },
];
 */

const byFn = (str,key) => keyCommand => keyCommand.fn(str,key);
const keypressed = keyCommands => (str, key) => {
  const element = keyCommands.find(byFn(str,key));
  if (element) {
    element.command();
  }
};
const readkey = (keyCommands) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', keypressed(keyCommands));
};

module.exports = readkey;
