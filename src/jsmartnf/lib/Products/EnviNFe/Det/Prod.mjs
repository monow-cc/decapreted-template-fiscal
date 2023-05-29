class Prod {
  constructor(prod, obj) {
    this.cProd = prod.cProd;
    this.cEAN = prod.cEAN == undefined ? "SEM GTIN" : prod.cEAN;

    if (obj.ide.tpAmb == "2" && obj.ide.mod == "65" && prod.nItem == 1) {
      this.xProd =
        "NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL";
    } else {
      this.xProd = prod.xProd;
    }

    this.NCM = prod.NCM;
    this.cBenef = prod.cBenef;
    this.EXTIPI = prod.EXTIPI;

    if (prod.CEST != undefined) {
      this.CEST = prod.CEST;
    }

    this.CFOP = prod.CFOP;
    this.uCom = prod.uCom;
    this.qCom = prod.qCom;
    this.vUnCom = prod.vUnCom;
    this.vProd = prod.vProd;

    if (prod.qCom == prod.qTrib) {
      this.cEANTrib = this.cEAN;
    } else {
      this.cEANTrib = prod.cEANTrib == undefined ? "SEM GTIN" : prod.cEANTrib;
    }

    this.uTrib = prod.uTrib;
    this.qTrib = prod.qTrib;
    this.vUnTrib = prod.vUnTrib;
    this.vFrete = prod.vFrete;
    this.vSeg = prod.vSeg;
    this.vDesc = prod.vDesc;
    this.vOutro = prod.vOutro;
    this.indTot = prod.indTot;
    this.xPed = prod.xPed;
    this.nItemPed = prod.nItemPed;
    this.nFCI = prod.nFCI;
  }
}

export default Prod;
