import {createKeyboard, switchLangDisplay, keyMap} from "./layoutCreator.js";
import {switchLang} from "./lang.js";

createKeyboard();
let pressed = new Set();

document.addEventListener('keyup', function(event) {
    let key = document.getElementsByClassName(event.code)[0];
    key.classList.remove(`highlight`);
    pressed.delete(event.code);
  });

document.addEventListener('keydown', function(event) {
    event.preventDefault();
        pressed.add(event.code);
        let key = document.getElementsByClassName(event.code)[0];
        key.classList.add(`highlight`);
        if((pressed.has(`AltLeft`) && pressed.has(`Space`)) ||
        (pressed.has(`AltRight`) && pressed.has(`Space`))){
            switchLang();
            switchLangDisplay();
        }
  });