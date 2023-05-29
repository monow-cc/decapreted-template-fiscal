import { GetCodMun } from '../../Common/Utils.mjs'
class Ender {
	constructor(obj) {
		this.xLgr = obj.xLgr //Logradouro
		this.nro = obj.nro //Numero
		this.xCpl = obj.xCpl //Compemento
		this.xBairro = obj.xBairro //Bairro
		this.cMun = GetCodMun(obj.UF, obj.xMun) //Código do município
		this.xMun = obj.xMun //Nome do município
		this.UF = obj.UF //Sigla da UF
		this.CEP = obj.CEP //Código do CEP
		this.cPais = obj.cPais == undefined ? '1058' : obj.cPais //Código do País
		this.xPais = obj.xPais == undefined ? 'Brasil' : obj.xPais //Nome do País
		this.fone = obj.fone //Telefone
	}
}

export default Ender