import Prestador from './LoteRps/Prestador/Prestador.mjs'

class ConsultarLoteRpsEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse'
		};
		this.Prestador = new Prestador(obj.Prestador)
		this.Protocolo = obj.Protocolo
	}
}

export default ConsultarLoteRpsEnvio