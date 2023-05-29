import PDFDocument from 'pdfkit'
import fs from 'fs'
import QRCode from 'qrcode'
import getStream from 'get-stream'
import { MaskNumberNFe, MaskChave, MaskDoc, MaskDateAndHour, MaskFone, ToReais, MaskCEP } from '../Common/Utils.mjs'

let height = 0,
    totalPages = 1,
    lineBreak = 231,
    pageControlProducts = 734

export async function Make_PDF_NFCe(nfce, cancel) {
    const doc = new PDFDocument({ autoFirstPage: false })

    nfce.qr = await QRCode.toDataURL(nfce.infNFeSupl.qrCode)

    countPage(nfce.det)
    make(doc, nfce, true, cancel)

    for (let index = 0; index < nfce.det.length; index++) {
        if (lineBreak < pageControlProducts) {
            addProduct(doc, nfce.det, index)
        } else {
            if (index != nfce.det.length) {
                lineBreak = 158
                pageControlProducts = 826
                make(doc, nfce, false, cancel)
                index--
            }
        }
    }
    doc.end()
    return await getStream.buffer(doc)
}

const make = async function (doc, nfce, firstPage, cancel) {
    let hFat = 0
    height = 0

    doc.addPage({ layout: "portrait", size: "A4", margins: { top: 5, left: 5, right: 5, bottom: 5 } })
    doc.lineWidth(0.1)

    setHeight(5)
    doc.image(nfce.qr, 240, 0, { width: 110 })

    if (fs.existsSync(nfce.img)) {
        doc.image(nfce.img, (245 - 70) / 2, setHeight(0) + 10, { fit: [70, 60], align: 'center', valign: 'center' })
    }

    if (cancel)
        brandCancel(doc)
    else if (nfce.ide.tpAmb == 2)
        brandHomologation(doc)

    setBox(doc, 5, setHeight(0), 240, 100)
    setBox(doc, 245, setHeight(0), 100, 100)
    setTextBox(doc, `IDENTIFICAÇÃO DO EMITENTE`, 5, setHeight(0), 240, 20, 'center', 6, '#808080')
    setTextBox(doc, `${nfce.emit.xNome}\n${nfce.emit.enderEmit.xLgr}, ${nfce.emit.enderEmit.nro}
    ${nfce.emit.enderEmit.xMun}-${nfce.emit.enderEmit.UF} Fone/Fax: ${nfce.emit.enderEmit.fone ? MaskFone(nfce.emit.enderEmit.fone) : ''}`, 5, setHeight(0) + 70, 240, 30, 'center', 7, '#808080')

    setBox(doc, 345, setHeight(0), 245.28, 100)
    setTextBox(doc, `DANFE NFC-e\nDocumento Auxiliar da Nota Fiscal de Consumidor Eletrônica\nNão permite aproveitamento de crédito de ICMS`, 345, setHeight(0), 245.28, 40, 'center', 8)
    setTextBox(doc, `Consulta via leitor de QrCode`, 345, setHeight(0) + 29, 245.28, 20, 'center', 7)
    setTextBox(doc, `Nº: ${MaskNumberNFe(nfce.ide.nNF.padStart(9, '0'))} Serié: ${nfce.ide.serie.padStart(3, '0')} Data de Emissão: ${MaskDateAndHour(nfce.ide.dhEmi)}`, 345, setHeight(0) + 39, 245.28, 20, 'center', 7)
    setTextBox(doc, `Folha ${doc.bufferedPageRange().start + 1}/${totalPages}`, 345, setHeight(0) + 48, 245.28, 20, 'center', 7, '#808080')

    setInputLabel(doc, 'CHAVE DE ACESSO', MaskChave(nfce.chave), 345, setHeight(60), 245.28, 'center', 20, 0)
    setTextBox(doc, `Consulte pela chave de acesso em 
    ${nfce.infNFeSupl.urlChave}`, 345, setHeight(20), 245.28, 20, 'center', 7, '#4F4F4F')

    setInputLabel(doc, 'INSCRIÇÃO ESTADUAL', nfce.emit.IE, 5, setHeight(20), 195.093, 'center')
    setInputLabel(doc, 'CNPJ / CPF', MaskDoc(nfce.emit.CNPJ ? nfce.emit.CNPJ : nfce.emit.CPF), 200.093, setHeight(0), 195.093, 'center')
    setInputLabel(doc, 'PROTOCOLO DE AUTORIZAÇÃO DE USO', `${nfce.infProt ? nfce.infProt.nProt : 'Nota em Contigência' } ${nfce.infProt ? MaskDateAndHour(nfce.infProt.dhRecbto) : ''}`, 395.2, setHeight(0), 195.093, 'center')

    if (firstPage) {
        setTextBox(doc, `CONSUMIDOR`, 2, setHeight(23), 200, 20, 'left', 6)
        setInputLabel(doc, 'NOME / RAZÃO SOCIAL', nfce.dest ? nfce.dest.xNome : 'Consumidor Não Identificado', 5, setHeight(10), 390.2, 'left')
        setInputLabel(doc, 'CNPJ / CPF', MaskDoc(nfce.dest ? nfce.dest.CNPJ ? nfce.dest.CNPJ : nfce.dest.CPF : ''), 395.2, setHeight(0), 97.55, 'center')
        setInputLabel(doc, 'INSCRIÇÃO ESTADUAL', nfce.dest ? nfce.dest.IE : '', 492.73, setHeight(0), 97.55, 'center')

        setInputLabel(doc, 'ENDEREÇO', nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.xLgr : '' : '', 5, setHeight(20), 359.8, 'left')
        setInputLabel(doc, 'UF', nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.UF : '' : '', 365, setHeight(0), 30.2, 'center')
        setInputLabel(doc, 'CEP', MaskCEP(nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.CEP : '' : ''), 395.2, setHeight(0), 97.55, 'center')

        setInputLabel(doc, 'FONE / FAX', nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.fone ? MaskFone(nfce.dest.enderDest.fone) : '' : '' : '', 492.73, setHeight(0), 97.55, 'center')

        setInputLabel(doc, 'MUNICÍPIO', nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.xMun : '' : '', 5, setHeight(20), 390.2, 'left')
        setInputLabel(doc, 'BAIRRO/DISTRITO', nfce.dest ? nfce.dest.enderDest ? nfce.dest.enderDest.xBairro : '' : '', 395.2, setHeight(0), 195, 'left')

        if (nfce.pag) {

            let left = 0,
                count = 0

            hFat += 33

            setTextBox(doc, `FORMAS DE PAGAMENTO`, 2, setHeight(23), 200, 20, 'left', 6)
            setHeight(10)

            const types = {
                '01': 'Dinheiro',
                '02': 'Cheque',
                '03': 'Cartão de Crédito',
                '04': 'Cartão de Débito',
                '05': 'Crédito Loja',
                '10': 'Vale Alimentação',
                '11': 'Vale Refeição',
                '12': 'Vale Presente',
                '13': 'Vale Combustível',
                '14': 'Duplicata Mercantil',
                '15': 'Boleto Bancário',
                '90': 'Sem Pagamento',
                '99': 'Outros'
            }

            for (let index = 0; index < nfce.pag.length; index++) {

                if (count < 7) {
                    setBox(doc, left + 5, setHeight(0), 83.61, 20)
                    setTextBox(doc, `Tipo.`, left + 3, setHeight(0), 25, 5, 'left', 6, '#808080')
                    setTextBox(doc, `Valor`, left + 3, setHeight(0) + 8, 25, 5, 'left', 6, '#808080')

                    setTextBox(doc, types[nfce.pag[index].tPag], left + 30, setHeight(0), 60, 5, 'right', 6)
                    setTextBox(doc, nfce.pag[index].vPag, left + 30, setHeight(0) + 8, 60, 5, 'right', 6)

                    left -= 5
                    left += 88.61
                    count++

                } else {
                    index--
                    count = 0
                    left = 0
                    setHeight(20)
                    hFat += 20
                }
            }

            lineBreak += hFat
        }
    }

    setTextBox(doc, `DADOS DOS PRODUTOS / SERVIÇOS`, 2, setHeight(23), 200, 20, 'left', 6)

    if (firstPage)
        nfce.pag ? tableProdServ(doc, 10, 527 - hFat, nfce) : tableProdServ(doc, 10, 527, nfce)
    else
        tableProdServ(doc, 10, 699, nfce)

    if (firstPage) {
        setTextBox(doc, `TOTAL`, 2, setHeight(531 - hFat), 200, 20, 'left', 6)
        setInputLabel(doc, 'QUANTIDADE DE PRODUTOS', nfce.det.length, 5, setHeight(10), 146.32, 'right')
        setInputLabel(doc, 'VALOR DO TROCO', nfce.vTroco ? nfce.vTroco : '0,00', 151.32, setHeight(0), 146.32, 'right')
        setInputLabel(doc, 'VALOR TOTAL', nfce.total.ICMSTot ? ToReais(nfce.total.ICMSTot.vNF) : '0,00', 443.96, setHeight(0), 146.32, 'right')

        setTextBox(doc, `ÁREA DE MENSAGEM DE INTERESSE DO CONTRIBUINTE`, 2, setHeight(24), 200, 20, 'left', 6)
        setBox(doc, 5, setHeight(10), 585.3, 50)
        setTextBox(doc, nfce.infAdic ? nfce.infAdic.infCpl : '', 5, setHeight(0), 400, 50, 'left', 6, '#4F4F4F')
    }
}

