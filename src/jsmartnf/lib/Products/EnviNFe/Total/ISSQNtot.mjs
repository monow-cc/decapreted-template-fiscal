class ISSQNtot {
  constructor(obj) {
    let vServ = sumBy(obj.det, "prod", "vProd");
    this.vServ = vServ !== "0.00" ? vServ : undefined;

    let vBC = sumBy(obj.det, "imposto.ISSQN", "vBC");
    this.vBC = vBC !== "0.00" ? vBC : undefined;

    let vISS = sumBy(obj.det, "imposto.ISSQN", "vISSQN");
    this.vISS = vISS !== "0.00" ? vISS : undefined;

    let vPIS = sumBy(obj.det, "imposto.PIS", "vPIS");
    this.vPIS = vPIS !== "0.00" ? vPIS : undefined;

    let vCOFINS = sumBy(obj.det, "imposto.COFINS", "vCOFINS");
    this.vCOFINS = vCOFINS !== "0.00" ? vCOFINS : undefined;

    let vDeducao = sumBy(obj.det, "imposto.ISSQN", "vDeducao");
    this.vDeducao = vDeducao !== "0.00" ? vDeducao : undefined;

    let vOutro = sumBy(obj.det, "imposto.ISSQN", "vOutro");
    this.vOutro = vOutro !== "0.00" ? vOutro : undefined;

    let vDescIncond = sumBy(obj.det, "imposto.ISSQN", "vDescIncond");
    this.vDescIncond = vDescIncond !== "0.00" ? vDescIncond : undefined;

    let vDescCond = sumBy(obj.det, "imposto.ISSQN", "vDescCond");
    this.vDescCond = vDescCond !== "0.00" ? vDescCond : undefined;

    let vISSRet = sumBy(obj.det, "imposto.ISSQN", "vISSRet");
    this.vISSRet = vISSRet !== "0.00" ? vISSRet : undefined;
  }
}

const sumBy = function (root_object, path, leaf, iss = 0) {
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
    if (el.prod["indTot"] == iss) iterate(eval("el." + path));
  }, 0);

  return parseFloat(value).toFixed(2);
};

export default ISSQNtot;
