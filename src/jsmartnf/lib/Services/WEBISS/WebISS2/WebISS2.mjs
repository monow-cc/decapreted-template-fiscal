import Make from './Make.mjs'
import { ObjtoXml, XmltoObj } from '../../../Common/Utils.mjs'
import { XmlSigner, XmlValidation, ResultExtract } from './Common/Tools.mjs'
import Sefaz from './Common/Sefaz.mjs'

class WebISS2 {
	constructor() {
	}

	async Method(obj, callback) {
		switch (obj.inf.method) {
			case 'Send':
				Send(obj, result => {
					callback(result)
				})
				return
			case 'NFSe':
				NFSe(obj, result => {
					callback(result)
				})
				return
			case 'Replace':
				Replace(obj, result => {
					callback(result)
				})
				return
			case 'Cancel':
				Cancel(obj, result => {
					callback(result)
				})
				return
			case 'Consult':
				Consult(obj, result => {
					callback(result)
				})
				return
			default:
				callback({
					error: 1,
					msg: `Função não disponivel para ${obj.inf.xMun}`
				})
				return
		}
	}
}

export default WebISS2

//EMISSÃO RPS
const Send = async function (obj, callback) {
	let note = new Make(obj, 'EnviarLoteRpsSincronoEnvio')

	XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
		XmlSigner(XmltoObj(xml), obj.inf, 'LoteRps', (xml) => {
			if (XmlValidation(xml)) {
				new Sefaz().Send(xml, obj.inf, 'RecepcionarLoteRpsSincrono', result => {
					callback(ResultExtract(result.data, obj.inf, 'EnviarLoteRpsSincrono'))
				})
			}
		})
	})
}

//EMISSÃO NFSE
const NFSe = async function (obj, callback) {
	let note = new Make(obj, 'GerarNfseEnvio')

	XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
		if (XmlValidation(xml)) {
			new Sefaz().Send(xml, obj.inf, 'GerarNfse', result => {
				callback(ResultExtract(result.data, obj.inf, 'GerarNfse'))
			})
		}
	})
}

//SUBSTITUIÇÃO
const Replace = async function (obj, callback) {
	let note = new Make(obj, 'SubstituirNfseEnvio')

	XmlSigner(note, obj.inf, 'InfDeclaracaoPrestacaoServico', (xml) => {
		XmlSigner(XmltoObj(xml), obj.inf, 'InfPedidoCancelamento', (xml) => {
			XmlSigner(XmltoObj(xml), obj.inf, 'SubstituicaoNfse', (xml) => {
				if (XmlValidation(xml)) {
					new Sefaz().Send(xml, obj.inf, 'SubstituirNfse', result => {
						callback(ResultExtract(result.data, obj.inf, 'SubstituirNfse'))
					})
				}
			})
		})
	})
}

//CANCELAMENTO
const Cancel = async function (obj, callback) {
	let note = new Make(obj, 'CancelarNfseEnvio')

	XmlSigner(note, obj.inf, 'InfPedidoCancelamento', (xml) => {
		if (XmlValidation(xml)) {
			new Sefaz().Send(xml, obj.inf, 'CancelarNfse', result => {
				callback(ResultExtract(result.data, null, 'CancelarNfse'))
			})
		}
	})
}

//CONSULTAR NFSE
const Consult = async function (obj, callback) {
	let note = new Make(obj, 'ConsultarNfseRpsEnvio'),
		xml = ObjtoXml(note)

	if (XmlValidation(xml)) {
		new Sefaz().Send(xml, obj.inf, 'ConsultarNfsePorRps', result => {
			callback(ResultExtract(result.data, obj.inf, 'ConsultarNfseRps'))
		})
	}
}