const setHeight = function (value) {
    return height += value
}

const setInputLabel = function (doc, label, value, coordX, coordY, width, align = 'center', height = 20, rounded = 3) {
    doc.roundedRect(coordX, coordY, width, height, rounded)
        .stroke('#D3D3D3')
    doc.fontSize(5)
        .fillColor("#808080")
    doc.text(label, coordX + 4, coordY + 3)
    doc.fontSize(8)
        .fillColor("#000000")
    doc.text(value, coordX + 4, coordY + 12,
        {
            width: width - 8,
            height: 8,
            align: align
        })
}

const setTextBox = function (doc, value, coordX, coordY, width, height, align = 'left', size = 8, color = '#000000') {
    doc.fontSize(size)
        .fillColor(color)
    doc.text(value, coordX + 4, coordY + 4,
        {
            width: width - 8,
            height: height,
            align: align
        })
}

const setBox = function (doc, coordX, coordY, width, height, rounded = 3) {
    doc.roundedRect(coordX, coordY, width, height, rounded)
        .stroke('#D3D3D3')
}

const setLine = function (doc, height, type) {
    switch (type) {
        case 1:
            doc.lineCap('butt')
                .moveTo(doc.page.margins.left, setHeight(25))
                .lineTo(doc.page.width - doc.page.margins.left, setHeight(0))
                .dash(1, { space: 1 })
                .stroke("#808080")
                .undash()
            break;
        case 2:
            doc.lineCap('butt')
                .moveTo(doc.page.margins.left, setHeight(0) + height)
                .lineTo(doc.page.width - doc.page.margins.left, setHeight(0) + height)
                .stroke("#D3D3D3")
            break;
        case 3:
            doc.lineCap('butt')
                .moveTo(doc.page.margins.left, height)
                .lineTo(doc.page.width - doc.page.margins.left, height)
                .stroke("#D3D3D3")
            break;
    }

}

