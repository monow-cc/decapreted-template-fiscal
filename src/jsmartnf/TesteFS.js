import Make from './lib/Services/WebISS/WebISS1/Make.mjs'
import { XmltoObj, ObjtoXml, Sleep } from './lib/Common/Utils.mjs'
import { XmlSigner, XmlValidation, ResultExtract } from './lib/Services/WebISS/WebISS1/Common/Tools.mjs'
import Sefaz from './lib/Services/WebISS/WebISS1/Common/Sefaz.mjs'

let obj = new Object()

obj.inf = {
	base64cert: "MIIPIwIBAzCCDu0GCSqGSIb3DQEHAaCCDt4Egg7aMIIO1jCCCR8GCSqGSIb3DQEHBqCCCRAwggkMAgEAMIIJBQYJKoZIhvcNAQcBMBwGCiqGSIb3DQEMAQYwDgQIntQt9riZbHQCAggAgIII2NktpsO64jdkZhgpIzrnsslA5/HhdtQhbjpSIUAlGVeCsUu/GMKe5dadTnLbvpc4Ue7fNlUoJR8wPTYb3FChPPv9CZV0GsJiJpJQnuXuqog7pQbGOvpULp3AKfm00PgfMfWZUiJJa3gBvUHupm42tidtTYbwuq43N5R09i8tRrfbiI2ZOfOXlxzZ+qyYTyAM2vggKMwoG+cM/poE+HSLDRoZb5bB74ooLACuXnrVTb0sEgPNZl/XDq8NvggSQ7gVsvoDOWdd4zRY8hLkoUYGw4tiGa+p/wcWOKnkWVYCViYf0Ckp6/MaQ0J6ZckPVaEU9QTtbHywwhUgViBYj2tbvGJJiAN7ngBBXedJZ7J8nXe2K7ej1poz/ohcH6fXhtrmDldBeNSmtVtKBF2xc1h/jHPZYIeUHiISFXbESd70iyST4cL6DAk4za89ibZVU3ztKbhrl/elt0K37+yfRU9luzBlvXVL+IQOH/rEN4MQ1u0kD9hmRww/RVTyywupyjGJJIjGEo33k/UJ0899tPbwo4MxiEZBCGQ049o7txN6EuvY4DaQfd7dvvo6vM073EF4btLFG0Zxldra3oQAeVB9Uho4H7ts8pAdRGJcb94OmEWHXcYEO4oe2jOlZ50WIOZ6WIAXqmgDOzUp1je7tuy3LulAnEvLb+Vk4pfZYcTmIj4TeSNC0yRdVekboG73JXm2CC9xcPqTx4BgIESXWkEFu4Jg7Enho94787/AiL1d+F0I0R9TgqpGtCSW91u+mkYr0K4kl4dEjGwCLAydC8IWN+H9DW7FIk8dkz0H/s4t1IDR6o8nMyJSv0Cq5DvffkMz9eD8uMJgH7sd9VJzDxO4fujun3xATHwIlrW2fqUBiIWETQPCOIrR0z+EcTQHJEyuSUrX0qF24yus2eKtFiH6Nr+QFAGbfMlvqaNzUg/P6C4dFl6j60IRlmDqbHVHl1dwVFtxK66uP7+lSry9Hw4LoE/luMDIuxY6E/z2A1sISGpkS5DfbVB9zIpSR46TF8Qh5JCqbHprkFPwzFI68VhaOc8YMBdH99dhBZ6i+txbTyJ1010vbEBhbMcY0zTmpdWudnjwyI33koowQ62QDUySKeetCV4i/WuCNRf3nxebB8i+E3xKcF+2vi4iZg7MfprsJ6yNR7jOPBfMCpWcX1DA7Gwo018USbFAf7slAEOLlKT6m1jiXUqfiSYCUMmo408MUge82HLuCWjNSoEH36TjVUluJ4SnX2YcZkw3ahnPNlHgUHER82BXx3FFHstorHIwZ868l2PbHnFCHFE0ZYjmhtJaYfDdWJoMYP9Yx/lYmMbKZlF8Nfv2ZDhbmQbHA8p+tokfdAf6btT1uYPQY9LXHD3Cnqh7jGVXTXEaSEEtR8i4EPi35XUkD2MJr19ixw+7AWWhGsBqxDjLN3rZMcWZOTgKE5hekqQEN4XuaaQw2h1aGZylQaSq1G0CLBewqV4Mrpa3UQ63gljcv+Ct/IgE6h5qCWUfqBlR+54VhMBYPrmjWuZit2AL3eeCpJk1GJ0K9KIA/6C1gkPdSA3XzLC3Fjz3IOL6W/QiNQC5crcbo9bi3MuAshyuhEIqUP7LF1XBzTYyBXPJluC/eBZ4mxt+DGLLmA0CPFtS4SnWeOlVHqW8BDLrpQCv/I2RncueR6Crp1ScLxL2ytyGL6Hr5WAcZxj482nzTLAGOn8w0FoNg1Bb0KC/R7ThbyA9ll9+Zw5CeQGSRJOAnBSWwMjfAHkqIM1jU05xYC+d2HLP9zyNs1r+ZjhTqgPW9grZSft9ZVm+9W7i+0NvvaJ87NoWUIOzQywi1yC7Swd6Dh/iYkL/bdavBZbIi5cTdl1iY72zcdvjj1ihylU50+MXNrO3eOR8gfeOp7Adyw7iHFjLByKAGd8gusYGL2AKYQdlYSAMhmX+cuEbG28zpBnirmpUMQRaRlaX6x4o/eTiUanummBndJ5JQW1o7qNhiteeL0ySE8/w4cs6Pk+vULalJaSWAgXZr5PNjJtFWexaOIOVLMx+xU+jhjZ+Hpmv/mAe9QyVWBkONpwNOWh3x8c1qqvaY9QDlbJkOHode0IC/z8ra+neFM4agwp1IF0InhVgQo2Od2vWRP3/Sq2VlBCa8d8zIiTCWYo65P5rIZ6aicQ0jis9ekk7YrCbHAQFBlav4+62f+GhyQkNU4b0YredVXPVTbEVGiE1yUTq8F2Xl3GvHd47AAnp/zU/pxbVTJBD3xXouJWz3IGmNZIuNEgfOHVepbWDqPcxgXa7fMt+rk8N8pNNgUpY9YYg8oO+yLXgYxT69Zlh3YrxdH+GDpQ6bT7Nm0/WIyG+dJHFGaIT/TUKJPkiY8uc7NnsO+1JIBO8e66glqag0un3t9eyW2Qn9GJbcYaDMqrCg4iY1uRgQMoJwN9XKyJZvLQYGdWUm+PakjJe51WWlL2Xa1KhHai/64O8mHjoSabwvcxX3PEUTgsbJvNPHxHy4gwQDhvcFyQYDZccDjZiwZBS2Nvp+CirWUzO/PjvcJpitvjQCZM5MYkzjhLo87HpsDlykQLoVj5kz5xu40C+sGtUaSdpU+hssTKMvir8d3Cvw4XpaHLi2Jaef7l5qVLyJuuYPqznTZmxc6cqTX5Tsr3LEbSi7HM/YjsXcRoAVp5tZmx8029OxlbdXVbot30M/9JZDPH+i3nIzY9JNATkdGblWCIpsgWREYPF0Xy8bbO0taDVjAxBADU97PbJ9G9WilDF86e52uXkLtZTdHueudlLH714CbmYy4buPLJx8KDDSKeZkXQpX7T3YyZXwCn9mumb5j7v1kpe379E2pbDJI1o83g3sXd4SCtjic73zSEVI+J92ljNgmZ3Iv+rEWX2sTI8u/SJ9WGY/fw4GkpD1O6qILajaJ5NVrnOPIe/Kl3jK1j4WGa8S3+IRXToM+qEQHvZ7UNQ1XYURKUgJBGlTBcoWIma7XLPCaUyh5zbC6SvA6WH736oTXARe2zG2a5or97/7ydmlin7qSfAPvBsntJ2kpgx+41UMIIFrwYJKoZIhvcNAQcBoIIFoASCBZwwggWYMIIFlAYLKoZIhvcNAQwKAQKgggTuMIIE6jAcBgoqhkiG9w0BDAEDMA4ECIXzsjmhRuT2AgIIAASCBMgfn7SrrZAfCjspbVsf4IyuQNw6DLzLLwygGbEwTBSSO/yXzDfFPWIM3j+RrFCt6leah5W0AM05hDjI0MacxTrcDdc8KQTK63PAuTX5beBELbyXOQYL1tm+LGJHsfVjBh+tMHkx4MwRckUlxWTksBrz/FTO59gs0X8T4IvLbSjQI2sIl6lQJaE2jHfLV0xytGhxdUzsTQaY6TkULVfinapfA3zwP+Uh1obKz6XarWXuSdODWznbm0OKCNf3ZyM8LZJ9BVjIeU8Xm6Wof3bOaiaqck2J5z3lJqvyVhx42RJ2ELWuW92ilWwgmvyAgYZGP17Ckdu8lkZSJWGdmUbyOzAZcoZnYZ6ciH1F0PIT9UuwMhBM6o/GVEjEch80f1OjBE02LHSg75oVaZAp8BvrqsEETO+yj5be6RV9B/qun2Kp6VICpvCCL9qkbM/9KoyfGSf4/ksqy9mgz93SlKWX1Hd3Q8X4u7Hl9ZWeIIsFto9GSZi+MgWu8q7H3nab9w8PAeWZKcowUdRO8WF1yk7cOLcOMWzj9Tdu4pWXkzy/8te9c3YguP6Irg7eKu4d5mVTJ6i2hLsIJIF57yny6qudDVwcrncRWYDdrNJiLgqoJMsCS6uuUIR6str5q67p9veYJxBeaChr+DXRwrAxkmMc7aLYzg7FIZIFtVi6X5+tgEugb2T/inkBFNRsdaeapaYdsS9yN8vuK9u9iFPh6uOhPWdRbeev5nmqgI0Va8o+CVsPKmeVBKmSCTArdnUHLca9EutFTwly7Fs5RT8FJDLGL257f1qDNEziKEO8TQa3ePU5szvo1+OARCS9NcDxNWlC3V4evXhJBfrWKopKanUjyzWUHUI/0NWECSNSvk9etaLSklpbAMjnynGaxkrkYSHZdn3LVvswL6HKTEuedP3o7c/s7ntAwoI7U3GJxwZR/35nMZ5/A0HmxKsXN8j41hEmR3yI/IUt3+wjaDVMTrlvKjVlA3xkAP786dpvl+rZ0lxJ9vlI5EVhrclNx5LJ6LP54z66E7cjZ7QQ6gmV6WmxXaGQLESTRzySGTfSoqMDcAY0IIVi38BnNedXrPYxW5kvQfV2uDKcIAZjuJj+mbM4zLnVRJfmCsfTyX5xSOAQZTMH468OmKepTSqiYi7P8OQS+6aJPwvvS8kI4wlcevK67Iol8xuTPDGeb7UjNcKFzy2B5A1bY7p4wi/9ya/XX3Y9z6HWgXP+vlKJHufx87nVzdB2QPpEtTL3ViuofUedjde1v38X8CmJk4Frfl0WKgQNqL5FMphDhPAAeXxHx9iDTz5aj7huiyD2AUbvfji1ZmKnU4rs+roVAIRgR7XvIGbHLNOQQXU8WLJk/s2Gdoe2WzzFEkYX+gTJO1ck9lRJ1UthHiGgLkFXZQan3VLx9yJy2deQQHHcC8TmcZftcwFLL5FAIFnOfEBjn3J1F/DUV8QRx4JSg3JEQ/zeNhqVjL/FSXT2UOhByXSszyohg1/YwMu2y+BjLCAhbWQ9fE5JjiB18k0aJ+tIa+IXbGvRnIbfQ/CuKR8tcO+rZH3yMAhrAyzExPOy23dtepPhDfHxfKUg2LJjP5Os+W7Wz3s5NJZJ0lylBdI07K3oxpEYSQqETpM3Tbi2eqqHz04xgZIwIwYJKoZIhvcNAQkVMRYEFEOPmF4Q9xuoktRsS+bjv/BS66yrMGsGCSqGSIb3DQEJFDFeHlwASgBPAFAARQAgAFIARQBTAFQAQQBVAFIAQQBOAFQARQAgAEUAIABFAFYARQBOAFQATwBTACAATABUAEQAQQA6ADMAMgAyADQAMQA1ADEAMAAwADAAMAAxADQANzAtMCEwCQYFKw4DAhoFAAQUsssk3H43jpCQRQo5LSzMEGjrlhkECDyUI+812Kl6",
	passCert: "1234",
	xMun: 'Feira de Santana',
	UF: 'BA',
	tpAmb: 2
}

