import { Make_PDF_CCe } from './lib/Make/CCe_PDF.mjs'
import { Make_PDF_NFCe } from './lib/Make/NFCe_PDF.mjs'
import { Make_PDF_NFe } from './lib/Make/NFe_PDF.mjs'
import { Prettify_NFe, Prettify_CCe, XmltoObj } from './lib/Common/Utils.mjs'

export async function EV_PDF(event, xml, img) {
  let obj = Prettify_CCe(event),
    pdfBase64string, pdfBuffer

  obj.img = img

  if (obj.infEvento.tpEvento == '110110') {
    obj.emit = Prettify_NFe(XmltoObj(xml)).emit
    pdfBuffer = await Make_PDF_CCe(obj)
    pdfBase64string = pdfBuffer.toString('base64')
  } else if (obj.infEvento.tpEvento == '110111') {
    pdfBase64string = NF_PDF(XmltoObj(xml), img, true)
  }

  return pdfBase64string
}

export async function NF_PDF(note, img, status) {
  let obj = Prettify_NFe(note),
    pdfBase64string, pdfBuffer

  obj.img = img

  if (obj.ide.mod == '65') {
    pdfBuffer = await Make_PDF_NFCe(obj, status)
    pdfBase64string = pdfBuffer.toString('base64')
  } else {
    pdfBuffer = await Make_PDF_NFe(obj, status)
    pdfBase64string = pdfBuffer.toString('base64')
  }

  return pdfBase64string
}

