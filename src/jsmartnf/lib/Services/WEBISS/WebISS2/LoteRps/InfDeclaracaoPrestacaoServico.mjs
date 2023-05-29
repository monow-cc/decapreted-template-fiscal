import Rps from './Rps.mjs'
import Servico from './Servico/Servico.mjs'
import Prestador from './Prestador/Prestador.mjs'
import Tomador from './Tomador/Tomador.mjs'

class InfDeclaracaoPrestacaoServico {
	constructor(obj) {

		this.attributes = {
			Id: `Declaracao_${obj.Prestador.Cnpj ? obj.Prestador.Cnpj : obj.Prestador.Cpf}`
		}

		this.Rps = new Rps(obj.Rps)
		this.Competencia = obj.inf.Competencia
		this.Servico = new Servico(obj.Servico)
		this.Prestador = new Prestador(obj.Prestador)
		this.Tomador = new Tomador(obj.Tomador)
		this.RegimeEspecialTributacao = obj.inf.RegimeEspecialTributacao
		this.OptanteSimplesNacional = obj.inf.OptanteSimplesNacional
		this.IncentivoFiscal = obj.inf.IncentivoFiscal
	}
}

export default InfDeclaracaoPrestacaoServico