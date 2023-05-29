import InfProt from './InfProt/InfProt.mjs';

class ProtNFe {
	constructor(obj) {
		this.attributes = { versao: '4.00' };
		this.infProt = new InfProt(obj.infProt);

	}
}

export default ProtNFe;