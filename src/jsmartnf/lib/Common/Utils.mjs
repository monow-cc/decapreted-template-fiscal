import fs from 'fs'
import xmlobj from 'fast-xml-parser'
import * as Parser from 'fast-xml-parser'
import pako from 'pako'
import { CertInfoIssuer } from './Certificate.mjs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export function BuildVerifyingDigit(key) {

	let total = 0
	let multiplier = 2

	for (let i = key.length - 1; i >= 0; i--) {
		if (9 < multiplier) {
			multiplier = 2
		}
		let digit = parseInt(key.substring(i, i + 1))
		if (!isNaN(digit)) {
			total += digit * multiplier++
		}
	}

	let remainder = (total % 11)

	if (0 === remainder || 1 === remainder) {
		return "0"
	}

	return (11 - remainder).toString()
}

export function GetLayoutSchema(schema) {
	switch (schema) {
		case "procNFe":
		case "nfe":
		case "enviNFe":
		case "retEnviNFe":
		case "retConsReciNFe":
		case "consReciNFe":
			return "leiauteNFe"
		case "procInutNFe":
		case "inutNFe":
		case "retInutNFe":
			return "leiauteInutNFe"
		case "retConsStatServ":
		case "consStatServ":
			return "leiauteConsStatServ"
		case "retConsSitNFe":
		case "consSitNFe":
			return "leiauteConsSitNFe"
		default:
			return null
	}
}

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

export function GetkeyData(key) {
	return {
		cUF: key.substring(0, 2),
		CNPJ: key.substring(6, 20)
	}
}

export function GetWService(obj, nfse = false) {

	log.info(`FISCAL GET WEBSERVICE`)
	if (nfse){
		const ambiente = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/WebServicesNFSe.json', 'utf8'))[obj.tpAmb]),
		xMun = RemoveAccents(obj.xMun.replace(/\s/g, '').toUpperCase()),
		service = ambiente[obj.UF][xMun]
		return service
	}

	const authorization = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/Authorization.json', 'utf8')))

	let services = null,
		webServices = null,
		state = obj.AN ? { UF: 'AN' } : { UF: obj.UF }
	
	if (state.UF == undefined){
		state.UF = obj.UF
	}

	if (obj.mod == '55') {
		webServices = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/WebServicesNFe.json', 'utf8')))
		services = webServices[authorization['55'][state.UF]][obj.tpAmb]
		return services
	}

	webServices = new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/WebServicesNFCe.json', 'utf8')))
	services = webServices[authorization['65'][state.UF]][obj.tpAmb]

	return services
}

export function OnlyNumbers(str) {
	return str.replace(/[^\d]+/g, '')
}

export function RemoveAccents(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function RandomCNF(nNF) {
	let cNF = ''
	let loop = true
	while (loop) {
		cNF = Math.floor(Math.random() * (99999999 - 0)).toString().padStart(8, "0")
		if (CNFValid(cNF) < 0) {
			loop = false
		}
		if (nNF != undefined) {
			if (cNF == nNF) {
				loop = true
			}
		}
	}
	return cNF
}

export function GetDir() {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	return __dirname
}

export function Prettify(data) {
	let obj = new Object()
	obj.det = []
	obj.pag = []

	obj.ide = data.nfeProc.NFe.infNFe.ide
	obj.emit = data.nfeProc.NFe.infNFe.emit
	obj.dest = data.nfeProc.NFe.infNFe.dest ? data.nfeProc.NFe.infNFe.dest : undefined

	let det = JSON.parse(JSON.stringify(data.nfeProc.NFe.infNFe.det))

	if (Array.isArray(det)) {
		det.map((item) => {
			delete item.attributes
			obj.det.push(item)
		})
	} else {
		delete det.attributes
		obj.det.push(det)
	}

	obj.total = data.nfeProc.NFe.infNFe.total
	obj.transp = data.nfeProc.NFe.infNFe.transp

	let pag = data.nfeProc.NFe.infNFe.pag ? data.nfeProc.NFe.infNFe.pag : undefined
	obj.pag.push(pag)

	obj.vTroco = data.nfeProc.NFe.infNFe.pag.vTroco ? data.nfeProc.NFe.infNFe.pag.vTroco : '0.00'

	obj.infAdic = data.nfeProc.NFe.infNFe.infAdic ? data.nfeProc.NFe.infNFe.infAdic : undefined
	obj.infNFeSupl = data.nfeProc.NFe.infNFeSupl ? data.nfeProc.NFe.infNFeSupl : undefined

	let infProt = JSON.parse(JSON.stringify(data.nfeProc.protNFe.infProt))
	delete infProt.attributes
	obj.infProt = infProt

	return obj
}

export function PrettifyCompany(data) {
	let emit = {
		CNPJ: data.CNPJ ? OnlyNumbers(data.CNPJ) : null,
		CPF: data.CPF ? OnlyNumbers(data.CPF) : null,
		xNome: data.xNome,
		xFant: data.xFant,
		enderEmit: {
			xLgr: data.xLgr,
			nro: data.nro,
			xCpl: data.xCpl,
			xBairro: data.xBairro,
			cMun: data.cMun,
			xMun: data.xMun,
			UF: data.UF,
			CEP: data.CEP ? OnlyNumbers(data.CEP) : null,
			cPais: null,
			xPais: null,
			fone: data.fone ? OnlyNumbers(data.fone) : null
		},
		IE: data.IE,
		IEST: null,
		IM: data.IM,
		CNAE: data.CNAE,
		CRT: data.CRT
	}
	return emit
}

export function ValidateCompany(company) {
	let obj = JSON.parse(JSON.stringify(company)),
		enderEmit = JSON.parse(JSON.stringify(obj.enderEmit))
	delete obj.enderEmit
	obj = Object.assign(obj, enderEmit)

	for (const prop in obj) {
		if (obj[prop] === "")
			throw { error: 10, msg: 'Dados cadastrais do emitente incompleto!' }
	}
}

export function ObjEmpty(obj) {

	delete obj.attributes

	for (const item in obj) {
		if (obj[item] !== null && typeof (obj[item]) == "object") {
			ObjEmpty(obj[item]);
		}
		else {
			if (obj[item]) {
				return false
			}
		}
	}

	return true
}

export function Unzip(obj) {
	return pako.inflate(Buffer.from(obj, 'base64').toString('binary'), {to: 'string'});
}

export function ValidateInfFiscal(infFiscal) {
	for (const prop in infFiscal) {
		if (infFiscal[prop] === "")
			throw { error: 10, msg: 'Dados cadastrais, fiscal incompleto!' }
	}
}

export function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function GetCodUF(obj) {
	const UF = obj.UF ? obj.UF : obj.Uf
	return new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/Estados.json').toString().trim()))[UF]
}

export function GetCodMun(UF, xMun) {
	return new Object(JSON.parse(fs.readFileSync(GetDir() + '/../Storage/Useful/Municipios.json').toString().trim()))[UF][xMun.toUpperCase()].Code
}

function CNFValid(cNF) {
	const restricted = [
		'00000000', '11111111', '22222222', '33333333', '44444444',
		'55555555', '66666666', '77777777', '88888888', '99999999',
		'12345678', '23456789', '34567890', '45678901', '56789012',
		'67890123', '78901234', '89012345', '90123456', '01234567'
	]
	return restricted.indexOf(cNF, restricted)
}

