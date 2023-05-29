class ProcInutNFe  {
	constructor(obj, result) {
		this.attributes = { xmlns: "http://www.portalfiscal.inf.br/nfe", versao: "4.00" };
		this.inutNFe = obj.inutNFe;
		this.retInutNFe  = result.retInutNFe;
	}
}

export default ProcInutNFe;