import NfeProc from './EnviNFe/NfeProc.mjs';

class Protocol {
	constructor(obj, result) {
		this.nfeProc = new NfeProc(obj, result);
	}
}

export default Protocol;