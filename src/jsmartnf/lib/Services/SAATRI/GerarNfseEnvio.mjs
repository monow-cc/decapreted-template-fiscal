import Rps from './LoteRps/Rps/Rps.mjs'

class GerarNfseEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse.xsd'
		}
		this.Rps = new Rps(obj)
	}
}

export default GerarNfseEnvio