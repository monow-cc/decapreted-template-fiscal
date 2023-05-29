import IdentificacaoNfse from './IdentificacaoNfse.mjs'

class InfPedidoCancelamento {
	constructor(obj) {
		this.attributes = {
			Id: `Cancelamento_${obj.Cnpj ? obj.Cnpj : obj.Cpf}`
		}
		this.IdentificacaoNfse = new IdentificacaoNfse(obj)
		this.CodigoCancelamento = obj.CodigoCancelamento ? obj.CodigoCancelamento : 1
	}
}

export default InfPedidoCancelamento