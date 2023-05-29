class ICMSTot {
  constructor(obj) {
    this.vBC = sumBy(obj.det, "imposto.ICMS", "vBC");
    this.vICMS = sumBy(obj.det, "imposto.ICMS", "vICMS");
    this.vICMSDeson = sumBy(obj.det, "imposto.ICMS", "vICMSDeson");
    this.vFCP = sumBy(obj.det, "imposto.ICMS", "vFCP");
    this.vBCST = sumBy(obj.det, "imposto.ICMS", "vBCST");
    this.vST = sumBy(obj.det, "imposto.ICMS", "vICMSST");
    this.vFCPST = sumBy(obj.det, "imposto.ICMS", "vFCPST");
    this.vFCPSTRet = sumBy(obj.det, "imposto.ICMS", "vFCPSTRet");

    let vFCPUFDest = sumBy(obj.det, "imposto.ICMSUFDest", "vFCPUFDest");
    let vICMSUFDest = sumBy(obj.det, "imposto.ICMSUFDest", "vICMSUFDest");
    let vICMSUFRemet = sumBy(obj.det, "imposto.ICMSUFDest", "vICMSUFRemet");

    this.vFCPUFDest = vFCPUFDest != "0.00" ? vFCPUFDest : undefined;
    this.vICMSUFDest = vICMSUFDest != "0.00" ? vICMSUFDest : undefined;
    this.vICMSUFRemet = vICMSUFRemet != "0.00" ? vICMSUFRemet : undefined;

    this.vProd = sumBy(obj.det, "prod", "vProd");
    this.vFrete = sumBy(obj.det, "prod", "vFrete");
    this.vSeg = sumBy(obj.det, "prod", "vSeg");
    this.vDesc = sumBy(obj.det, "prod", "vDesc");
    this.vII = sumBy(obj.det, "imposto.II", "vII");
    this.vIPI = sumBy(obj.det, "imposto.IPI", "vIPI");
    this.vIPIDevol = sumBy(obj.det, "impostoDevol.IPI", "vIPIDevol");
    this.vPIS = sumBy(obj.det, "imposto.PIS", "vPIS");
    this.vCOFINS = sumBy(obj.det, "imposto.COFINS", "vCOFINS");
    this.vOutro = sumBy(obj.det, "prod", "vOutro");

	let vServ = +sumBy(obj.det, "prod", "vProd", 0);

    this.vNF = parseFloat(
      +this.vProd -
        +this.vDesc +
        +this.vICMSDeson +
        +this.vST +
        +this.vFCPST +
        +this.vFrete +
        +this.vSeg +
        +this.vOutro +
        +this.vII +
        +this.vIPI +
        +this.vIPIDevol +
		+vServ
    ).toFixed(2);

    let vTotTrib = sumBy(obj.det, "imposto", "vTotTrib");
    this.vTotTrib = vTotTrib != "0.00" ? vTotTrib : undefined;
  }
}

const sumBy = function (root_object, path, leaf, iss = 1) {
  let value = 0;
  function iterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          return iterate(obj[property], stack + "." + property);
        } else {
          if (leaf == property)
            value += +!isNaN(obj[property]) ? +obj[property] : 0;
        }
      }
    }
  }

  root_object.reduce((acc, el) => {
    try {
      if (el.prod["indTot"] == iss) iterate(eval("el." + path));
    } catch {
      return;
    }
  }, 0);

  return parseFloat(value).toFixed(2);
};

export default ICMSTot;