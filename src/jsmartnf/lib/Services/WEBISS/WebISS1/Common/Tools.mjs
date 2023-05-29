import fs from 'fs'
import SignedXml from 'xml-crypto'
import { GetCertKeys, KeyProvider, CertInfoIssuer } from '../../../../Common/Certificate.mjs'
import { GetDir, ObjtoXml, XmltoObj } from '../../../../Common/Utils.mjs'
import val from '../../../../Storage/Plugins/xmllint'

export function XmlValidation(xml, file, schemes = 'SCHEMASV107_1.0') {
	let schema = fs.readFileSync(GetDir() + '/../Storage/Schemes/WEBISS/WebISS1/' + schemes + '/' + file + '.xsd').toString(),
		complexos = fs.readFileSync(GetDir() + '/../Storage/Schemes/WEBISS/WebISS1/' + schemes + '/tipos_complexos.xsd').toString(),
		core = fs.readFileSync(GetDir() + '/../Storage/Schemes/WEBISS/WebISS1/' + schemes + '/xmldsig-core-schema20020212.xsd').toString(),
		simples = fs.readFileSync(GetDir() + '/../Storage/Schemes/WEBISS/WebISS1/' + schemes + '/tipos_simples.xsd').toString()

	complexos = complexos.replace('xmldsig-core-schema20020212.xsd', 'file_0.xsd')
	schema = schema.replace('xmldsig-core-schema20020212.xsd', 'file_0.xsd')
	complexos = complexos.replace('tipos_simples.xsd', 'file_1.xsd')
	schema = schema.replace('tipos_complexos.xsd', 'file_2.xsd')

	const Module = {
		xml: xml,
		schema: [core, simples, complexos, schema]
	}

	let result = val.validateXML(Module)

	if (result.errors != null) {
		console.log(result.errors)
		return false
	}

	return true
}

export function XmlSigner(obj, inf, node, callback) {
	let xml = ObjtoXml(obj)

	const sig = new SignedXml.SignedXml(),
		transforms = ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"],
		canonicalization = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"

	if (node == 'InfRps') {
		sig.addReference("//*[local-name(.)='" + node + "']", transforms)
	} else if (node == 'LoteRps') {
		sig.addReference("//*[local-name(.)='" + node + "']", transforms)
	} else if (node == 'InfPedidoCancelamento') {
		sig.addReference("//*[local-name(.)='" + node + "']", transforms)
	} else if (node == 'SubstituicaoNfse') {
		sig.addReference("//*[local-name(.)='" + node + "']", transforms)
	}

	sig.canonicalizationAlgorithm = canonicalization
	sig.signingKey = GetCertKeys(inf).key
	sig.keyInfoProvider = new KeyProvider(inf)

	if (node == 'InfRps') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='Rps']", action: "append" }
		})
	} else if (node == 'LoteRps') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='EnviarLoteRpsEnvio']", action: "append" }
		})
	} else if (node == 'InfPedidoCancelamento') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='Pedido']", action: "append" }
		})
	} else if (node == 'SubstituicaoNfse') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='SubstituirNfseEnvio']", action: "append" }
		})
	}

	callback(sig.getSignedXml())
}

export function ResultExtract(result, inf, metod) {
	let type = `${metod}Resposta`,
		obj = XmltoObj(result)[type],
		MensagemRetorno, infNfse

	if (obj.ListaMensagemRetorno)
		MensagemRetorno = obj.ListaMensagemRetorno.MensagemRetorno
	
	delete obj.DataRecebimento
	delete obj.attributes

	if (MensagemRetorno) {
		if (Array.isArray(MensagemRetorno)) {
			return {
				error: MensagemRetorno[MensagemRetorno.length - 1].Codigo,
				msg: MensagemRetorno[MensagemRetorno.length - 1].Mensagem
			}
		} else {
			return {
				error: MensagemRetorno.Codigo,
				msg: MensagemRetorno.Mensagem
			}
		}
	}

	switch (type) {
		case 'CancelarNfseResposta':
			let RetCancelamento = obj.RetCancelamento
			return {
				data: RetCancelamento,
				msg: 'Nota cancelada com sucesso!'
			}
		case 'ConsultarSituacaoLoteRpsResposta':
			return {
				NumeroLote: obj.NumeroLote,
				Situacao: obj.Situacao
			}
		case 'ConsultarNfseRpsResposta':
			return {
				data: obj,
				msg: 'Consulta realizada com sucesso!'
			}
		case 'EnviarLoteRpsResposta':
			return {
				NumeroLote: obj.NumeroLote,
				DataRecebimento: obj.DataRecebimento,
				Protocolo: obj.Protocolo
			}
		case 'ConsultarLoteRpsResposta':
			infNfse = obj.ListaNfse.CompNfse.Nfse.InfNfse
			return {
				data: obj.ListaNfse,
				msg: 'Consulta realizada com sucesso!'
			}
	}
}
