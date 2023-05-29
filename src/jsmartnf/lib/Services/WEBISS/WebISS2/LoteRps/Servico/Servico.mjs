import Valores from './Valores.mjs'

class Servico {
	constructor(obj) {
		this.Valores = new Valores(obj.Valores)
		this.IssRetido = obj.IssRetido
		this.ResponsavelRetencao = obj.ResponsavelRetencao
		this.ItemListaServico = obj.ItemListaServico
		this.CodigoCnae = obj.CodigoCnae
		this.CodigoTributacaoMunicipio = obj.CodigoTributacaoMunicipio
		this.Discriminacao = obj.Discriminacao
		this.CodigoMunicipio = obj.CodigoMunicipio
		this.CodigoPais = obj.CodigoPais ? obj.CodigoPais : '1058'
		this.ExigibilidadeISS = obj.ExigibilidadeISS
		this.MunicipioIncidencia = obj.MunicipioIncidencia
	}
}

export default Servico