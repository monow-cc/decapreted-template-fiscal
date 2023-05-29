import Ender from './Ender.mjs';

class Emit {
	constructor(obj) {
		this.CNPJ = obj.CPF != undefined ? undefined : obj.CNPJ; //CNPJ do Emitente
		this.CPF = obj.CNPJ != undefined ? undefined : obj.CPF; //CPF do Emitente
		this.xNome = obj.xNome.trim(); //Razão Social
		this.xFant = obj.xFant.trim(); //Nome Fantasia
		this.enderEmit = new Ender(obj.enderEmit); //Endereço do Emitente
		this.IE = obj.IE; //Inscrição Estadual
		this.IEST = obj.IEST == undefined ? undefined : obj.IEST; //IE do Substituto Tributário do Emitente
		this.IM = obj.CNAE == undefined ? undefined : obj.IM; //Inscrição Municipal
		this.CNAE = obj.IM == undefined ? '' : obj.CNAE; //Código de Classificação Nacional de Atividades Econômicas
		this.CRT = obj.CRT; //Código de Regime Tributário
	}
}

export default Emit;