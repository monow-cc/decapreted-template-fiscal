import IdentificacaoRps from './LoteRps/IdentificacaoRps.mjs'
import Prestador from './LoteRps/Prestador/Prestador.mjs'

class ConsultarNfseRpsEnvio {
	constructor(obj) {
		this.attributes = { 
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
			xmlns: 'http://www.abrasf.org.br/nfse'
		};
		this.IdentificacaoRps = new IdentificacaoRps(obj.Rps)
		this.Prestador = new Prestador(obj.Prestador)
	}
}

export default ConsultarNfseRpsEnvio