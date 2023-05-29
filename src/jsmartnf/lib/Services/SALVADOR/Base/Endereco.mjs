
class Endereco {
	constructor(obj) {
		this.Endereco = obj.Endereco
		this.Numero = obj.Numero
		this.Complemento = obj.Complemento
		this.Bairro = obj.Bairro
		this.CodigoMunicipio = obj.CodigoMunicipio
		this.Uf = obj.Uf
		this.CodigoPais = obj.CodigoPais ? obj.CodigoPais : '1058'
		this.Cep = obj.Cep
	}
}

export default Endereco