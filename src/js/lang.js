export let lang;

function storeLocalLang(l) {
  localStorage.setItem('lang', l);
}

function getLang() {
  console.log(`get${lang}`);
  return lang;
}

function setLang(l) {
  console.log(`l: ${l}`);
  storeLocalLang(l);
  lang = l;
}

function init() {
  lang = localStorage.getItem('lang');
  console.log(`init:${localStorage.getItem('lang')}`);
  if (!lang) {
    setLang('en');
    storeLocalLang('en');
  }
}

init();

export function switchLang() {
  if (lang === 'en') {
    setLang('ru');
  } else {
    setLang('en');
  }
}

export default {
  lang, getLang, setLang, switchLang,
};
