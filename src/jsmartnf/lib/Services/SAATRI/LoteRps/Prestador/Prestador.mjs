import CpfCnpj from '../../Base/CpfCnpj.mjs';

class Prestador {
	constructor(obj) {
		this.CpfCnpj = new CpfCnpj(obj);
		this.InscricaoMunicipal = obj.InscricaoMunicipal;
	}
}

export default Prestador;