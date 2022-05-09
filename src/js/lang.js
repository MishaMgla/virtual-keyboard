export let lang;

function init(){
    lang = localStorage.getItem(`lang`);
    if(!lang){
        setLang(`en`);
        storeLocalLang(`en`);
    }
}

init();

export function switchLang(){
    if (lang == `en`){
        setLang(`ru`);
    } else {
        setLang(`en`);
    }
}

export function getLang(){
    return lang;
}

export function setLang(l){
    lang = l;
    storeLocalLang(l);
}

function storeLocalLang(l){
    localStorage.setItem(`lang`,l);
}
