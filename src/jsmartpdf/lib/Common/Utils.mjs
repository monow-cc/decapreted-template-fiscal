import xmlobj from 'fast-xml-parser'
import * as Parser from 'fast-xml-parser'
import moment from 'moment'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import codes from 'rescode'

export function XmltoObj(xml, callback) {

	let options = {
		attributeNamePrefix: "",
		attrNodeName: "attributes",
		ignoreAttributes: false,
		ignoreNameSpace: false,
		allowBooleanAttributes: false,
		parseNodeValue: false,
		parseAttributeValue: false,
		trimValues: true,
		cdataTagName: "__cdata",
		cdataPositionChar: "\\c",
		parseTrueNumberOnly: false
	}

	return xmlobj.parse(xml, options)
}

export function ObjtoXml(obj) {

	let options = {
		attributeNamePrefix: "",
		attrNodeName: "attributes",
		textNodeName: "text",
		ignoreAttributes: false,
		cdataTagName: "__cdata",
		cdataPositionChar: "\\c",
		format: false,
		indentBy: "  ",
		supressEmptyNode: false,
	}

	let objtoxml = new Parser.j2xParser(options)
	return objtoxml.parse(obj)
}

export function OnlyNumbers(str) {
	return str.replace(/[^\d]+/g, '')
}

export function RemoveAccents(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function GetDir() {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	return __dirname
}

export function Prettify_NFe(data) {

	if(data.nfeProc)
		data = data.nfeProc

	let obj = new Object()
	obj.det = []
	obj.pag = []

	obj.chave = data.NFe.infNFe.attributes.Id.replace('NFe', '')

	obj.ide = data.NFe.infNFe.ide
	obj.emit = data.NFe.infNFe.emit
	obj.dest = data.NFe.infNFe.dest == undefined ? undefined : data.NFe.infNFe.dest

	let det = data.NFe.infNFe.det

	if (Array.isArray(det)) {
		det.map((item) => {
			delete item.attributes
			obj.det.push(item)
		})
	} else {
		delete det.attributes
		obj.det.push(det)
	}

	obj.total = data.NFe.infNFe.total
	obj.transp = data.NFe.infNFe.transp

	if(data.NFe.infNFe.cobr){
		obj.cobr = {
			dup: []
		}
		obj.cobr.fat = data.NFe.infNFe.cobr.fat
		let dup = data.NFe.infNFe.cobr.dup
		if (Array.isArray(dup)) {
			dup.map((item) => {
				obj.cobr.dup.push(item)
			})
		} else {
			obj.cobr.dup.push(dup)
		}
	}

	if (data.NFe.infNFe.pag) {
		let pag = data.NFe.infNFe.pag == undefined ? undefined : JSON.parse(JSON.stringify(data.NFe.infNFe.pag.detPag))
		if (Array.isArray(pag)) {
			pag.map((item) => {
				delete item.vTroco
				obj.pag.push(item)
			})
		} else {
			delete pag.vTroco
			obj.pag.push(pag)
		}
		obj.vTroco = data.NFe.infNFe.pag.vTroco == undefined ? '0.00' : data.NFe.infNFe.pag.vTroco
	}

	obj.infAdic = data.NFe.infNFe.infAdic == undefined ? undefined : data.NFe.infNFe.infAdic
	obj.infNFeSupl = data.NFe.infNFeSupl == undefined ? undefined : data.NFe.infNFeSupl

	if(data.protNFe){
		delete data.protNFe.infProt.attributes
		obj.infProt = data.protNFe.infProt
	}

	return obj
}

export function Prettify_CCe(data) {
	let obj = new Object()
	obj.infEvento = data.procEventoNFe.evento.infEvento
	obj.detEvento = data.procEventoNFe.evento.infEvento.detEvento
	obj.retEvento = data.procEventoNFe.retEvento
	return obj
}

export function BarCode(ean, type = 'code128', text = false) {
	codes.loadModules([`${type}`], { includetext: text })
    return codes.create(`${type}`, ean)
}

export function MaskCPF(value) {
	return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
}

export function MaskCNPJ(value) {
	return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5")
}

export function MaskChave(value) {
	return value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
		"\$1 \$2 \$3\ \$4\ \$5 \$6 \$7 \$8 \$9 \$10 \$11")
}

export function MaskNumberNFe(value) {
	return value.replace(/(\d{3})(\d{3})(\d{3})/g, "\$1.\$2.\$3")
}

export function MaskCEP(value) {
	return value.replace(/(\d{5})(\d{3})/g, "\$1\-\$2")
}

export function MaskFone(value) {
	return value.replace(/(\d{2})(\d{4,5})(\d{4})/g, "\($1\) \$2\-\$3")
}

export function MaskDateAndHour(value) {
	let date = value.split('T')[0].split('-'),
		hour = value.split('T')[1].split('-')[0]
	return date[2] + '/' + date[1] + '/' + date[0] + ' ' + hour
}

export function MaskDate(value) {
	let date = value.split('T')[0].split('-')
	return date[2] + '/' + date[1] + '/' + date[0]
}

export function MaskHour(value) {
	let hour = value.split('T')[1].split('-')[0]
	return hour
}

export function ToReais(value) {
	return `${parseFloat(value).toFixed(2).replace(".", ",")}`
}

export function MaskDoc(value) {
	if(value == undefined)
		return ''
	else if (value.length == '11')
		return MaskCPF(value)
	else
		return MaskCNPJ(value)
}