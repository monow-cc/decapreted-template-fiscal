import ProtNFe from './ProtNFe/ProtNFe.mjs'

class NfeProc {
	constructor(obj, result) {
		this.attributes = { xmlns: "http://www.portalfiscal.inf.br/nfe", versao: "4.00" };
		this.NFe = obj.enviNFe.NFe;
		this.protNFe = new ProtNFe(result.protNFe);
	}
}

export default NfeProc;