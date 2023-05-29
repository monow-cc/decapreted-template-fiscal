import Make from './Make.mjs'
import { ObjtoXml, XmltoObj, Sleep } from '../../../Common/Utils.mjs'
import { XmlSigner, XmlValidation, ResultExtract } from './Common/Tools.mjs'
import Sefaz from './Common/Sefaz.mjs'
import fs from 'fs'

class WebISS1 {
	constructor() {
	}

	async Method(obj, callback) {
		switch (obj.inf.method) {
			case 'Send':
				Send(obj, result => {
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

export default WebISS1

//EMISSÃO RPS
const Send = async function (obj, callback) {
	let note = new Make(obj, 'EnviarLoteRpsEnvio')

	XmlSigner(note, obj.inf, 'LoteRps', (xml) => {
		if (XmlValidation(xml, 'servico_enviar_lote_rps_envio')) {
			new Sefaz().Send(xml, obj.inf, 'RecepcionarLoteRps', async result => {
				console.log(result)
				let Protocolo = ResultExtract(result.data, obj.inf, 'EnviarLoteRps').Protocolo
				if (Protocolo) {
					obj.Protocolo = Protocolo
					Receipt(obj, obj.inf, result => {
						callback(result)
					})
				} else {
					callback(ResultExtract(result.data, obj.inf, 'EnviarLoteRps'))
				}
			})
		}
	})
}

//CANCELAMENTO
const Cancel = async function (obj, callback) {
	let note = new Make(obj, 'CancelarNfseEnvio')

	XmlSigner(note, obj.inf, 'InfPedidoCancelamento', (xml) => {
		if (XmlValidation(xml, 'servico_cancelar_nfse_envio')) {
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

	new Sefaz().Send(xml, obj.inf, 'ConsultarNfsePorRps', result => {
		callback(ResultExtract(result.data, null, 'ConsultarNfseRps'))
	})
}

const Receipt = async function (obj, info, callback) {
	await Sleep(7000)
	let note = new Make(obj, 'ConsultarSituacaoLoteRpsEnvio'),
		xml = ObjtoXml(note)
	new Sefaz().Send(xml, info, 'ConsultarSituacaoLoteRps', result => {
		const situacao = ResultExtract(result.data, info, 'ConsultarSituacaoLoteRps').Situacao
		switch (situacao) {
			case '1':
			case '2':
				console.log('Result: ', result)
				Receipt(obj, info, result =>{
					callback(result)
				})
				break
			case '3':
			case '4':
				let note = new Make(obj, 'ConsultarLoteRpsEnvio'),
					xml = ObjtoXml(note)
				new Sefaz().Send(xml, info, 'ConsultarLoteRps', result => {
					console.log(result)
					callback(ResultExtract(result.data, info, 'ConsultarLoteRps'))
				})
				break
		}
	})

}