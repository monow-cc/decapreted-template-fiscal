import EnviarLoteRpsSincronoEnvio from './EnviarLoteRpsSincronoEnvio.mjs'
import EnviarLoteRpsEnvio from './EnviarLoteRpsEnvio.mjs'
import GerarNfseEnvio from './GerarNfseEnvio.mjs'
import CancelarNfseEnvio from './CancelarNfseEnvio/CancelarNfseEnvio.mjs'
import SubstituirNfseEnvio from './SubstituirNfseEnvio/SubstituirNfseEnvio.mjs'
import ConsultarNfseRpsEnvio from './ConsultarNfseRpsEnvio.mjs'

class Make {
	constructor(obj, type) {
		switch (type) {
			case 'GerarNfseEnvio':
				this.GerarNfseEnvio = new GerarNfseEnvio(obj)
				break
			case 'EnviarLoteRpsSincronoEnvio':
				this.EnviarLoteRpsSincronoEnvio = new EnviarLoteRpsSincronoEnvio(obj)
				break
			case 'EnviarLoteRpsEnvio':
				this.EnviarLoteRpsEnvio = new EnviarLoteRpsEnvio(obj)
				break
			case 'CancelarNfseEnvio':
				this.CancelarNfseEnvio = new CancelarNfseEnvio(obj)
				break
			case 'SubstituirNfseEnvio':
				this.SubstituirNfseEnvio = new SubstituirNfseEnvio(obj)
				break
			case 'ConsultarNfseRpsEnvio':
				this.ConsultarNfseRpsEnvio = new ConsultarNfseRpsEnvio(obj)
				break
		}
	}
}

export default Make