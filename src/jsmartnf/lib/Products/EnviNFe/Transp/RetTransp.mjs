
class RetTransp {
    constructor(obj) {
        this.vServ = obj.vServ; //Valor do Serviço
        this.vBCRet = obj.vBCRet; //BC da Retenção do ICMS
        this.pICMSRet = obj.pICMSRet; //Alíquota da Retenção
        this.vICMSRet = obj.vICMSRet; //Valor do ICMS Retido
        this.CFOP = obj.CFOP; //CFOP de Serviço de Transporte
        this.cMunFG = obj.cMunFG; //Código do município de ocorrência do fato gerador do ICMS do transporte
    }
}

export default RetTransp;