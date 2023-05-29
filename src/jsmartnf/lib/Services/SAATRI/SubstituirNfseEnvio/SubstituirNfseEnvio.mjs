import SubstituicaoNfse from './SubstituicaoNfse.mjs'

class SubstituirNfseEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse.xsd'
		}
		this.SubstituicaoNfse = new SubstituicaoNfse(obj)
	}
}

export default SubstituirNfseEnvio