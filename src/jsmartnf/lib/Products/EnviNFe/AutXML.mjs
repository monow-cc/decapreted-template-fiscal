class AutXML {
	constructor(obj) {
		this.CNPJ = obj.CPF != undefined ? undefined : obj.CNPJ; //CNPJ do Emitente
		this.CPF = obj.CNPJ != undefined ? undefined : obj.CPF; //CPF do Emitente
	}
}

export default AutXML;