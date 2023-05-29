import Ide from "./Ide/Ide.mjs";
import Emit from "./Emit.mjs";
import Dest from "./Dest.mjs";
import Total from "./Total/Total.mjs";
import Det from "./Det/Det.mjs";
import Transp from "./Transp/Transp.mjs";
import Pag from "./Pag/Pag.mjs";
import InfAdic from "./InfAdic.mjs";
import AutXML from "./AutXML.mjs";
import { ObjEmpty } from "../../Common/Utils.mjs";

class InfNFe {
  constructor(obj) {
    this.attributes = { versao: "4.00" };

    this.ide = new Ide(obj.ide, obj);
    obj.ide = this.ide;

    this.emit = new Emit(obj.emit, obj);
    obj.emit = this.emit;

    if (obj.dest != undefined || obj.mod == "55") {
      this.dest = new Dest(obj.dest, obj);
      obj.dest = this.dest;
    }

    if (obj.autXML != undefined)
      this.autXML = !ObjEmpty(new AutXML(obj.autXML))
        ? new AutXML(obj.autXML)
        : undefined;

    this.det = Products(obj);
    obj.det = this.det;

	obj.total = new Total(obj);

	if(obj.total.ISSQNtot){
		obj.total.ISSQNtot.dCompet = obj.ISSQN.dCompet
		obj.total.ISSQNtot.cRegTrib = obj.ISSQN.cRegTrib
	}

    this.total = obj.total;
	
    this.transp = new Transp(obj);
    obj.transp = this.transp;

    this.pag = new Pag(obj.pag, obj);
    obj.pag = this.pag;

    this.infAdic = obj.infAdic ? new InfAdic(obj.infAdic) : undefined;
    obj.infAdic = this.infAdic;
  }
}

const Products = function (obj) {
  let det = [];
  for (var prod of obj.det) {
    let item = new Det(prod, obj);
    det.push(item);
  }
  return det;
};

export default InfNFe;
