
class Transporta {
    constructor(obj) {
        this.CNPJ = obj.CNPJ; //CNPJ do Transportador
        this.CPF = obj.CPF; //CPF do Transportador
        this.xNome = obj.xNome; //Razão Social ou nome do Transportador
        this.IE = obj.IE; //Inscrição Estadual do Transportador
        this.xEnder = obj.xEnder; //Endereço Completo do Transportador
        this.xMun = obj.xMun; //Nome do município do Transportador
        this.UF = obj.UF; //Sigla da UF do Transportador
    }
}

export default Transporta;