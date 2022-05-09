export class Key{
    constructor(codeName, ru, eng){
        this.codeName = codeName;
        this.ru = ru;
        this.eng = eng;
    }

    getEn() {
        return this.eng.low;
    }

    getRu(){
        return this.ru.low;
    }
}