obj.Cnpj = '32241510000147'
obj.InscricaoMunicipal = '697869'

//CANCELAMENTO E SUBSTITUIÇÃO
obj.Numero = '202000000000004'
obj.CodigoMunicipio = '2910800'
//FIM

obj.NaturezaOperacao = 1
obj.RegimeEspecialTributacao = ''
obj.OptanteSimplesNacional = 1
obj.IncentivadorCultural = 2

obj.Rps = {
	Numero: '4',
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
	InscricaoMunicipal: '',
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
		Email: 'juliadson.sm@gmail.com'
	}
}

obj.Servico = {
	Valores: {
		ValorServicos: '500',
		ValorIss: '19',
		Aliquota: '0.038',
	},
	IssRetido: 2,
	ItemListaServico: '1711',
	CodigoCnae: '5611201',
	CodigoTributacaoMunicipio: '1711',
	Discriminacao: '64238 15 a 17 09 2020',
	CodigoMunicipio: '2910800',
	ExigibilidadeISS: 1,
	MunicipioIncidencia: '9999999'
}

//EMISSÃO RPS
// let note = new Make(obj, 'EnviarLoteRpsEnvio')
// XmlSigner(note, obj.inf, 'LoteRps', (xml) => {
// 	new Sefaz().Send(xml, obj.inf, 'RecepcionarLoteRps', async result => {
// 		let Protocolo = ResultExtract(result.data, obj.inf, 'EnviarLoteRps').Protocolo
// 		if (Protocolo) {
// 			obj.Protocolo = Protocolo
// 			receipt(obj, obj.inf)
// 		} else {
// 			console.log(result)
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

