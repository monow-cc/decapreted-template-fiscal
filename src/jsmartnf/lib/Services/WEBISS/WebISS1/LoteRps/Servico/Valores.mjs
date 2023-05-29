
class Valores {
	constructor(Valores, obj) {
		this.ValorServicos = Valores.ValorServicos
		this.ValorDeducoes = Valores.ValorDeducoes
		this.ValorPis = Valores.ValorPis
		this.ValorCofins = Valores.ValorCofins
		this.ValorInss = Valores.ValorInss
		this.ValorIr = Valores.ValorIr
		this.ValorCsll = Valores.ValorCsll
		this.OutrasRetencoes = Valores.OutrasRetencoes
		this.IssRetido = obj.Servico.IssRetido
		this.ValorIss = Valores.ValorIss
		this.Aliquota = Valores.Aliquota / 100
		this.DescontoIncondicionado = Valores.DescontoIncondicionado
		this.DescontoCondicionado = Valores.DescontoCondicionado
	}
}

export default Valores