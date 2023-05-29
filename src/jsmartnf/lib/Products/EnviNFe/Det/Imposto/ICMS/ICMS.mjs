class ICMS {
    constructor(prod, obj) {

        let ICMS = prod.imposto.ICMS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + +vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)

        switch (ICMS.CST) {
            case '00':

                this.ICMS00 = {
                    orig: ICMS.orig,
                    CST: ICMS.CST,
                    modBC: ICMS.modBC,
                    vBC: vBC,
                    pICMS: parseFloat(ICMS.pICMS).toFixed(2),
                    vICMS: parseFloat(+vBC * (+ICMS.pICMS / 100)).toFixed(2),
                    pFCP: ICMS.pFCP,
                    vFCP: ICMS.vFCP
                }

                break
            case '10':

                this.ICMS10 = {
                    orig: ICMS.orig,
                    CST: ICMS.CST,
                    modBC: ICMS.modBC,
                    vBC: vBC,
                    pICMS: parseFloat(ICMS.pICMS).toFixed(2),
                    vICMS: parseFloat(+vBC * (+ICMS.pICMS / 100)).toFixed(2),
                    vBCFCP: ICMS.vBCFCP,
                    pFCP: ICMS.pFCP,
                    vFCP: ICMS.vFCP,
                    modBCST: ICMS.modBCST,
                    pMVAST: ICMS.pMVAST,
                    pRedBCST: ICMS.pRedBCST,
                    vBCST: ICMS.vBCST,
                    pICMSST: ICMS.pICMSST,
                    vICMSST: ICMS.vICMSST,
                    vBCFCPST: ICMS.vBCFCPST,
                    pFCPST: ICMS.pFCPST,
                    vFCPST: ICMS.vFCPST
                }

                break
            case '20':

                vBC = parseFloat(+vBC * (1-(+ICMS.pRedBC / 100))).toFixed(2)
                console.log("VBC", vBC)

                    this.ICMS20 = {
                        orig: ICMS.orig,
                        CST: ICMS.CST,
                        modBC: ICMS.modBC,
                        pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
                        vBC: vBC,
                        pICMS: parseFloat(ICMS.pICMS).toFixed(2),
                        vICMS: parseFloat(+vBC * (+ICMS.pICMS / 100)).toFixed(2),
                        vBCFCP: ICMS.vBCFCP,
                        pFCP: ICMS.pFCP,
                        vFCP: ICMS.vFCP,
                        vICMSDeson: ICMS.vICMSDeson,
                        motDesICMS: ICMS.motDesICMS
                    }

                break
            case '30':

                this.ICMS30 = {
                    orig: ICMS.orig,
                    CST: ICMS.CST,
                    modBCST: ICMS.modBCST,
                    pMVAST: ICMS.pMVAST,
                    pRedBCST: ICMS.pRedBCST,
                    vBCST: ICMS.vBCST,
                    pICMSST: ICMS.pICMSST,
                    vICMSST: ICMS.vICMSST,
                    vBCFCPST: ICMS.vBCFCPST,
                    pFCPST: ICMS.pFCPST,
                    vFCPST: ICMS.vFCPST,
                    vICMSDeson: ICMS.vICMSDeson,
                    motDesICMS: ICMS.motDesICMS
                }

                break
            case '40':
            case '41':
            case '50':

                this.ICMS40 = {
                    orig: ICMS.orig,
                    CST: ICMS.CST,
                    vICMSDeson: ICMS.vICMSDeson,
                    motDesICMS: ICMS.motDesICMS
                }

                break
            case '51':

                vBC = parseFloat(+vBC * (1-(+ICMS.pRedBC / 100))).toFixed(2),

                    this.ICMS51 = {
                        orig: ICMS.orig,
                        CST: ICMS.CST,
                        modBC: ICMS.modBC,
                        pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
                        vBC: vBC,
                        pICMS: parseFloat(ICMS.pICMSST).toFixed(2),
                        vICMSOp: ICMS.vICMSOp,
                        pDif: ICMS.pDif,
                        vICMSDif: ICMS.vICMSDif,
                        vICMS: ICMS.vICMS,
                        vBCFCP: ICMS.vBCFCP,
                        pFCP: ICMS.pFCP,
                        vFCP: ICMS.vFCP
                    }

                break
            case '60':

                this.ICMS60 = {
                    orig: ICMS.orig,
                    CST: ICMS.CST,
                    vBCSTRet: ICMS.vBCSTRet,
                    pST: ICMS.pST,
                    vICMSSubstituto: ICMS.vICMSSubstituto,
                    vICMSSTRet: ICMS.vICMSSTRet,
                    vBCFCPSTRet: ICMS.vBCFCPSTRet,
                    pFCPSTRet: ICMS.pFCPSTRet,
                    vFCPSTRet: ICMS.vFCPSTRet,
                    pRedBCEfet: ICMS.pRedBCEfet,
                    vBCEfet: ICMS.vBCEfet,
                    pICMSEfet: ICMS.pICMSEfet,
                    vICMSEfet: ICMS.vICMSEfet
                }

                break
            case '70':

                vBC = parseFloat(+vBC * (1-(+ICMS.pRedBC / 100))).toFixed(2),

                    this.ICMS70 = {
                        orig: ICMS.orig,
                        CST: ICMS.CST,
                        modBC: ICMS.modBC,
                        pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
                        vBC: vBC,
                        pICMS: parseFloat(ICMS.pICMS).toFixed(2),
                        vICMS: parseFloat(+vBC * (+ICMS.pICMS / 100)).toFixed(2),
                        vBCFCP: ICMS.vBCFCP,
                        pFCP: ICMS.pFCP,
                        vFCP: ICMS.vFCP,
                        modBCST: ICMS.modBCST,
                        pMVAST: ICMS.pMVAST,
                        pRedBCST: ICMS.pRedBCST,
                        vBCST: ICMS.vBCST,
                        pICMSST: ICMS.pICMSST,
                        vICMSST: ICMS.vICMSST,
                        vBCFCPST: ICMS.vBCFCPST,
                        pFCPST: ICMS.pFCPST,
                        vFCPST: ICMS.vFCPST,
                        vICMSDeson: ICMS.vICMSDeson,
                        motDesICMS: ICMS.motDesICMS
                    }

                break
            case '90':

                vBC = parseFloat(+vBC * (1-(+ICMS.pRedBC / 100))).toFixed(2),

                    this.ICMS90 = {
                        orig: ICMS.orig,
                        CST: ICMS.CST,
                        modBC: ICMS.modBC,
                        vBC: vBC,
                        pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
                        pICMS: parseFloat(ICMS.pICMS).toFixed(2),
                        vICMS: parseFloat(+vBC * (+ICMS.pICMS / 100)).toFixed(2),
                        vBCFCP: ICMS.vBCFCP,
                        pFCP: ICMS.pFCP,
                        vFCP: ICMS.vFCP,
                        modBCST: ICMS.modBCST,
                        pMVAST: ICMS.pMVAST,
                        pRedBCST: ICMS.pRedBCST,
                        vBCST: ICMS.vBCST,
                        pICMSST: ICMS.pICMSST,
                        vICMSST: ICMS.vICMSST,
                        vBCFCPST: ICMS.vBCFCPST,
                        pFCPST: ICMS.pFCPST,
                        vFCPST: ICMS.vFCPST,
                        vICMSDeson: ICMS.vICMSDeson,
                        motDesICMS: ICMS.motDesICMS
                    }

                break
        }
    }
}

export default ICMS