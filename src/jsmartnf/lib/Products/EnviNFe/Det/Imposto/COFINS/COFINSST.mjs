class COFINSST {
    constructor(prod) {

        let COFINS = prod.imposto.COFINS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        if (!COFINS.qBCProd) {

            this.COFINSST = {
                vBC: vBC,
                pCOFINS: COFINS.pCOFINS
            }

        } else {

            this.COFINSST = {
                qBCProd: COFINS.qBCProd,
                vAliqProd: COFINS.vAliqProd
            }
        }

        this.COFINSST.vCOFINS = parseFloat(+vBC * (+COFINS.pCOFINS / 100)).toFixed(2)

    }
}

export default COFINSST