//CONSULTAR NFSE
let note = new Make(obj, 'ConsultarNfseRpsEnvio'),
	xml = ObjtoXml(note)

new Sefaz().Send(xml, obj.inf, 'ConsultarNfsePorRps', result => {
	console.log(ResultExtract(result.data, null, 'ConsultarNfseRps'))
})

//CONSULTA SITUAÇÃO RPS
//CONSULTA LOTE RPS
const receipt = async function (obj, info) {
	await Sleep(4000)
	let note = new Make(obj, 'ConsultarSituacaoLoteRpsEnvio'),
		xml = ObjtoXml(note)
	new Sefaz().Send(xml, info, 'ConsultarSituacaoLoteRps', result => {
		const situacao = ResultExtract(result.data, info, 'ConsultarSituacaoLoteRps').Situacao
		switch (situacao) {
			case '1':
			case '2':
				console.log('Result: ', result)
				receipt(obj, info)
				break;
			case '3':
			case '4':
				let note = new Make(obj, 'ConsultarLoteRpsEnvio'),
					xml = ObjtoXml(note)
				new Sefaz().Send(xml, info, 'ConsultarLoteRps', result => {
					console.log(JSON.stringify(ResultExtract(result.data, info, 'ConsultarLoteRps')))
				})
				break;
		}
	})

}


