import Pedido from '../CancelarNfseEnvio/Pedido.mjs'
import Rps from '../LoteRps/Rps/Rps.mjs'

class SubstituicaoNfse {
	constructor(obj) {
		this.attributes = { 
			Id: `Substituicao_${obj.Cnpj ? obj.Cnpj : obj.Cpf}`
		}
		this.Pedido = new Pedido(obj)
		this.Rps = new Rps(obj)
	}
}

export default SubstituicaoNfse