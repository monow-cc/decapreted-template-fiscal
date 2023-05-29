class InfInut {
	constructor(obj) {
		this.attributes = {
			Id: obj.attributes.Id
		};

		this.tpAmb = obj.tpAmb,
		this.xServ = obj.xServ ? obj.xServ : 'INUTILIZAR',
		this.cUF = obj.cUF,
		this.ano = obj.ano,
		this.CNPJ = obj.CNPJ,
		this.mod = obj.mod,
		this.serie = obj.serie,
		this.nNFIni = obj.nNFIni,
		this.nNFFin = obj.nNFFin,
		this.xJust = obj.xJust
	}
}

export default InfInut;