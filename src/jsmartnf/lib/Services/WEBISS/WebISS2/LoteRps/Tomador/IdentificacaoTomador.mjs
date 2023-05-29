import CpfCnpj from '../../Base/CpfCnpj.mjs';

class IdentificacaoTomador {
	constructor(obj) {
		this.CpfCnpj = new CpfCnpj(obj);
		this.InscricaoMunicipal = obj.InscricaoMunicipal;
	}
}

export default IdentificacaoTomador;