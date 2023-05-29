import InfNFe from './InfNFe.mjs';

class NFe {
	constructor(obj) {
		this.attributes = { "xmlns": "http://www.portalfiscal.inf.br/nfe" };
		this.infNFe = new InfNFe(obj);
	}
}

export default NFe;