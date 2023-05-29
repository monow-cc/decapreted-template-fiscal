class ISSQN {
    constructor(prod, obj) {
        let ISSQN = prod.imposto.ISSQN

        this.vBC = prod.vProd
        this.vAliq = ISSQN.vAliq ? ISSQN.vAliq : "0.00"
        this.vISSQN = parseFloat(+prod.vProd * (+this.vAliq / 100)).toFixed(2)
        this.cMunFG = ISSQN.cMunFG
        this.cListServ = ISSQN.cListServ ? ISSQN.cListServ : "09.01"
        this.vDeducao = ISSQN.vDeducao
        this.vOutro = ISSQN.vOutro
        this.vDescIncond = ISSQN.vDescIncond
        this.vDescCond = ISSQN.vDescCond
        this.vISSRet = ISSQN.vISSRet
        this.indISS = ISSQN.indISS ? ISSQN.indISS : 3
        this.cServico = ISSQN.cServico
        this.cMun = ISSQN.cMun
        this.cPais = ISSQN.cPais
        this.nProcesso = ISSQN.nProcesso
        this.indIncentivo = ISSQN.indIncentivo ? ISSQN.indIncentivo : 2
    }
}

export default ISSQN