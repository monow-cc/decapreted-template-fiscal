import moment from 'moment'
import ListaRps from './ListaRps.mjs'

class LoteRps {
	constructor(obj) {
		this.NumeroLote = moment().format('DDMMYYYY'),
		this.Cnpj = obj.Prestador.Cnpj
		this.InscricaoMunicipal = obj.Prestador.InscricaoMunicipal
		this.QuantidadeRps = 1
		this.ListaRps = new ListaRps(obj)

		this.attributes = { 
			Id: 'Lote' + obj.Prestador.Cnpj + obj.Prestador.InscricaoMunicipal + this.NumeroLote
		}
	}
}

export default LoteRps