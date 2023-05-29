import InfPedidoCancelamento from './InfPedidoCancelamento.mjs'

class Pedido {
	constructor(obj) {
		this.InfPedidoCancelamento = new InfPedidoCancelamento(obj)
	}
}

export default Pedido