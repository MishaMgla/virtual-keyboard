export let lang;

function init(){
    console.log(`init lang: ` + localStorage.getItem(`lang`))
    lang = localStorage.getItem(`lang`);
    if(!lang){
        console.log(`lang == null`)
        setLang(`en`);
        storeLocalLang(`en`);
    }
}

init();

export function switchLang(){
    console.log(`switch lang`);
    if (lang == `en`){
        setLang(`ru`);
    } else {
        setLang(`en`);
    }
}

export function getLang(){
    console.log(`get lang: `+lang);
    return lang;
}

export function setLang(l){
    storeLocalLang(l);
    lang = l;
    console.log(`set lang:` + lang);
}

function storeLocalLang(l){
    localStorage.setItem(`lang`,l);
}
