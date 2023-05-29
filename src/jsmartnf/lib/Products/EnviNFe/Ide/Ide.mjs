import { ObjEmpty } from '../../../Common/Utils.mjs'
import NFref from './NFref.mjs'

class Ide {
	constructor(ide, obj) {
		this.cUF = ide.cUF //Código da UF do Emitente do Documento Fiscal
		this.cNF = ide.cNF //Código Numérico que Compõe a Chave de Acesso
		this.natOp = ide.natOp ? ide.natOp : 'Venda' //Descrição da Natureza da Operação
		this.mod = ide.mod ? ide.mod : '65'  //Código do Modelo do Documento Fiscal
		this.serie = ide.serie ? ide.serie : '1' //Série do Documento Fiscal
		this.nNF = ide.nNF //Número do Documento Fiscal
		this.dhEmi = ide.dhEmi //Data e Hora de Emissão do Documento Fiscal
		this.dhSaiEnt = ide.dhSaiEnt //Data e hora de Saída ou da Entrada da Mercadoria/Produto
		this.tpNF = ide.mod == '65' ? '1' : ide.tpNF //Tipo de Operação

		if (ide.mod == '55')
			if (obj.dest.enderDest.UF == obj.emit.enderEmit.UF) //Identificador de local de destino da operação
				this.idDest = '1' //Operação Interna.
			else
				this.idDest = ide.idDest == undefined ? '2' : ide.idDest //Operação Interestadual.

		if (ide.mod == '65')
			this.idDest = '1' //Operação Interna.

		this.cMunFG = obj.emit.enderEmit.cMun //Código do Município de Ocorrência do Fato Gerador

		if (ide.mod == '55') {
			if (ide.tpImp > 3)
				throw "Formato de DANFE inválido para NF-e!"
			this.tpImp = ide.tpImp == undefined ? '1' : ide.tpImp //Formato de Impressão do DANFE
		} else {
			if (ide.tpImp < 4)
				throw "Formato de DANFE inválido para NFC-e!"
			this.tpImp = ide.tpImp == undefined ? '4' : ide.tpImp //Formato de Impressão do DANFE
		}

		this.tpEmis = ide.tpEmis //Tipo de Emissão da NF-e

		ObjEmpty
		// if (this.tpEmis == '9'){
		// 	if(parseInt(this.serie) >= 890 && parseInt(this.serie) <= 989)
		// 		this.serie = ide.serie
		// 	else
		// 		this.serie = '890'
		// }

		this.cDV = ide.cDV == undefined ? '0' : ide.cDV //Dígito Verificador da Chave de Acesso da NF-e
		this.tpAmb = ide.tpAmb == undefined ? '2' : ide.tpAmb //Identificação do Ambiente

		if (ide.mod == '65') {
			this.finNFe = '1' //Finalidade de Emissão da NF-e
		} else
			this.finNFe = ide.finNFe == undefined ? '1' : ide.finNFe //Finalidade de Emissão da NF-e

		if (ide.mod == '55') {
			if (obj.dest.indIEDest == '9' && this.idDest != '3') {
				this.indFinal = '1' //Indica Operação com Consumidor Final
			} else {
				this.indFinal = '0' //Indica Operação com Consumidor Normal
			}
		} else if (ide.mod == '65')
			this.indFinal = '1' //Indica Operação com Consumidor Final


		if (ide.mod == '65')
			this.indPres = this.indPres == undefined ? '1' : ide.indPres //Indicador de Presença do Comprador no Estabelecimento Comercial no Momento da Operação
		else if (this.finNFe == '2' || this.finNFe == '3')
			this.indPres = this.indPres == undefined ? '0' : ide.indPres //Indicador de Presença do Comprador no Estabelecimento Comercial no Momento da Operação
		else
			this.indPres = this.indPres == undefined ? '1' : ide.indPres //Indicador de Presença do Comprador no Estabelecimento Comercial no Momento da Operação

		this.procEmi = ide.procEmi == undefined ? '0' : ide.procEmi //Processo de Emissão da NF-e
		this.verProc = ide.verProc == undefined ? 'JSmart 1.0' : ide.verProc //Versão do Processo de Emissão da NF-e

		if (this.tpEmis == '9') {
			this.dhCont = ide.dhCont
			this.xJust = ide.xJust //Justificativa da Entrada em Contingência
		}

		this.NFref = !ObjEmpty(new NFref(ide)) ? new NFref(ide) : undefined
	}
}

export default Ide