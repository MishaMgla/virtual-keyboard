export let lang;

function storeLocalLang(l) {
  localStorage.setItem('lang', l);
}

function getLang() {
  return lang;
}

function setLang(l) {
  storeLocalLang(l);
  lang = l;
}

function init() {
  lang = localStorage.getItem('lang');
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
  getLang, setLang, switchLang,
};
