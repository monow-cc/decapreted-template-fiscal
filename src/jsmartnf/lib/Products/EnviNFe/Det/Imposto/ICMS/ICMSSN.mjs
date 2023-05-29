class ICMSSN {
    constructor(prod, obj) {

        let ICMS = prod.imposto.ICMS
        let vFrete = prod.vFrete ? prod.vFrete : "0.00",
            vSeg = prod.vSeg ? prod.vSeg : "0.00",
            vOutro = prod.vOutro ? prod.vOutro : "0.00",
            vDesc = prod.vDesc ? prod.vDesc : "0.00",
            vBC = parseFloat(+prod.vProd + vFrete + +vSeg + +vOutro - +vDesc).toFixed(2)
            
        switch (ICMS.CSOSN) {
            case '101':

                this.ICMSSN101 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN,
                    pCredSN: parseFloat(ICMS.pCredSN).toFixed(2),
                    vCredICMSSN: parseFloat(+prod.vProd * (+ICMS.pCredSN / 100)).toFixed(2)
                }

                break
            case '102':
            case '103':
            case '300':
            case '400':

                this.ICMSSN102 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN
                }

                break
            case '201':

                this.ICMSSN201 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN,
                    modBCST: ICMS.modBCST,
                    pMVAST: ICMS.pMVAST,
                    pRedBCST: ICMS.pRedBCST,
                    vBCST: ICMS.vBCST,
                    pICMSST: ICMS.pICMSST,
                    vICMSST: ICMS.pICMSST,
                    vBCFCPST: ICMS.vBCST,
                    pFCPST: ICMS.pFCPST,
                    vFCPST: ICMS.vFCPST,
                    pCredSN: ICMS.pCredSN,
                    vCredICMSSN: ICMS.vCredICMSSN
                }

                break
            case '202':
            case '203':

                this.ICMSSN202 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN,
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
            case '500':

                this.ICMSSN500 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN,
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
            case '900':

                this.ICMSSN900 = {
                    orig: ICMS.orig,
                    CSOSN: ICMS.CSOSN,
                    modBC: ICMS.modBC,
                    vBC: vBC,
                    pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
                    pICMS: ICMS.pICMS,
                    vICMS: ICMS.vICMS,
                    modBCST: ICMS.modBCST,
                    pMVAST: ICMS.pMVAST,
                    pRedBCST: ICMS.pRedBCST,
                    vBCST: ICMS.vBCST,
                    pICMSST: ICMS.pICMSST,
                    vICMSST: ICMS.vICMSST,
                    vBCFCPST: ICMS.vBCFCPST,
                    pFCPST: ICMS.pFCPST,
                    vFCPST: ICMS.vFCPST,
                    pCredSN: ICMS.pCredSN,
                    vCredICMSSN: ICMS.vCredICMSSN
                }

                break
        }
    }
}

export default ICMSSN;