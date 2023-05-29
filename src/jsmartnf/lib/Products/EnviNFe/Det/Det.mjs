import Prod from "./Prod.mjs";
import Imposto from "./Imposto/Imposto.mjs";

class Det {
  constructor(prod, obj) {
    this.attributes = { nItem: prod.nItem };
    this.prod = new Prod(prod, obj);
    this.imposto = new Imposto(prod, obj);
  }
}

export default Det;
