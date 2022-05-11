import { keyMap } from './layout.js';
import { lang } from './lang.js';

function getInput() {
  return document.getElementById('inputArea');
}

function getValByKeyCode(keyCode, state) {
  if (keyCode === 'Space') return ' ';
  if (keyCode === 'Enter') return '\n';
  if (keyCode === 'Tab') return '\t';
  let langStorage;
  if (lang === 'en') {
    langStorage = keyMap.get(keyCode).eng;
  } else {
    langStorage = keyMap.get(keyCode).ru;
  }
  return langStorage[`${state}`];
}

export function add(keyCode, state) {
  const input = getInput();
  input.setRangeText(getValByKeyCode(keyCode, state), input.selectionStart, input.selectionEnd, 'end');
}

export function backspace() {
  const input = getInput();
  if (input.selectionStart === input.selectionEnd) {
    const selPos = input.selectionEnd;
    const ar = input.value.split('');
    ar.splice(input.selectionStart - 1, 1);
    input.value = ar.join('');
    input.setSelectionRange(selPos - 1, selPos - 1);
  } else {
    input.setRangeText('');
  }
}
