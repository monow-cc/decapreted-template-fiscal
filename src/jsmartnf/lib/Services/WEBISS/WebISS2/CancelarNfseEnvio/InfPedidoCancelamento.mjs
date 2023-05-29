import IdentificacaoNfse from './IdentificacaoNfse.mjs'

class InfPedidoCancelamento {
	constructor(obj) {
		this.attributes = {
			Id: `Cancelamento_${obj.Prestador.Cnpj ? obj.Prestador.Cnpj : obj.Prestador.Cpf}`
		}
		this.IdentificacaoNfse = new IdentificacaoNfse(obj)
		this.CodigoCancelamento = obj.inf.CodigoCancelamento ? obj.inf.CodigoCancelamento : 1
	}
}

export default InfPedidoCancelamento