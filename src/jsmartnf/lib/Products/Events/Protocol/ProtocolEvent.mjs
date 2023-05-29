import ProcEventoNFe from './ProcEventoNFe.mjs';

class ProtocolEvent {
	constructor(obj, result) {
		this.procEventoNFe = new ProcEventoNFe(obj, result);
	}
}

export default ProtocolEvent;