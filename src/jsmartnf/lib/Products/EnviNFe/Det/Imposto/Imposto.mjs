import COFINS from "./COFINS/COFINS.mjs";
import COFINSST from "./COFINS/COFINSST.mjs";
import ICMS from "./ICMS/ICMS.mjs";
import ICMSPart from "./ICMS/ICMSPart";
import ICMSSN from "./ICMS/ICMSSN.mjs";
import ICMSST from "./ICMS/ICMSST.mjs";
import PIS from "./PIS/PIS.mjs";
import PISST from "./PIS/PISST.mjs";
import IPI from "./IPI/IPI.mjs";
import ISSQN from "./ISSQN.mjs";
import { ObjEmpty } from "./../../../../Common/Utils.mjs"

class Imposto {
  constructor(prod, obj) {
    this.vTotTrib = prod.imposto.vTotTrib;
    if (prod.indTot == 0) {
      this.ISSQN = new ISSQN(prod, obj);
    } else {
      if (obj.emit.CRT == 1) this.ICMS = new ICMSSN(prod, obj);
      else this.ICMS = new ICMS(prod, obj);
    }

    this.IPI = !ObjEmpty(prod.imposto.IPI) ? new IPI(prod, obj) : undefined
    this.PIS = new PIS(prod, obj);
    this.COFINS = new COFINS(prod, obj);
  }
}

export default Imposto;
