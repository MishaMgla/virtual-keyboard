import { createKeyboard, keyMap, switchKeys } from "./layout.js";
import { lang, switchLang } from "./lang.js";
import { add, moveSelector, backspace, addNewLine, addSpace, addTab } from "./inputArea.js";

let capsIsOn = false;
let pressed = new Set();
let state = `low`;
const skipKeys = [`Backspace`, `ShiftRight`, `ShiftLeft`, `MetaLeft`, `MetaRight`, `AltLeft`, `AltRight`, `ControlLeft`, `ControlRight`, `CapsLock`];

createKeyboard();

// keyup mouseup events

document.addEventListener('keyup', function (event) {
    upHandler(event);
});

document.addEventListener('mouseup', function (event) {
    upHandler(event);
});

function upHandler(event) {
    if (event.type == `mousedown`) {
        if (event.target.getAttribute(`class`) === null ||
            !event.target.getAttribute(`class`).includes(`key`)
        ) {
            return;
        }
    }
    const keyCode = event.type == `mouseup` ? event.target.getAttribute(`id`) : event.code;
    if (!keyMap.has(keyCode)) return;
    let key = document.getElementById(keyCode);
    key.classList.remove(`highlight`);
    pressed.delete(keyCode);
    if (keyCode == `ShiftLeft` || keyCode == `ShiftRight`) updateState(event);
    if (keyCode == `CapsLock`) {
        capsIsOn = false;
        updateState(event);
    }
}

//   keydown mousedown events

document.addEventListener('keydown', function (event) {
    downHandler(event);
});

document.addEventListener('mousedown', function (event) {
    downHandler(event);
});

function downHandler(event) {
    if (event.type == `mousedown`) {
        if (event.target.getAttribute(`class`) === null ||
            !event.target.getAttribute(`class`).includes(`key`)
        ) {
            return;
        }
    }
    const keyCode = event.type == `mousedown` ? event.target.getAttribute(`id`) : event.code;
    if (keyMap.has(keyCode)) {
        if(keyCode != `ArrowLeft` && keyCode != `ArrowDown` && keyCode != `ArrowRight` && keyCode != `ArrowUp`){
            // console.log(`prevent def`);
            event.preventDefault();
        }
    } else {
        return;
    }
    pressed.add(keyCode);
    let key = document.getElementById(keyCode);
    key.classList.add(`highlight`);
    if (keyCode == `CapsLock`) {
        capsIsOn = true;
        updateState(event);
    }
    if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) updateState(event);
    if ((pressed.has(`AltLeft`) && pressed.has(`Space`)) ||
        (pressed.has(`AltRight`) && pressed.has(`Space`))) {
        switchLang();
        switchKeys(state);
    }
    if (keyCode == `ArrowUp` || keyCode == `ArrowDown` || keyCode == `ArrowLeft` || keyCode == `ArrowRight`) {
        return;
    } else if (keyCode == `Backspace`) {
        backspace();
    } else if (!skipKeys.includes(keyCode)) {
        add(keyCode, state);
    }
}

//   update keyboard state

function updateState(event) {
    if (event.type == `keydown` || event.type == `mousedown`) {
        if (capsIsOn) {
            if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
                state = `shiftCaps`;
            } else {
                state = `caps`;
            }
        } else {
            if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
                state = `up`;
            } else {
                state = `low`;
            }
        }
    } else {
        if (!capsIsOn) {
            if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
                state = `up`;
            } else {
                state = `low`;
            }
        } else {
            if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
                state = `shiftCaps`;
            } else {
                state = `caps`;
            }
        }
    }
    switchKeys(state);
}