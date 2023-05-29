import fs from 'fs'
import SignedXml from 'xml-crypto'
import { GetCertKeys, KeyProvider, CertInfoIssuer } from '../../../../Common/Certificate.mjs'
import { GetDir, ObjtoXml, XmltoObj } from '../../../../Common/Utils.mjs'
import val from '../../../../Storage/Plugins/xmllint'

export function XmlValidation(xml, schemes = "NFSe_V2_02", file = 'nfse_v2_02') {
	let schema = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/' + file + '.xsd').toString(),
		core = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/xmldsig-core-schema20020212.xsd').toString()
	schema = schema.replace('xmldsig-core-schema20020212.xsd', 'file_0.xsd')

	const Module = {
		xml: xml,
		schema: [core, schema]
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

	if (node == 'InfDeclaracaoPrestacaoServico') {
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

	if (node == 'InfDeclaracaoPrestacaoServico') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='Rps']", action: "append" }
		})
	} else if (node == 'LoteRps') {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='EnviarLoteRpsSincronoEnvio']", action: "append" }
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
		case 'EnviarLoteRpsSincronoResposta':
			infNfse = obj.ListaNfse.CompNfse.Nfse.InfNfse
			return {
				data: obj.ListaNfse,
				msg: 'Nota emitida com sucesso!',
				url: `${inf.url}/externo/nfse/visualizar/${CertInfoIssuer(inf).CNPJ}/${infNfse.CodigoVerificacao}/${infNfse.Numero}`
			}
		case 'SubstituirNfseResposta':
			let RetSubstituicao = obj.RetSubstituicao
			infNfse = RetSubstituicao.NfseSubstituidora.CompNfse.Nfse.InfNfse
			return {
				data: RetSubstituicao.NfseSubstituidora,
				msg: 'Nota substituída com sucesso!',
				url: `${inf.url}/externo/nfse/visualizar/${CertInfoIssuer(inf).CNPJ}/${infNfse.CodigoVerificacao}/${infNfse.Numero}`
			}
		case 'GerarNfseResposta':
			infNfse = obj.ListaNfse.CompNfse.Nfse.InfNfse
			return {
				data: obj.ListaNfse,
				msg: 'Nota emitida com sucesso!',
				url: `${inf.url}/externo/nfse/visualizar/${CertInfoIssuer(inf).CNPJ}/${infNfse.CodigoVerificacao}/${infNfse.Numero}`
			}
		case 'ConsultarNfseRpsResposta':
			infNfse = obj.CompNfse.Nfse.InfNfse
			return {
				data: obj,
				msg: 'Consulta realizada com sucesso!',
				url: `${inf.url}/externo/nfse/visualizar/${CertInfoIssuer(inf).CNPJ}/${infNfse.CodigoVerificacao}/${infNfse.Numero}`
			}
	}
}
