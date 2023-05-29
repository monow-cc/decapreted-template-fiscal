class PISST {
    constructor(prod, obj) {

        let PIS = prod.imposto.PIS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        if (!PIS.qBCProd) {

            this.PISST = {
                vBC: vBC,
                pPIS: PIS.pPIS
            }

        } else {
 
            this.PISST = {
                qBCProd: PIS.qBCProd,
                vAliqProd: PIS.vAliqProd
            }
        }

        this.PISST.vPIS = parseFloat(+vBC * (+PIS.pPIS / 100)).toFixed(2)

    }
}

export default PISST