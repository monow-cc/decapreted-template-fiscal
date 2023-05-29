import EnviNFe from './EnviNFe/EnviNFe.mjs';

class Note {
	constructor(obj) {
		log.info(`FISCAL MAKE XML`);
		this.enviNFe = new EnviNFe(obj);
	}
}

export default Note;