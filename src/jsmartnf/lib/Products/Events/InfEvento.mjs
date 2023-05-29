import moment from 'moment';
import DetEvento from "./DetEvento.mjs";

class InfEvento{
	constructor(obj) {
		this.attributes = obj.attributes
		this.cOrgao = obj.cOrgao;
		this.tpAmb = obj.tpAmb;
		this.CNPJ = obj.CNPJ;
		this.chNFe = obj.chNFe;
		this.dhEvento = moment().format();
		this.tpEvento = obj.tpEvento;
		this.nSeqEvento = obj.nSeqEvento;
		this.verEvento = obj.verEvento;
		this.detEvento = new DetEvento(obj.detEvento, obj);
	}
}

export default InfEvento;