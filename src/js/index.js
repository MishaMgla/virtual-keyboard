import {createKeyboard, keyMap, switchKeys} from "./layoutCreator.js";
import {lang, switchLang} from "./lang.js";

let capsIsOn = false;
let pressed = new Set();
let state = `low`;

createKeyboard();

document.addEventListener('keyup', function(event) {
    let key = document.getElementById(event.code);
    key.classList.remove(`highlight`);
    if(pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) updateState(event);
    if(event.code == `CapsLock`){
        capsIsOn = false;
        updateState(event);
    }
    pressed.delete(event.code);
  });

document.addEventListener('keydown', function(event) {
        if(event.code != `F12`) event.preventDefault();
        pressed.add(event.code);
        let key = document.getElementById(event.code);
        key.classList.add(`highlight`);
        if(event.code == `CapsLock`) {
            capsIsOn = true;
            updateState(event);
        }
        if(pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)) updateState(event);
        if((pressed.has(`AltLeft`) && pressed.has(`Space`)) ||
        (pressed.has(`AltRight`) && pressed.has(`Space`))){
            switchLang();
            switchKeys(state);
        }
  });

  function updateState(event){
      if (capsIsOn){
          if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)){
              state = `shiftCaps`;
          } else {
              state = `caps`;
          }
      }
      if (pressed.has(`ShiftLeft`) || pressed.has(`ShiftRight`)){
          if(capsIsOn) {
            state = `shiftCaps`;
          } else {
              state = `up`;
          }
      }
      if(event.type == `keyup`){
          if(!pressed.has(`ShiftLeft`) || !pressed.has(`ShiftRight`)){
              if(capsIsOn){
                state = `caps`;
              } else {
                  state = `low`;
              }
          }
      }
      switchKeys(state);
      console.log(state);
  }