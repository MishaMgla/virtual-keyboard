import {
  createKeyboard, keyMap, switchKeys, addAnimation, removeAnimation,
} from './layout.js';
import { switchLang } from './lang.js';
import {
  add, backspace,
} from './inputArea.js';

let capsIsOn = false;
const pressed = new Set();
let state = 'low';
const skipKeys = ['Backspace', 'ShiftRight', 'ShiftLeft', 'MetaLeft', 'MetaRight', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight', 'CapsLock'];

createKeyboard();

//   update keyboard state

function updateState(event) {
  if (event !== 'undefined' || event.type === 'keydown' || event.type === 'mousedown') {
    if (capsIsOn) {
      if (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) {
        state = 'shiftCaps';
      } else {
        state = 'caps';
      }
    } else if (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) {
      state = 'up';
    } else {
      state = 'low';
    }
  } else if (!capsIsOn) {
    if (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) {
      state = 'up';
    } else {
      state = 'low';
    }
  } else if (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) {
    state = 'shiftCaps';
  } else {
    state = 'caps';
  }
  switchKeys(state);
}

// on mouse leave

function onMouseLeave(keyCode) {
  removeAnimation(keyCode);
  if (!keyMap.has(keyCode)) return;
  const key = document.getElementById(keyCode);
  key.classList.remove('highlight');
  pressed.delete(keyCode);
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') updateState();
  if (keyCode === 'CapsLock') {
    capsIsOn = false;
    updateState();
  }
}

// keyup mouseup events

function upHandler(event) {
  if (event.type === 'mousedown') {
    if (event.target.getAttribute('class') === null
            || !event.target.getAttribute('class').includes('key')
    ) {
      return;
    }
  }
  const keyCode = event.type === 'mouseup' ? event.target.getAttribute('id') : event.code;
  removeAnimation(keyCode);
  if (!keyMap.has(keyCode)) return;
  const key = document.getElementById(keyCode);
  key.classList.remove('highlight');
  pressed.delete(keyCode);
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') updateState(event);
  if (keyCode === 'CapsLock') {
    capsIsOn = false;
    updateState(event);
  }
}

// down handler

function downHandler(event) {
  if (event.type === 'mousedown') {
    if (event.target.getAttribute('class') === null
              || !event.target.getAttribute('class').includes('key')
    ) {
      return;
    }
    const el = document.getElementById(event.target.getAttribute('id'));
    const keyCode = event.target.getAttribute('id');
    el.addEventListener('mouseleave', function listener() {
      onMouseLeave(keyCode);
      el.removeEventListener('mouseleave', listener);
    });
  }
  const keyCode = event.type === 'mousedown' ? event.target.getAttribute('id') : event.code;
  addAnimation(keyCode);
  if (keyMap.has(keyCode)) {
    if (keyCode !== 'ArrowLeft' && keyCode !== 'ArrowDown' && keyCode !== 'ArrowRight' && keyCode !== 'ArrowUp') {
      event.preventDefault();
    }
  } else {
    return;
  }
  pressed.add(keyCode);
  const key = document.getElementById(keyCode);
  key.classList.add('highlight');
  if (keyCode === 'CapsLock') {
    capsIsOn = true;
    updateState(event);
  }
  if (pressed.has('ShiftLeft') || pressed.has('ShiftRight')) updateState(event);
  if ((pressed.has('AltLeft') && pressed.has('Space'))
          || (pressed.has('AltRight') && pressed.has('Space'))) {
    switchLang();
    switchKeys(state);
  }
  if (keyCode === 'Backspace') {
    backspace();
  } else if (!skipKeys.includes(keyCode)) {
    add(keyCode, state);
  }
}

document.addEventListener('keyup', (event) => {
  upHandler(event);
});

document.addEventListener('mouseup', (event) => {
  upHandler(event);
});

//   keydown mousedown events

document.addEventListener('keydown', (event) => {
  downHandler(event);
});

document.addEventListener('mousedown', (event) => {
  downHandler(event);
});
