class ProcEventoNFe {
	constructor(obj, result) {
		this.attributes = { xmlns: "http://www.portalfiscal.inf.br/nfe", versao: "1.00" };
		this.evento = obj.envEvento.evento;
		this.retEvento = result.retEvento;
	}
}

export default ProcEventoNFe;