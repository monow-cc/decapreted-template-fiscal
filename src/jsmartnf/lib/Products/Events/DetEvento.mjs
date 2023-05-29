import { RemoveAccents } from '../../Common/Utils.mjs'

class DetEvento {
	constructor(detEvento, obj) {
		this.attributes = {
			versao: obj.verEvento
		}

		switch (obj.tpEvento) {
			case '110110':
				this.descEvento = 'Carta de Correcao'
				this.xCorrecao = detEvento.xCorrecao
				this.xCondUso = `A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970 e pode ser utilizada para regularizacao de erro ocorrido na emissao de documento fiscal, desde que o erro nao esteja relacionado com: I - as variaveis que determinam o valor do imposto tais como: base de calculo, aliquota, diferenca de preco, quantidade, valor da operacao ou da prestacao; II - a correcao de dados cadastrais que implique mudanca do remetente ou do destinatario; III - a data de emissao ou de saida.`
				break;
			case '110111':
				this.descEvento = 'Cancelamento'
				this.nProt = detEvento.nProt
				this.xJust = RemoveAccents(detEvento.xJust)
				break;
			case '110112':
				this.descEvento = 'Cancelamento por substituicao'
				this.cOrgaoAutor = obj.cOrgao
				this.tpAutor = 1
				this.verAplic = detEvento.verProc ? detEvento.verProc : 'JSmart 1.0'
				this.nProt = detEvento.nProt
				this.xJust = RemoveAccents(detEvento.xJust)
				this.chNFeRef = detEvento.chNFeRef
				break;
			case '210200':
				this.descEvento = 'Confirmacao da Operacao'
				break;
			case '210210':
				this.descEvento = 'Ciencia da Operacao'
				break;
			case '210220':
				this.descEvento = 'Desconhecimento da Operacao'
				break;
			case '210240':
				this.descEvento = 'Operacao nao Realizada'
				this.xJust = RemoveAccents(detEvento.xJust)
				break;
		}
	}
}

export default DetEvento