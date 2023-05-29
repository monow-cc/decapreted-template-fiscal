import Make from './lib/Services/WebISS/WebISS2/Make.mjs'
import { XmltoObj, ObjtoXml } from './lib/Common/Utils.mjs'
import { XmlSigner, XmlValidation, ResultExtract } from './lib/Services/WebISS/WebISS2/Common/Tools.mjs'
import Sefaz from './lib/Services/WebISS/WebISS2/Common/Sefaz.mjs'

let obj = new Object()

obj.inf = {
	base64cert: "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",
	passCert: "10101010",
	tpAmb: 2
}

obj.Cnpj = '01406403000106'
obj.InscricaoMunicipal = '562410'

//CANCELAMENTO E SUBSTITUIÇÃO
obj.Numero = '202000000000012'
obj.CodigoMunicipio = '2805703'
//FIM

obj.Competencia = '2020-09-01'
obj.RegimeEspecialTributacao = 6
obj.OptanteSimplesNacional = 1
obj.IncentivoFiscal = 2

obj.Rps = {
	Numero: '18',
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
		ValorServicos: '500',
		ValorIss: '19',
		Aliquota: '3.8'
	},
	IssRetido: 2,
	ItemListaServico: '0901',
	CodigoCnae: '5510801',
	CodigoTributacaoMunicipio: '0901',
	Discriminacao: '64238 15 a 17 09 2020',
	CodigoMunicipio: '2800308',
	ExigibilidadeISS: 1,
	MunicipioIncidencia: '9999999'
}

//EMISSÃO RPS
// let note = new Make(obj, 'EnviarLoteRpsSincronoEnvio')

// XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
// 	XmlSigner(XmltoObj(xml), obj.inf, 'LoteRps', (xml) => {
// 		if (XmlValidation(xml)) {
// 			new Sefaz().Send(xml, obj.inf, 'RecepcionarLoteRpsSincrono', result => {
// 				console.log(ResultExtract(result.data, obj.inf, 'EnviarLoteRpsSincrono'))
// 			})
// 		}
// 	})
// })


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
let note = new Make(obj, 'ConsultarNfseRpsEnvio'),
	xml = ObjtoXml(note)

if (XmlValidation(xml)) {
	new Sefaz().Send(xml, obj.inf, 'ConsultarNfsePorRps', result => {
		console.log(ResultExtract(result.data, obj.inf, 'ConsultarNfseRps'))
	})
}


