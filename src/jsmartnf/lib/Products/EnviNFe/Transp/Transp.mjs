import Transporta from './Transporta.mjs';
import RetTransp from './RetTransp.mjs';
import VeicTransp from './VeicTransp.mjs';
import Reboque from './Reboque.mjs';
import Vol from './Vol.mjs';
import Lacres from './Lacres.mjs';

class Transp {
    constructor(obj) {
        this.modFrete = obj.modFrete;
        if (this.modFrete != '9') {
            this.transporta = new Transporta(obj.transporta);
            this.retTransp = new RetTransp(obj.retTransp);
            this.veicTransp = new VeicTransp(obj.veicTransp);
            this.reboque = new Reboque(obj.reboque);
            this.vol = new Vol(obj.vol);
            this.lacres = new Lacres(obj.lacres);
        }
    }
}

export default Transp;