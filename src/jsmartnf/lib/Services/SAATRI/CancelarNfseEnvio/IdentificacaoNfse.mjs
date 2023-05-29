import CpfCnpj from '../Base/CpfCnpj.mjs'
import { GetCodMun } from '../../../../Common/Utils.mjs'

class IdentificacaoNfse {
	constructor(obj) {
		this.Numero = obj.inf.Numero
		this.CpfCnpj = new CpfCnpj(obj.Prestador)
		this.InscricaoMunicipal = obj.Prestador.InscricaoMunicipal
		this.CodigoMunicipio = GetCodMun(obj.inf.UF, obj.inf.xMun)
	}
}

export default IdentificacaoNfse