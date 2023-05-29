import fs from 'fs'
import moment from "moment";
import sha1Hex from 'sha1-hex'
import SignedXml from 'xml-crypto'
import Protocol from '../Products/Protocol.mjs'
import ProtocolEvent from '../Products/Events/Protocol/ProtocolEvent.mjs'
import ProtocolInut from '../Products/InutNFe/Protocol/ProtocolInut.mjs'
import val from '../Storage/Plugins/xmllint.js'
import { GetCertKeys, KeyProvider } from './Certificate.mjs'
import { RandomCNF, GetDir, GetLayoutSchema, BuildVerifyingDigit, ObjtoXml, XmltoObj, Unzip } from './Utils.mjs'
import { NF_PDF, EV_PDF } from '../../../jsmartpdf/jsmartpdf.mjs'

export function BuildKey(obj) {
	log.info(`FISCAL BUILD KEY`)
	obj.infNFe.ide.cNF = RandomCNF(obj.infNFe.ide.nNF)

	let key = obj.infNFe.ide.cUF +
		moment(obj.infNFe.ide.dhEmi).format('YY') + moment(obj.infNFe.ide.dhEmi).format('MM') +
		obj.infNFe.emit.CNPJ.toString().padStart(14, "0") +
		obj.infNFe.ide.mod.toString().padStart(2, "0") +
		obj.infNFe.ide.serie.toString().padStart(3, "0") +
		obj.infNFe.ide.nNF.toString().padStart(9, "0") +
		obj.infNFe.ide.tpEmis +
		obj.infNFe.ide.cNF

	const verifyingDigit = BuildVerifyingDigit(key)

	key += verifyingDigit
	obj.infNFe.attributes.Id = `NFe${key}`
	obj.infNFe.ide.cDV = verifyingDigit

	return obj
}

export function AddQrCode(xml, inf, vQrCode = "2") {
	log.info(`FISCAL BUILD QR CODE`)

	let obj = XmltoObj(xml)

	const key = obj.enviNFe.NFe.infNFe.attributes.Id.replace('NFe', ''),
		tpAmb = obj.enviNFe.NFe.infNFe.ide.tpAmb,
		dhEmi = moment(obj.enviNFe.NFe.infNFe.ide.dhEmi).format('DD'),
		vNF = obj.enviNFe.NFe.infNFe.total.ICMSTot.vNF,
		digestValue = Buffer.from(obj.enviNFe.NFe.Signature.SignedInfo.Reference.DigestValue, 'utf8').toString('hex'),
		UF = obj.enviNFe.NFe.infNFe.emit.enderEmit.UF,
		tpEmis = obj.enviNFe.NFe.infNFe.ide.tpEmis

	let urlSefaz = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/WebServicesNFCe.json'))),
		urlChave = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/NFCeConsutaChave.json')))

	let qrCode = urlSefaz[UF][tpAmb]['NfeConsultaQR']['Url'] + "?p=",
		seq = `${key}|${vQrCode}|${tpAmb}|${inf.idCsc}`

	if (tpEmis == 9)
		seq = `${key}|${vQrCode}|${tpAmb}|${dhEmi}|${vNF}|${digestValue}|${inf.idCsc}`

	let hash = sha1Hex(seq + inf.csc).toUpperCase()
	qrCode += seq + '|' + hash

	let Signature = JSON.parse(JSON.stringify(obj.enviNFe.NFe.Signature))
	delete obj.enviNFe.NFe.Signature

	obj.enviNFe.NFe.infNFeSupl = {
		qrCode: qrCode,
		urlChave: urlChave[UF][tpAmb]
	}

	obj.enviNFe.NFe.Signature = Signature

	return ObjtoXml(obj)
}

