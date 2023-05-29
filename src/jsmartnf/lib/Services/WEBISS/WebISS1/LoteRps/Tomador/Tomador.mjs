import IdentificacaoTomador from './IdentificacaoTomador.mjs';
import Endereco from '../../Base/Endereco.mjs';
import Contato from '../../Base/Contato.mjs';

class Tomador {
	constructor(Tomador) {
		this.IdentificacaoTomador = new IdentificacaoTomador(Tomador);
		this.RazaoSocial = Tomador.RazaoSocial;
		this.Endereco = new Endereco(Tomador.Endereco);
		this.Contato = new Contato(Tomador.Contato);
	}
}

export default Tomador;