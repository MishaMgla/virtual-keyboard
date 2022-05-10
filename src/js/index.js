import { createKeyboard, keyMap, switchKeys } from "./layout.js";
import { lang, switchLang } from "./lang.js";
import { add, moveSelector, deletePrev, addNewLine, addSpace, addTab } from "./inputArea.js";

let capsIsOn = false;
let pressed = new Set();
let state = `low`;
const skipKeys = [`Tab`, `Backspace`, `ShiftRight`, `ShiftLeft`, `MetaLeft`, `MetaRight`, `AltLeft`, `AltRight`, `ControlLeft`, `ControlRight`, `CapsLock`];

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
    if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) updateState(event);
    if (keyCode == `CapsLock`) {
        capsIsOn = false;
        updateState(event);
    }
    pressed.delete(keyCode);
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
        event.preventDefault();
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
        moveSelector(keyCode);
    } else if (keyCode == `Backspace`) {
        deletePrev();
    } else if (keyCode == `Enter`) {
        addNewLine();
    } else if (keyCode == `Tab`) {
        addTab();
    } else if (keyCode == `Space`) {
        addSpace();
    } else if (!skipKeys.includes(keyCode)) {
        add(keyCode, state);
    }
}

//   update keyboard state

function updateState(event) {
    if (capsIsOn) {
        if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
            state = `shiftCaps`;
        } else {
            state = `caps`;
        }
    }
    if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) {
        if (capsIsOn) {
            state = `shiftCaps`;
        } else {
            state = `up`;
        }
    }
    if (event.type == `keyup` || event.type == `mouseup`) {
        if (!pressed.has(`ShiftLeft`) || !pressed.has(`ShiftRight`)) {
            if (capsIsOn) {
                state = `caps`;
            } else {
                state = `low`;
            }
        }
    }
    switchKeys(state);
}