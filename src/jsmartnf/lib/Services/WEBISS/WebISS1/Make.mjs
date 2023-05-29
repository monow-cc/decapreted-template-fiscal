import EnviarLoteRpsEnvio from './EnviarLoteRpsEnvio.mjs'
import CancelarNfseEnvio from './CancelarNfseEnvio/CancelarNfseEnvio.mjs'
import ConsultarNfseRpsEnvio from './ConsultarNfseRpsEnvio.mjs'
import ConsultarLoteRpsEnvio from './ConsultarLoteRpsEnvio.mjs'
import ConsultarSituacaoLoteRpsEnvio from './ConsultarSituacaoLoteRpsEnvio.mjs'

class Make {
	constructor(obj, type) {
		switch (type) {
			case 'EnviarLoteRpsEnvio':
				this.EnviarLoteRpsEnvio = new EnviarLoteRpsEnvio(obj)
				break
			case 'CancelarNfseEnvio':
				this.CancelarNfseEnvio = new CancelarNfseEnvio(obj)
				break
			case 'ConsultarNfseRpsEnvio':
				this.ConsultarNfseRpsEnvio = new ConsultarNfseRpsEnvio(obj)
				break
			case 'ConsultarLoteRpsEnvio':
				this.ConsultarLoteRpsEnvio = new ConsultarLoteRpsEnvio(obj)
				break
			case 'ConsultarSituacaoLoteRpsEnvio':
				this.ConsultarSituacaoLoteRpsEnvio = new ConsultarSituacaoLoteRpsEnvio(obj)
				break
		}
	}
}

export default Make