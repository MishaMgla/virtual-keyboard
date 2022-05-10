import {Key} from "./Key.js";
import {keyList} from "./keyList.js";
import {lang} from "./lang.js";

export const keyMap = new Map();

export function createKeyboard(){
    createInputArea();
    createLangDisplay();
    createBackplate();
    createRows();
}

function createInputArea(){
    const textAreaEl = document.createElement(`textarea`);
    textAreaEl.setAttribute(`id`,`inputArea`);
    textAreaEl.innerHTML = `dsiofaisasdfas`;
    document.body.appendChild(textAreaEl);
}

function createLangDisplay(){
    const tip = document.createElement(`div`);
    tip.innerHTML = `MacOs keyboard, language switch: option + space`;
    tip.setAttribute(`id`,`tip`);
    document.body.appendChild(tip);
    const el = document.createElement(`div`);
    el.setAttribute(`id`,`lang`);
    el.innerHTML = lang;
    document.body.appendChild(el);
}

function createBackplate(){
    const el = document.createElement(`div`);
    el.setAttribute(`id`,`keyboard-wrapper`)
    document.body.appendChild(el);
}

function createRows(){
    for (const row of keyList) {
        const rowEl = document.createElement(`div`);
        rowEl.setAttribute(`class`,`row`);
        document.getElementById(`keyboard-wrapper`).appendChild(rowEl);
        for (const key of row) {
        keyMap.set(key.codeName,new Key(key.codeName,key.ru,key.eng));
        const keyEl = document.createElement(`div`);
        keyEl.setAttribute(`class`,`key`);
        keyEl.setAttribute(`id`,`${key.codeName}`);
        keyEl.innerHTML = `${key.eng.low}`;
        let length = document.getElementsByClassName(`row`).length;
        if(key.codeName == `ArrowUp` || key.codeName == `ArrowDown`){
            let arrowWrapperEl = document.getElementById(`arrowWrapper`);
            if(!arrowWrapperEl){
                arrowWrapperEl = document.createElement(`div`);
                arrowWrapperEl.setAttribute(`id`,`arrowWrapper`);
            }
            arrowWrapperEl.appendChild(keyEl);
            document.getElementsByClassName(`row`)[length-1].appendChild(arrowWrapperEl);
        } else{
            document.getElementsByClassName(`row`)[length-1].appendChild(keyEl);
        }
        }
    }
}

export function switchKeys(keyboardState){
    let langEl = document.getElementById(`lang`);
    langEl.innerHTML = lang == `en` ? `ru` : `en`;
    for (const [key, value] of keyMap) {
        const el = document.getElementById(value.codeName);
        let langStorage;
        if(lang == `en`){
            langStorage = value.ru;
        } else {
            langStorage = value.eng;
        }
        el.innerHTML = langStorage[`${keyboardState}`];
    }
}