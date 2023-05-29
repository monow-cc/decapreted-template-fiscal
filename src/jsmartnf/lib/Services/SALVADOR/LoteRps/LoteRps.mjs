import moment from 'moment'
import ListaRps from './ListaRps.mjs'

class LoteRps {
	constructor(obj) {
		this.NumeroLote = moment().format('DDMMYYYY'),
		this.attributes = { 
			Id: 'Lote' + obj.Cnpj + obj.InscricaoMunicipal + this.NumeroLote
		}
		this.Cnpj = obj.Cnpj
		this.InscricaoMunicipal = obj.InscricaoMunicipal
		this.QuantidadeRps = obj.QuantidadeRps ? obj.QuantidadeRps : 1
		this.ListaRps = new ListaRps(obj)
	}
}

export default LoteRps