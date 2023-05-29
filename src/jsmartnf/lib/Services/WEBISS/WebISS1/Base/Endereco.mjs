import { GetCodMun } from '../../../../Common/Utils.mjs'

class Endereco {
	constructor(obj) {
		this.Endereco = obj.Endereco
		this.Numero = obj.Numero
		this.Complemento = obj.Complemento
		this.Bairro = obj.Bairro
		this.CodigoMunicipio = GetCodMun(obj.Uf, obj.Municipio)
		this.Uf = obj.Uf
		this.Cep = obj.Cep
	}
}

export default Endereco