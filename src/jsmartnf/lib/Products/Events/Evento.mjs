import InfEvento from "./InfEvento.mjs";

class Evento {
	constructor(obj) {
		this.attributes = {
			xmlns: 'http://www.portalfiscal.inf.br/nfe',
			versao: obj.infEvento.verEvento
		};
		this.infEvento = new InfEvento(obj.infEvento);
	}
}

export default Evento;