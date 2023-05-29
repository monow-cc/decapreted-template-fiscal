import moment from 'moment';
import { BuildKey } from '../../Common/Tools';
import NFe from './NFe.mjs';

class EnviNFe {
	constructor(obj) {
		obj.ide.dhEmi = moment().format()

		if (obj.ide.mod == '55') {
			obj.ide.dhSaiEnt = obj.ide.dhEmi //Data e hora de Saída ou da Entrada da Mercadoria/Produto
		}

		this.attributes = { xmlns: "http://www.portalfiscal.inf.br/nfe", versao: '4.00' };
		this.idLote = obj.idLote ? obj.idLote : '1';
		this.indSinc = obj.indSinc ? obj.indSinc : '1';
		this.NFe = new NFe(obj);

		BuildKey(this.NFe);

	}

}

export default EnviNFe;