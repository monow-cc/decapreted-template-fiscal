
class Vol {
    constructor(obj) {
        this.item = obj.item;
        this.qVol = obj.qVol; //Quantidade de volumes transportados
        this.esp = obj.esp; //Espécie dos volumes transportados
        this.marca = obj.marca; //Marca dos volumes transportados
        this.nVol = obj.nVol; //Numeração dos volumes transportados
        this.pesoL = obj.pesoL; //Peso Líquido (em kg) dos volumes transportados
        this.pesoB = obj.pesoB; //Peso Bruto (em kg) dos volumes transportados
    }
}

export default Vol;