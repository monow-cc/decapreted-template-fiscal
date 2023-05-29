import moment from 'moment'
import IdentificacaoRps from './IdentificacaoRps.mjs'
import Servico from './Servico/Servico.mjs'
import Prestador from './Prestador/Prestador.mjs'
import Tomador from './Tomador/Tomador.mjs'

class InfRps {
	constructor(obj) {

		this.attributes = {
			Id: `Rps_${obj.Prestador.Cnpj ? obj.Prestador.Cnpj : obj.Prestador.Cpf}`
		}

		this.IdentificacaoRps = new IdentificacaoRps(obj.Rps)
		this.DataEmissao = moment().format()
		this.NaturezaOperacao = obj.inf.NaturezaOperacao
		this.RegimeEspecialTributacao = obj.inf.RegimeEspecialTributacao
		this.OptanteSimplesNacional = obj.inf.OptanteSimplesNacional
		this.IncentivadorCultural = obj.inf.IncentivadorCultural ? obj.inf.IncentivadorCultural : 2
		this.Status = obj.inf.Status ? obj.inf.Status : 1
		this.Servico = new Servico(obj.Servico, obj)
		this.Prestador = new Prestador(obj.Prestador)
		this.Tomador = new Tomador(obj.Tomador)
	
	}
}

export default InfRps