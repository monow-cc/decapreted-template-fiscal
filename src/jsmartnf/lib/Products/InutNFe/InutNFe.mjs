import InfInut from './InfInut.mjs'
class InutNFe {
	constructor(obj) {
		this.attributes = {
			xmlns: 'http://www.portalfiscal.inf.br/nfe',
			versao: '4.00'
		}
		this.infInut = new InfInut(obj.infInut)
	}
}

export default InutNFe;