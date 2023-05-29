import moment from 'moment'
import IdentificacaoRps from './IdentificacaoRps.mjs'
import Servico from './Servico/Servico.mjs'
import Prestador from './Prestador/Prestador.mjs'
import Tomador from './Tomador/Tomador.mjs'

class InfRps {
	constructor(obj) {

		this.attributes = {
			Id: `Rps_${obj.Cnpj ? obj.Cnpj : obj.Cpf}`
		}

		this.IdentificacaoRps = new IdentificacaoRps(obj.Rps)
		this.DataEmissao = moment().format()
		this.NaturezaOperacao = obj.NaturezaOperacao
		this.RegimeEspecialTributacao = obj.RegimeEspecialTributacao
		this.OptanteSimplesNacional = obj.OptanteSimplesNacional
		this.IncentivadorCultural = obj.IncentivadorCultural ? obj.IncentivadorCultural : 2
		this.Status = obj.Status ? obj.Status : 1
		this.Servico = new Servico(obj.Servico)
		this.Prestador = new Prestador(obj.Prestador)
		this.Tomador = new Tomador(obj.Tomador)
	
	}
}

export default InfRps