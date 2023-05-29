class COFINS {
    constructor(prod, obj) {

        let COFINS = prod.imposto.COFINS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        switch (COFINS.CST) {
            case '01':
            case '02':

                this.COFINSAliq = {
                    CST: COFINS.CST,
                    vBC: vBC,
                    pCOFINS: parseFloat(COFINS.pCOFINS).toFixed(2),
                    vCOFINS: parseFloat(+vBC * (+COFINS.pCOFINS / 100)).toFixed(2)
                }

                break
            case '03':

                this.COFINSQtde = {
                    CST: COFINS.CST,
                    qBCProd: parseFloat(prod.qCom).toFixed(4),
                    vAliqProd: COFINS.vAliqProd ? parseFloat(COFINS.vAliqProd).toFixed(4) : '0.0000',
                    vCOFINS: parseFloat(+prod.qCom * +COFINS.vAliqProd).toFixed(2)
                }

                break
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':

                this.COFINSNT = {
                    CST: COFINS.CST
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

                this.COFINSOutr = {
                    CST: COFINS.CST,
                    vBC: obj.emit.CRT == '1' ? '0.00' : parseFloat(vBC).toFixed(2),
                    pCOFINS: obj.emit.CRT == '1' ? '0.0000' : parseFloat(COFINS.pCOFINS).toFixed(2),
                    qBCProd: obj.emit.CRT == '1' ? '0.0000' : parseFloat(prod.qTrib).toFixed(4),
                    vAliqProd: obj.emit.CRT == '1' ? '0.0000' : parseFloat(COFINS.vAliqProd).toFixed(4),
                    vCOFINS: obj.emit.CRT == '1' ? '0.00' : parseFloat(COFINS.vCOFINS).toFixed(2)
                }

                break
        }
    }
}

export default COFINS