const tableProdServ = function (doc, height, sizeH, nfce) {
    setTextBox(doc, `CÓDIGO PRODUTO`, 2, setHeight(height) + 5, 70, 20, 'center', 6)
    setTextBox(doc, `DESCRIÇÃO PRODUTO / SERVIÇO`, 70, setHeight(0) + 5, 280, 20, 'center', 6)
    setTextBox(doc, `QUANTIDADE`, 350, setHeight(0) + 5, 59, 20, 'center', 6)
    setTextBox(doc, `UNIDADE`, 409, setHeight(0) + 5, 59, 20, 'center', 6)
    setTextBox(doc, `VALOR UNITÁRIO`, 468, setHeight(0) + 5, 59, 20, 'center', 6)
    setTextBox(doc, `VALOR TOTAL`, 527, setHeight(0) + 5, 59, 20, 'center', 6)

    setLine(doc, 20, 2)

    setBox(doc, 5, setHeight(0), 585.28, sizeH)
    setBox(doc, 70, setHeight(0), 280, sizeH, 0)
    setBox(doc, 350, setHeight(0), 59, sizeH, 0)
    setBox(doc, 409, setHeight(0), 59, sizeH, 0)
    setBox(doc, 468, setHeight(0), 59, sizeH, 0)
}

const addProduct = function (doc, nfce, index) {

    let sizeHLine = nfce[index].prod.xProd.length / 66

    if (sizeHLine % parseInt(sizeHLine))
        sizeHLine = parseInt(sizeHLine) + 1
    else if ((sizeHLine % parseInt(sizeHLine)) == 0)
        sizeHLine = sizeHLine
    else
        sizeHLine = 1.3

    setTextBox(doc, nfce[index].prod.cProd.padStart(9, '0'), 2, lineBreak, 70, 20, 'center', 5)
    setTextBox(doc, nfce[index].prod.xProd, 70, lineBreak, 280, 6 * sizeHLine, 'left', 5)
    setTextBox(doc, nfce[index].prod.qCom, 350, lineBreak, 59, 6 * sizeHLine, 'center', 5)
    setTextBox(doc, nfce[index].prod.uCom.toUpperCase(), 409, lineBreak, 59, 6 * sizeHLine, 'center', 5)
    setTextBox(doc, ToReais(nfce[index].prod.vUnCom), 468, lineBreak, 59, 6 * sizeHLine, 'center', 5)
    setTextBox(doc, ToReais(nfce[index].prod.vProd), 527, lineBreak, 59, 6 * sizeHLine, 'center', 5)

    lineBreak += ((sizeHLine * 6) + 3.8)

    if (lineBreak < pageControlProducts)
        setLine(doc, lineBreak, 3)
}

export function countPage(nfce) {

    for (let index = 0; index < nfce.length; index++) {

        if (lineBreak < pageControlProducts) {
            let sizeHLine = nfce[index].prod.xProd.length / 66

            if (sizeHLine % parseInt(sizeHLine))
                sizeHLine = parseInt(sizeHLine) + 1
            else if ((sizeHLine % parseInt(sizeHLine)) == 0)
                sizeHLine = sizeHLine
            else
                sizeHLine = 1.3

            lineBreak += ((sizeHLine * 6) + 3.8)
        } else {
            if (index != nfce.length) {
                lineBreak = 158
                pageControlProducts = 826
                index--
                totalPages++
            }
        }
    }
    lineBreak = 231,
        pageControlProducts = 734
}

export function brandCancel(doc) {
    doc.save()
    doc.fontSize(100)
        .fillColor("#FF0000", 0.2)
    doc.rotate(-45)
    doc.text('CANCELADA', -400, 480)
    doc.restore()
}

export function brandHomologation(doc) {
    doc.save()
    doc.fontSize(65)
        .fillColor("#FF0000", 0.2)
    doc.rotate(-45)
    doc.text('SEM VALOR FISCAL', -400, 480)
    doc.restore()
}
