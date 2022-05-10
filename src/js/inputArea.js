import { keyMap } from "./layout.js";
import { lang } from "./lang.js";

export function add(keyCode,state) {
    const inputArea = document.getElementById(`inputArea`);
    inputArea.innerHTML += getValByKeyCode(keyCode,state);
}

export function moveSelector(keyCode) {

}

export function deletePrev() {

}

export function addNewLine() {

}

export function addTab() {

}

export function addSpace() {

}

function getValByKeyCode(keyCode, state){
    let langStorage;
    if(lang == `en`){
        langStorage = keyMap.get(keyCode).ru;
    } else {
        langStorage = keyMap.get(keyCode).eng;
    }
    return langStorage[`${state}`];
}