class PIS {
    constructor(prod, obj) {

        let PIS = prod.imposto.PIS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        switch (PIS.CST) {
            case '01':
            case '02':

                this.PISAliq = {
                    CST: PIS.CST,
                    vBC: vBC,
                    pPIS: parseFloat(PIS.pPIS).toFixed(2),
                    vPIS: parseFloat(+vBC * (+PIS.pPIS / 100)).toFixed(2)
                }

                break
            case '03':

                this.PISQtde = {
                    CST: PIS.CST,
                    qBCProd: parseFloat(prod.qCom).toFixed(4),
                    vAliqProd: PIS.vAliqProd ? parseFloat(PIS.vAliqProd).toFixed(4) : '0.0000',
                    vPIS: parseFloat(+prod.qCom * +PIS.vAliqProd).toFixed(2)
                }

                break
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':

                this.PISNT = {
                    CST: PIS.CST
                }

                break
            case '49':
            case '50':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
            case '56':
            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '98':
            case '99':

                this.PISOutr = {
                    CST: PIS.CST,
                    vBC: obj.emit.CRT == '1' ? '0.00' : parseFloat(vBC).toFixed(2),
                    pPIS: obj.emit.CRT == '1' ? '0.0000' : parseFloat(PIS.pPIS).toFixed(4),
                    qBCProd: obj.emit.CRT == '1' ? '0.0000' : parseFloat(prod.qTrib).toFixed(4),
                    vAliqProd: obj.emit.CRT == '1' ? '0.0000' : parseFloat(PIS.vAliqProd).toFixed(4),
                    vPIS: obj.emit.CRT == '1' ? '0.00' : parseFloat(PIS.vPIS).toFixed(2)
                }

                break
        }
    }
}

export default PIS