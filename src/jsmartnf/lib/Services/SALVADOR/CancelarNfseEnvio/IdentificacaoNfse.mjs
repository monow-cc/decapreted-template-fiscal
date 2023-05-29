import CpfCnpj from '../Base/CpfCnpj.mjs'

class IdentificacaoNfse {
	constructor(obj) {
		this.Numero = obj.Numero
		this.CpfCnpj = new CpfCnpj(obj)
		this.InscricaoMunicipal = obj.InscricaoMunicipal
		this.CodigoMunicipio = obj.CodigoMunicipio
	}
}

export default IdentificacaoNfse