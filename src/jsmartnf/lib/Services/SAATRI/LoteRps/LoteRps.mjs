import moment from 'moment'
import CpfCnpj from './../Base/CpfCnpj.mjs'
import ListaRps from './ListaRps.mjs'

class LoteRps {
	constructor(obj) {
		this.NumeroLote = moment().format('DDMMYYYY')
		this.CpfCnpj = new CpfCnpj(obj.Prestador)
		this.InscricaoMunicipal = obj.Prestador.InscricaoMunicipal
		this.QuantidadeRps = 1
		this.ListaRps = new ListaRps(obj)

		this.attributes = { 
			Id: 'Lote' + obj.Prestador.Cnpj + obj.Prestador.InscricaoMunicipal + this.NumeroLote,
			versao: '2.02'
		}
	}
}

export default LoteRps