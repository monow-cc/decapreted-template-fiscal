import Ender from './Ender.mjs'

class Dest {
    constructor(dest, obj) {
        this.CNPJ = dest.CPF != undefined ? undefined : dest.CNPJ //CNPJ do Destinatário
		this.CPF = dest.CNPJ != undefined ? undefined : dest.CPF //CPF do Destinatário
        this.xNome = obj.ide.tpAmb == '1' ? dest.xNome.trim() : 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' //Razão Social ou nome do Destinatário

        if (dest.enderDest != undefined)
            this.enderDest = new Ender(dest.enderDest) //Endereço do Destinatário

        this.idEstrangeiro = dest.idEstrangeiro //Razão Social ou Nome do Destinatário
        this.indIEDest = dest.indIEDest ? dest.indIEDest : 1 //Indicador da IE do Destinatário

        if ( !dest.IE || dest.IE == 'ISENTO' || dest.IE == 'ISENTA'){
            this.indIEDest = 2 //Indicador da IE do Destinatário
            this.IE = undefined //Inscrição Estadual do Destinatário
        }else{
            this.IE = dest.IE
        }

        if (obj.ide.mod == '65' || obj.ide.idDest == '3') {
            this.indIEDest = 9 //Indicador da IE do Destinatário
            this.IE = undefined
        }

        this.ISUF = dest.ISUF //Inscrição na SUFRAMA do Destinatário

        if ( !dest.IM | dest.IM == 'ISENTO' | dest.IM == 'ISENTA'){
            this.IM = undefined //Inscrição Municipal do Tomador do Serviço do Destinatário
        }else{
            this.IM = dest.IM //Inscrição Municipal do Tomador do Serviço do Destinatário
        }
        
        this.email = dest.email //Email do Destinatário
    }
}

export default Dest