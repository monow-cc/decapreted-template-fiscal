import ICMSTot from "./ICMSTot.mjs";
import ISSQNtot from "./ISSQNtot.mjs";

import { ObjEmpty } from "../../../Common/Utils.mjs";

class Total {
  constructor(obj) {
    this.ICMSTot = new ICMSTot(obj);
    this.ISSQNtot = !ObjEmpty(new ISSQNtot(obj))
      ? new ISSQNtot(obj)
      : undefined;
  }
}

export default Total;
