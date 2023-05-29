import PDFDocument from 'pdfkit'
import getStream from 'get-stream'
import fs from 'fs'
import { BarCode, MaskNumberNFe, MaskChave, MaskDoc, MaskDateAndHour, MaskFone} from '../Common/Utils.mjs'

let height = 0

export async function Make_PDF_CCe(cce) {
    const doc = new PDFDocument({ autoFirstPage: false })
    
    make(doc, cce)
    doc.end()
    return await getStream.buffer(doc)
}

const make = function (doc, cce) {

    height = 0

    doc.addPage({ layout: "portrait", size: [595.28, 421] , margins: { top: 5, left: 5, right: 5, bottom: 5 } })
    doc.lineWidth(0.1)

    if(cce.infEvento.tpAmb == 2)
        brandHomologation(doc)

    setBox(doc, 5, setHeight(5), 240, 100)
    setTextBox(doc, `IDENTIFICAÇÃO DO EMITENTE`, 5, setHeight(0), 240, 20, 'center', 6, '#808080')

    if (fs.existsSync(cce.img)) {
        doc.image(cce.img, (245 - 70) / 2, setHeight(0) + 10, { fit: [70, 60], align: 'center', valign: 'center' })
    }

    setTextBox(doc, `${cce.emit.xNome}\n${cce.emit.enderEmit.xLgr}, ${cce.emit.enderEmit.nro}
    ${cce.emit.enderEmit.xMun}-${cce.emit.enderEmit.UF} Fone/Fax: ${cce.emit.enderEmit.fone ? MaskFone(cce.emit.enderEmit.fone) : ''}`, 5, setHeight(0) + 70, 240, 30, 'center', 7, '#808080')

    setBox(doc, 245, setHeight(0), 100, 100)
    setTextBox(doc, `CC-e`, 245, setHeight(0) + 15, 100, 20, 'center', 13)
    setTextBox(doc, `Carta de Correção Eletrônica`, 245, setHeight(0) + 30, 100, 20, 'center', 7, '#808080')
    setTextBox(doc, `Nº. ${MaskNumberNFe(cce.retEvento.infEvento.chNFe.substring(25, 34))}\nSérie ${cce.retEvento.infEvento.chNFe.substring(22, 25)}`, 245, setHeight(0) + 50, 100, 25, 'center', 10)

    setBox(doc, 345, setHeight(0), 245.28, 100)
    doc.image(BarCode(cce.retEvento.infEvento.chNFe), 353, setHeight(0) + 10, { width: 230, height: 40 })
    setInputLabel(doc, 'CHAVE DE ACESSO', MaskChave(cce.retEvento.infEvento.chNFe), 345, setHeight(60), 245.28, 'center', 20, 0)
    setTextBox(doc, 'Consulta de autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', 345, setHeight(20), 245.28, 20, 'center', 7, '#4F4F4F')

    setInputLabel(doc, 'DATA DE EMISSÃO', `${MaskDateAndHour(cce.retEvento.infEvento.dhRegEvento)}`, 5, setHeight(20), 195.093, 'center')
    setInputLabel(doc, 'PROTOCOLO DE AUTORIZAÇÃO DE USO', `${cce.retEvento.infEvento.nProt}`, 200.093, setHeight(0), 195.093, 'center')
    setInputLabel(doc, 'CNPJ / CPF', MaskDoc(cce.infEvento.CNPJ ? cce.infEvento.CNPJ : cce.infEvento.CPF), 395.186, setHeight(0), 195.093, 'center')

    setTextBox(doc, `TEXTO DE CORREÇÃO`, 2, setHeight(20), 585, 20, 'left', 6)
    setBox(doc, 5, setHeight(10), 585.28, 220)
    setTextBox(doc, cce.detEvento.xCorrecao, 5, setHeight(0), 585, 220, 'left', 9)

    setTextBox(doc, `CONDIÇÃO DE USO`, 2, setHeight(220), 200, 20, 'left', 6)
    setBox(doc, 5, setHeight(10), 585.28, 50)
    setTextBox(doc, `A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970 e pode ser utilizada para regularizacao de erro ocorrido na emissao de documento fiscal, desde que o erro nao esteja relacionado com:
    I - as variaveis que determinam o valor do imposto tais como: base de calculo, aliquota, diferenca de preco, quantidade, valor da operacao ou da prestacao;
    II - a correcao de dados cadastrais que implique mudanca do remetente ou do destinatario;
    III - a cce de emissao ou de saida.`, 5, setHeight(0), 585, 50, 'left', 8, '#4F4F4F')
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

const brandHomologation = function(doc) {
    doc.save()
    doc.fontSize(50)
        .fillColor("#FF0000", 0.2)
    doc.text('SEM VALOR FISCAL', 60, 200)
    doc.restore()
}
