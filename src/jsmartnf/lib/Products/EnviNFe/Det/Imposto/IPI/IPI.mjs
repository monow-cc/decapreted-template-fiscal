class IPI {
    constructor(prod, obj) {

        let IPI = prod.imposto.IPI
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        this.clEnq = IPI.clEnq
        this.CNPJProd = IPI.CNPJProd
        this.cSelo = IPI.cSelo
        this.qSelo = IPI.qSelo ? parseFloat(IPI.qSelo).toFixed(2) : undefined
        this.cEnq = IPI.cEnq ? IPI.cEnq : '999'

        if (IPI.CST == "00" || IPI.CST == "49" || IPI.CST == "50" || IPI.CST == "99") {
            this.IPITrib = {
                CST: IPI.CST,
                vBC: vBC,
                pIPI: parseFloat(IPI.pIPI).toFixed(2),
                qUnid: IPI.qUnid ? parseFloat(IPI.qUnid).toFixed(4) : undefined,
                vUnid: IPI.vUnid ? parseFloat(IPI.vUnid).toFixed(4) : undefined,
                vIPI: parseFloat(+vBC * (+IPI.pIPI / 100)).toFixed(2)
            }
        }
        else {
            this.IPINT = {
                CST: IPI.CST
            }
        }

    }
}

export default IPI