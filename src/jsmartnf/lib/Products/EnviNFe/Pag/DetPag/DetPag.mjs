import Card from './Card/Card.mjs';

class DetPag {
    constructor(obj) {

        this.indPag = obj.indPag;
        this.tPag = obj.tPag;
        this.vPag = obj.vPag;

        if ((this.tPag == '03') || (this.tPag == '04')) {
            this.card = new Card(obj)
        }
    }
}

export default DetPag;