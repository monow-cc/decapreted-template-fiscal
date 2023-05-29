import LoteRps from './LoteRps/LoteRps.mjs' 

class EnviarLoteRpsEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse.xsd'
		}
		this.LoteRps = new LoteRps(obj)
	}
}

export default EnviarLoteRpsEnvio