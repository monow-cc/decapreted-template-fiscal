import Pedido from './Pedido.mjs'

class CancelarNfseEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse.xsd'
		}
		this.Pedido = new Pedido(obj)
	}
}

export default CancelarNfseEnvio