class ICMSPart {
    constructor(ICMS, obj) {

        this.ICMSPart = {
            orig: ICMS.orig,
            CST: ICMS.CST,
            modBC: ICMS.modBC,
            vBC: ICMS.vBC,
            pRedBC: parseFloat(ICMS.pRedBC).toFixed(2),
            pICMS: ICMS.pICMS,
            vICMS: ICMS.vICMS,
            modBCST: ICMS.modBCST,
            pMVAST: ICMS.pMVAST,
            pRedBCST: ICMS.pRedBCST,
            vBCST: ICMS.vBCST,
            pICMSST: ICMS.pICMSST,
            vICMSST: ICMS.vICMSST,
            pBCOp: ICMS.pBCOp,
            UFST: ICMS.UFST
        }

    }
}

export default ICMSPart