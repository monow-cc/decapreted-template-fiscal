import moment from 'moment'
import IdentificacaoRps from './IdentificacaoRps.mjs'

class Rps {
	constructor(obj) {
		this.attributes = { 
			Id: `Rps_${obj.Id ? obj.Id : 1}`
		}
		this.IdentificacaoRps = new IdentificacaoRps(obj)
		this.DataEmissao = moment().format('YYYY-MM-DD')
		this.Status = obj.Status
	}
}

export default Rps