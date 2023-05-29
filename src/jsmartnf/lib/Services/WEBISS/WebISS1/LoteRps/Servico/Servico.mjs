import Valores from './Valores.mjs'

class Servico {
	constructor(Servico, obj) {
		this.Valores = new Valores(Servico.Valores, obj)
		this.ResponsavelRetencao = Servico.ResponsavelRetencao
		this.ItemListaServico = Servico.ItemListaServico
		this.CodigoCnae = Servico.CodigoCnae
		this.CodigoTributacaoMunicipio = Servico.CodigoTributacaoMunicipio
		this.Discriminacao = Servico.Discriminacao
		this.CodigoMunicipio = Servico.CodigoMunicipio
	}
}

export default Servico