export async function AddNFeProt(xml, result, inf, callback) {
	if (result != undefined) {
		if (result.cStat == '104') {
			if (result.protNFe.infProt.cStat == '100') {
				let obj = XmltoObj(xml),
					nfeProt = new Protocol(obj, result)
				log.info(`FISCAL PROTOCOL XML NF`)
				callback({
					error: 0,
					data: `${ObjtoXml(nfeProt).split('"').join("'")}`,
					msg: result.protNFe.infProt.xMotivo,
					pdf: await NF_PDF(nfeProt, inf.logo)
				})

			} else {
				callback({
					error: result.protNFe.infProt.cStat,
					data: null,
					msg: result.protNFe.infProt.xMotivo
				})
			}
		} else {
			console.log('RESULT ENVIO NF', result)
			callback({
				error: result.cStat,
				data: null,
				msg: result.xMotivo
			})
		}
	} else {
		log.error('FALHA DE COMUNICACAO')
		callback({
			error: 54,
			data: null,
			msg: 'Sefaz indisponivel, tente novamente!'
		})
	}
}

export async function AddEnvProt(xml, result, inf, callback) {
	console.log(result)
	if (result != undefined) {
		if (result.cStat == '128') {
			if (result.retEvento.infEvento.cStat == '135') {
				let obj = XmltoObj(xml),
					eventProt = new ProtocolEvent(obj, result)
				log.info(`FISCAL PROTOCOL XML EVENT`)
				callback({
					error: 0,
					data: `${ObjtoXml(eventProt).split('"').join("'")}`,
					msg: result.retEvento.infEvento.xMotivo,
					pdf: await EV_PDF(eventProt, inf.xml, inf.logo)
				})

			} else {
				callback({
					error: result.retEvento.infEvento.cStat,
					data: null,
					msg: result.retEvento.infEvento.xMotivo
				})
			}
		} else {
			callback({
				error: result.cStat,
				data: null,
				msg: result.xMotivo
			})
		}
	} else {
		log.error('FALHA DE COMUNICACAO')
		callback({
			error: 54,
			data: null,
			msg: 'Sefaz indisponivel, tente novamente!'
		})
	}
}

export function AddInutProt(xml, result, callback) {
	try {
		if (result != undefined) {
			log.info("RESULT INUTILIZAÇÃO: ", result)
			if (result.retInutNFe.infInut.cStat == '102') {
				let obj = XmltoObj(xml),
					inutProt = new ProtocolInut(obj, result)
				log.info(`FISCAL PROTOCOL XML INUT`)
				callback({
					error: 0,
					data: `${ObjtoXml(inutProt).split('"').join("'")}`,
					msg: result.retInutNFe.infInut.xMotivo
				})

			} else {
				callback({
					error: result.retInutNFe.infInut.cStat,
					data: null,
					msg: result.retInutNFe.infInut.xMotivo
				})
			}
		} else {
			log.error('FALHA DE COMUNICACAO')
			callback({
				error: 54,
				data: null,
				msg: 'Sefaz indisponivel, tente novamente!'
			})
		}
	} catch (error) {
		log.error('FALHA DE COMUNICACAO')
		callback({
			error: 54,
			data: null,
			msg: 'Sefaz indisponivel, tente novamente!'
		})
	}
}

export async function Contingency(xml, inf, callback) {
	let data = {
		NFe: XmltoObj(xml).enviNFe.NFe
	}
	callback({
		error: 0,
		data: `${xml.split('"').join("'")}`,
		msg: 'Nota emitida em contingência!',
		pdf: await NF_PDF(data, inf.logo)
	})
}

