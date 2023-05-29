
class Card {
    constructor(obj) {
        this.tpIntegra = obj.tpIntegra;

        if (this.tpIntegra == '1') {
            this.CNPJ = obj.CNPJ;
            this.tBand = obj.tBand;
            this.cAut = obj.cAut;
        }
    }
}

export default Card;