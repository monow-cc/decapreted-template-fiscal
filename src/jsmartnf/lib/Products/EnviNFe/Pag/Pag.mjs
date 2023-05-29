import DetPag from "./DetPag/DetPag.mjs";

class Pag {
    constructor(pag, obj) {
        this.detPag = Payments(pag, obj);
        this.vTroco = pag.vTroco;
    }
}

const Payments = function (pags, obj) {

    let pag = []

    if (obj.ide.finNFe < 3) {
        for (var value of pags) {
            let types = new DetPag(value);
            pag.push(types);
        }
    } else {
        pag.push(new DetPag({
            tPag: '90',
            vPag: '0.00'
        }))
    }

    return pag;
};

export default Pag;