export async function UnzipNFe(result, xmlArray, data, callback) {
	if (result != undefined) {
		let obj = result.nfeDistDFeInteresseResult.retDistDFeInt
		if (obj.cStat == '138') {
			if (Array.isArray(obj.loteDistDFeInt.docZip)) {

				let ultNSU

				obj.loteDistDFeInt.docZip.map(el => {
					ultNSU = el.attributes.NSU
					if (el.attributes.schema.includes('resNFe')) {
						xmlArray.push(Unzip(el['$value']).split('"').join("'"))
					}
				})

				callback({
					error: 0,
					data: xmlArray,
					msg: obj.xMotivo,
					ultNSU: ultNSU,
					maxNSU: obj.maxNSU
				})
			} else {
				let xml = Unzip(obj.loteDistDFeInt.docZip['$value'])
				callback({
					error: 0,
					data: data.infEvento.ultNSU ? [`${xml.split('"').join("'")}`] : `${xml.split('"').join("'")}`,
					msg: obj.xMotivo,
					ultNSU: obj.ultNSU,
					maxNSU: obj.maxNSU
				})
			}
		} else {
			callback({
				error: obj.cStat,
				data: null,
				msg: obj.xMotivo
			})
		}
	} else {
		callback({
			error: 54,
			data: null,
			msg: 'Falha no Download!'
		})
	}
}

export function XmlValidation(xml, type = "nfe", schemes = "PL_009_V4", versao = '4.00') {

	log.info(`FISCAL VALIDATION XML`)

	let typeLayout = GetLayoutSchema(type),
		schema = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/' + type + '_v' + versao + '.xsd').toString(),
		layout = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/' + typeLayout + '_v' + versao + '.xsd').toString(),
		core = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/xmldsig-core-schema_v1.01.xsd').toString(),
		types = fs.readFileSync(GetDir() + '/../Storage/Schemes/' + schemes + '/tiposBasico_v' + versao + '.xsd').toString()

	layout = layout.replace('xmldsig-core-schema_v1.01.xsd', 'file_0.xsd')
	layout = layout.replace('tiposBasico_v' + versao + '.xsd', 'file_1.xsd')
	schema = schema.replace(typeLayout + '_v' + versao + '.xsd', 'file_2.xsd')

	const Module = {
		xml: xml,
		schema: [core, types, layout, schema]
	}

	let result = val.validateXML(Module)

	if (result.errors != null) {
		log.error('ERROS DE VALIDACAO', result)

		let errorMessage = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Exceptions/Exceptions.json'))),
			label = result.errors[0].toString().split("'")[1].toString().split("}")[1]

		for (let i = 0; i < result.errors.length; i++) {
			let lTemp = result.errors[i].toString().split("'")[1].toString().split("}")[1]
			log.error(`FISCAL VALIDATION XML ${errorMessage[lTemp] != undefined ? errorMessage[lTemp].msg.toUpperCase() : lTemp.toUpperCase() + ' FORA DO PADRAO ACEITO'}`)
		}

		if (errorMessage[label]) {
			log.error(`FISCAL VALIDATION XML ${errorMessage[label].msg.toUpperCase()}`)
			throw errorMessage[label]
		}
		else {
			log.error(`FISCAL VALIDATION XML "${label.toUpperCase()}" FORA DO PADRAO ACEITO`)
			throw { 'error': 40, 'data': null, 'msg': `Tag ${label} fora do padrão aceito!` }
		}
	}

	return true

}

export function XmlSigner(obj, cert, node, callback) {
	log.info(`FISCAL SIGNER XML`)
	let xml = ObjtoXml(obj)

	const sig = new SignedXml.SignedXml(),
		transforms = ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"],
		canonicalization = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"

	sig.addReference("//*[local-name(.)='" + node + "']", transforms)
	sig.canonicalizationAlgorithm = canonicalization
	sig.signingKey = GetCertKeys(cert).key
	sig.keyInfoProvider = new KeyProvider(cert)

	if (xml.indexOf("envEvento") != -1) {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='evento']", action: "append" }
		})
	} else if (xml.indexOf("enviNFe") != -1) {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='NFe']" }
		})
	}
	else if (xml.indexOf("inutNFe") != -1) {
		sig.computeSignature(xml, {
			location: { reference: "//*[local-name(.)='inutNFe']" }
		})
	} else {
		sig.computeSignature(xml)
	}

	callback(sig.getSignedXml())
}
