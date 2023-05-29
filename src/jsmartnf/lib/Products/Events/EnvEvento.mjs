import Evento from "./Evento.mjs";

class EnvEvento {
	constructor(obj) {
		this.attributes = { 
			xmlns: "http://www.portalfiscal.inf.br/nfe",
			versao: obj.evento.infEvento.verEvento
		};
		this.idLote = obj.idLote;
		this.evento = new Evento(obj.evento);
	}
}

export default EnvEvento;