import Make from './lib/Services/Salvador/Make.mjs'
import { XmltoObj, ObjtoXml } from './lib/Common/Utils.mjs'
import { XmlSigner, XmlValidation, ResultExtract } from './lib/Services/Salvador/Common/Tools.mjs'
import Sefaz from './lib/Services/Salvador/Common/Sefaz.mjs'

let obj = new Object()

obj.inf = {
	base64cert: "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",
	passCert: "big1818",
	xMun: 'Salvador',
	UF: 'BA',
	tpAmb: 2
}

obj.Cnpj = '96783840000147'
obj.InscricaoMunicipal = 'ISENTA'

//CANCELAMENTO E SUBSTITUIÇÃO
obj.Numero = '202000000000012'
obj.CodigoMunicipio = '2927408'
//FIM

obj.NaturezaOperacao = 3
obj.RegimeEspecialTributacao = 6
obj.OptanteSimplesNacional = 1
obj.IncentivadorCultural = 2

obj.Rps = {
	Numero: '1',
	Serie: '1',
	Tipo: '1',
	Status: '1'
}

obj.Prestador = {
	Cnpj: obj.Cnpj,
	InscricaoMunicipal: obj.InscricaoMunicipal
}

obj.Tomador = {
	Cpf: "09434361419",
	//InscricaoMunicipal: '000000',
	RazaoSocial: 'Juliadson Souza Moura',
	Endereco: {
		Endereco: 'Rua Pernambuco',
		Numero: '55',
		Complemento: 'Do lado de Pyetra Lanches',
		Bairro: 'Centro',
		CodigoMunicipio: '2805703',
		Uf: '55',
		Cep: '00000000'
	},
	Contato: {
		Telefone: '79998009899',
		Email: 'juliadson.sm@gmail.com;js_moura@live.com'
	}
}

obj.Servico = {
	Valores: {
		ValorServicos: '1',
		ValorIss: '0.038',
		Aliquota: '3.8'
	},
	IssRetido: 2,
	ItemListaServico: '0901',
	CodigoCnae: '5510801',
	CodigoTributacaoMunicipio: '0901',
	Discriminacao: '64238 15 a 17 09 2020',
	CodigoMunicipio: '2910800',
	ExigibilidadeISS: 1,
	MunicipioIncidencia: '9999999'
}

//EMISSÃO RPS
let note = new Make(obj, 'EnviarLoteRpsEnvio')

XmlSigner(note, obj.inf, 'InfRps', (xml) => {
	XmlSigner(XmltoObj(xml), obj.inf, 'LoteRps', (xml) => {
		// if (XmlValidation(xml)) {
			new Sefaz().Send(xml, obj.inf, 'EnviarLoteRPS', result => {
				console.log(result)
				//console.log(ResultExtract(result.data, obj.inf, 'EnviarLoteRpsSincrono'))
			})
		// }
	})
})


//CANCELAMENTO
// let note = new Make(obj, 'CancelarNfseEnvio')

// XmlSigner(note, obj.inf, 'InfPedidoCancelamento', (xml) => {
// 	if (XmlValidation(xml)) {
// 		new Sefaz().Send(xml, obj.inf, 'CancelarNfse', result => {
// 			console.log(ResultExtract(result.data, null, 'CancelarNfse'))
// 		})
// 	}
// })

//SUBSTITUIÇÃO
// let note = new Make(obj, 'SubstituirNfseEnvio')

// XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
// 	XmlSigner(XmltoObj(xml), obj.inf, 'InfPedidoCancelamento', (xml) => {
// 		XmlSigner(XmltoObj(xml), obj.inf, 'SubstituicaoNfse', (xml) => {
// 			if (XmlValidation(xml)) {
// 				new Sefaz().Send(xml, obj.inf, 'SubstituirNfse', result => {
// 					console.log(ResultExtract(result.data, obj.inf, 'SubstituirNfse'))
// 				})
// 			}
// 		})
// 	})
// })

//EMISSÃO NFSE
// let note = new Make(obj, 'GerarNfseEnvio')

// XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
// 	if (XmlValidation(xml)) {
// 		new Sefaz().Send(xml, obj.inf, 'GerarNfse', result => {
// 			console.log(ResultExtract(result.data, obj.inf, 'GerarNfse'))
// 		})
// 	}
// })

//CONSULTA RPS
// let note = new Make(obj, 'ConsultarNfseRpsEnvio'),
// 	xml = ObjtoXml(note)

// //if (XmlValidation(xml)) {
// 	new Sefaz().Send(xml, obj.inf, 'ConsultarNfsePorRps', result => {
// 		console.log(ResultExtract(result.data, obj.inf, 'ConsultarNfseRps'))
// 	})
// //}


