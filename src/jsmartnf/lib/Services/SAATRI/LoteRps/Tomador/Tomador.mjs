import IdentificacaoTomador from './IdentificacaoTomador.mjs';
import Endereco from '../../Base/Endereco.mjs';
import Contato from '../../Base/Contato.mjs';

class Tomador {
	constructor(obj) {
		this.IdentificacaoTomador = new IdentificacaoTomador(obj);
		this.RazaoSocial = obj.RazaoSocial;
		this.Endereco = new Endereco(obj.Endereco);
		this.Contato = new Contato(obj.Contato);
	}
}

export default Tomador;