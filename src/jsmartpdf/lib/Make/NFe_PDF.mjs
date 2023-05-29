import PDFDocument from 'pdfkit'
import fs from 'fs'
import getStream from 'get-stream'
import { BarCode, MaskNumberNFe, MaskChave, MaskDoc, MaskDate, MaskHour, MaskDateAndHour, MaskFone, ToReais, MaskCEP } from '../Common/Utils.mjs'

let height = 0,
    totalPages = 1,
    lineBreak = 437,
    pageControlProducts = 734

export async function Make_PDF_NFe(nfe, cancel) {
    const doc = new PDFDocument({ autoFirstPage: false })

    countPage(nfe.det)
    make(doc, nfe, true, cancel)

    for (let index = 0; index < nfe.det.length; index++) {
        if (lineBreak < pageControlProducts) {
            addProduct(doc, nfe.det, index)

        } else {
            if (index != nfe.det.length) {
                lineBreak = 177
                pageControlProducts = 826
                make(doc, nfe, false, cancel)
                index--
            }
        }
    }
    doc.end()
    return await getStream.buffer(doc)
}

const make = function (doc, nfe, firstPage, cancel) {
    let hFat = 0
    height = 0

    doc.addPage({ layout: "portrait", size: "A4", margins: { top: 5, left: 5, right: 5, bottom: 5 } })
    doc.lineWidth(0.1)

    if(cancel)
        brandCancel(doc)
    else if(nfe.ide.tpAmb == 2)
        brandHomologation(doc)

    if (firstPage) {
        setBox(doc, 5, 5, 480, 30)
        setTextBox(doc, `Recebemos de ${nfe.emit.xNome} os produtos e/ou serviços constantes da Nota Fiscal Eletrônica indicada ao lado. Destinatário: ${nfe.dest.xNome}, ${nfe.emit.enderEmit.nro} - ${nfe.emit.enderEmit.xBairro} - ${nfe.emit.enderEmit.xMun} - ${nfe.emit.enderEmit.UF}. Emissão: ${MaskDateAndHour(nfe.ide.dhEmi)} Valor Total: R$ ${ToReais(nfe.total.ICMSTot.vNF)}`, 5, setHeight(5) - 1, 480, 30, 'left', 6, '#4F4F4F')

        setBox(doc, 485, setHeight(0), 105.28, 50)
        setTextBox(doc, `NF-e \n Nº. ${MaskNumberNFe(nfe.ide.nNF.padStart(9, '0'))} \n Série ${nfe.ide.serie.padStart(3, '0')}`, 485, 10, 105.28, 50, 'center', 10)

        setInputLabel(doc, 'DATA DE RECEBIMENTO', ``, 5, setHeight(30), 150, 'center')
        setInputLabel(doc, 'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR', ``, 155, setHeight(0), 330, 'left')
        setLine(doc, null, 1)
    }

    setBox(doc, 5, setHeight(5), 240, 100)
    setTextBox(doc, `IDENTIFICAÇÃO DO EMITENTE`, 5, setHeight(0), 240, 20, 'center', 6, '#808080')

    if (fs.existsSync(nfe.img)) {
        doc.image(nfe.img, (245 - 70) / 2, setHeight(0) + 10, { fit: [70, 60], align: 'center', valign: 'center' })
    }

    setTextBox(doc, `${nfe.emit.xNome}\n${nfe.emit.enderEmit.xLgr}, ${nfe.emit.enderEmit.nro}
    ${nfe.emit.enderEmit.xMun}-${nfe.emit.enderEmit.UF} Fone/Fax: ${nfe.emit.enderEmit.fone ? MaskFone(nfe.emit.enderEmit.fone) : ''}`, 5, setHeight(0) + 70, 240, 30, 'center', 7, '#808080')

    setBox(doc, 245, setHeight(0), 100, 100)
    setTextBox(doc, `DANFE`, 245, setHeight(0) + 5, 100, 20, 'center', 13)
    setTextBox(doc, `Documento Auxiliar da Nota Fiscal Eletrônica`, 245, setHeight(0) + 20, 100, 20, 'center', 7, '#808080')
    setTextBox(doc, `0 - Entrada \n1 - Saída`, 245, setHeight(0) + 40, 100, 20, 'left', 7, '#808080')
    setBox(doc, 320, setHeight(0) + 42, 15, 18)
    setTextBox(doc, nfe.ide.tpNF, 320, setHeight(0) + 43, 15, 18, 'center', 10)
    setTextBox(doc, `Nº. ${MaskNumberNFe(nfe.ide.nNF.padStart(9, '0'))} \nSérie ${nfe.ide.serie.padStart(3, '0')}`, 245, setHeight(0) + 60, 100, 25, 'center', 10)
    setTextBox(doc, `Folha ${doc.bufferedPageRange().start + 1}/${totalPages}`, 245, setHeight(0) + 85, 100, 25, 'center', 8, '#808080')

    setBox(doc, 345, setHeight(0), 245.28, 100)
    doc.image(BarCode(nfe.chave), 353, setHeight(0) + 10, { width: 230, height: 40 })
    setInputLabel(doc, 'CHAVE DE ACESSO', MaskChave(nfe.chave), 345, setHeight(60), 245.28, 'center', 20, 0)
    setTextBox(doc, 'Consulta de autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', 345, setHeight(20), 245.28, 20, 'center', 7, '#4F4F4F')

    setInputLabel(doc, 'NATUREZA DA OPERAÇÃO', nfe.ide.natOp, 5, setHeight(20), 340, 'center')
    setInputLabel(doc, 'PROTOCOLO DE AUTORIZAÇÃO DE USO', `${nfe.infProt ? nfe.infProt.nProt : 'Nota Em Contigência' } ${nfe.infProt ? MaskDateAndHour(nfe.infProt.dhRecbto) : ''}`, 345, setHeight(0), 245.28, 'center')

    setInputLabel(doc, 'INSCRIÇÃO ESTADUAL', nfe.emit.IE, 5, setHeight(20), 195.093, 'center')
    setInputLabel(doc, 'INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.', nfe.emit.IEST ? nfe.emit.IEST : '', 200.093, setHeight(0), 195.093, 'center')
    setInputLabel(doc, 'CNPJ / CPF', MaskDoc(nfe.emit.CNPJ ? nfe.emit.CNPJ : nfe.emit.CPF), 395.186, setHeight(0), 195.093, 'center')

    if (firstPage) {
        setTextBox(doc, `DESTINATÁRIO / REMETENTE`, 2, setHeight(23), 200, 20, 'left', 6)
        setInputLabel(doc, 'NOME / RAZÃO SOCIAL', nfe.dest.xNome, 5, setHeight(10), 390.186, 'center')
        setInputLabel(doc, 'CNPJ / CPF', MaskDoc(nfe.dest.CNPJ ? nfe.dest.CNPJ : nfe.dest.CPF), 395.186, setHeight(0), 97.5465, 'center')
        setInputLabel(doc, 'DATA DE EMISSÃO', MaskDate(nfe.ide.dhEmi), 492.7325, setHeight(0), 97.5465, 'center')

        setInputLabel(doc, 'ENDEREÇO', nfe.dest.enderDest.xLgr, 5, setHeight(20), 240, 'center')
        setInputLabel(doc, 'BAIRRO/DISTRITO', nfe.dest.enderDest.xBairro, 245, setHeight(0), 150.186, 'center')
        setInputLabel(doc, 'CEP', MaskCEP(nfe.dest.enderDest.CEP), 395.186, setHeight(0), 97.5465, 'center')
        setInputLabel(doc, 'DATA DE SAÍDA', nfe.ide.dhSaiEnt ? MaskDate(nfe.ide.dhSaiEnt) : '', 492.7325, setHeight(0), 97.5465, 'center')

        setInputLabel(doc, 'MUNICÍPIO', nfe.dest.enderDest.xMun, 5, setHeight(20), 240, 'center')
        setInputLabel(doc, 'UF', nfe.dest.enderDest.UF, 245, setHeight(0), 30.186, 'center')
        setInputLabel(doc, 'FONE / FAX', nfe.dest.enderDest.fone ? MaskFone(nfe.dest.enderDest.fone) : '', 275, setHeight(0), 120.186, 'center')
        setInputLabel(doc, 'INSCRIÇÃO ESTADUAL', nfe.dest.IE ? nfe.dest.IE : '', 395.186, setHeight(0), 97.5465, 'center')
        setInputLabel(doc, 'HORA DA SAÍDA', nfe.ide.dhSaiEnt ? MaskHour(nfe.ide.dhSaiEnt) : '', 492.7325, setHeight(0), 97.5465, 'center')

        if (nfe.cobr) {

            let left = 0,
                count = 0

            hFat += 33

            setTextBox(doc, `FATURA / DUPLICATA`, 2, setHeight(23), 200, 20, 'left', 6)
            setHeight(10)

            for (let index = 0; index < nfe.cobr.dup.length; index++) {

                if (count < 7) {
                    setBox(doc, left + 5, setHeight(0), 83.61, 20)
                    setTextBox(doc, `Núm.`, left + 3, setHeight(0), 25, 5, 'left', 5, '#808080')
                    setTextBox(doc, `Venc.`, left + 3, setHeight(0) + 5, 25, 5, 'left', 5, '#808080')
                    setTextBox(doc, `Valor`, left + 3, setHeight(0) + 10, 25, 5, 'left', 5, '#808080')

                    setTextBox(doc, nfe.cobr.dup[index].nDup, left + 30, setHeight(0), 60, 5, 'right', 5)
                    setTextBox(doc, MaskDate(nfe.cobr.dup[index].dVenc), left + 30, setHeight(0) + 5, 60, 5, 'right', 5)
                    setTextBox(doc, nfe.cobr.dup[index].vDup, left + 30, setHeight(0) + 10, 60, 5, 'right', 5)

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

        setTextBox(doc, `CÁLCULO DO IMPOSTO`, 2, setHeight(23), 200, 20, 'left', 6)
        setInputLabel(doc, 'BASE DE CÁLCULO DO ICMS', ToReais(nfe.total.ICMSTot.vBC), 5, setHeight(10), 83.61, 'right')
        setInputLabel(doc, 'VALOR DO ICMS', ToReais(nfe.total.ICMSTot.vICMS), 88.61, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'BASE DE CÁLC. ICMS S.T.', ToReais(nfe.total.ICMSTot.vBCST), 172.22, setHeight(0), 83, 'right')
        setInputLabel(doc, 'VALOR DO ICMS SUBST.', ToReais(nfe.total.ICMSTot.vST), 255.22, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR IMP. IMPORTAÇÃO', ToReais(nfe.total.ICMSTot.vII), 338.83, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR DO PIS', ToReais(nfe.total.ICMSTot.vPIS), 422.44, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR TOTAL DOS PRODUTOS', ToReais(nfe.total.ICMSTot.vProd), 506.05, setHeight(0), 83.61, 'right')

        setInputLabel(doc, 'VALOR DO FRETE', ToReais(nfe.total.ICMSTot.vFrete), 5, setHeight(20), 83.61, 'right')
        setInputLabel(doc, 'VALOR DO SEGURO', ToReais(nfe.total.ICMSTot.vSeg), 88.61, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'DESCONTO', ToReais(nfe.total.ICMSTot.vDesc), 172.22, setHeight(0), 83, 'right')
        setInputLabel(doc, 'OUTRAS DESPESAS', ToReais(nfe.total.ICMSTot.vOutro), 255.22, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR TOTAL DO IPI', ToReais(nfe.total.ICMSTot.vIPI), 338.83, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR DA COFINS', ToReais(nfe.total.ICMSTot.vCOFINS), 422.44, setHeight(0), 83.61, 'right')
        setInputLabel(doc, 'VALOR TOTAL DA NOTA', ToReais(nfe.total.ICMSTot.vNF), 506.05, setHeight(0), 83.61, 'right')

        setTextBox(doc, `TRANSPORTADORA / VOLUMES TRANSPORTADOS`, 2, setHeight(23), 200, 20, 'left', 6)
        setInputLabel(doc, 'NOME / RAZÃO SOCIAL', nfe.transp.transporta ? nfe.transp.transporta.xNome : '', 5, setHeight(10), 227.22, 'center')

        switch (nfe.transp.modFrete) {
            case '0':
            case '3':
                setInputLabel(doc, 'FRETE POR CONTA', `(${nfe.transp.modFrete}) Remetente`, 232.22, setHeight(0), 83, 'center')
                break;
            case '1':
            case '4':
                setInputLabel(doc, 'FRETE POR CONTA', `(${nfe.transp.modFrete}) Destinatário`, 232.22, setHeight(0), 83, 'center')
                break;
            case '2':
                setInputLabel(doc, 'FRETE POR CONTA', `(${nfe.transp.modFrete}) Terceiros`, 232.22, setHeight(0), 83, 'center')
                break;
            case '9':
                setInputLabel(doc, 'FRETE POR CONTA', `(${nfe.transp.modFrete}) Sem Frete`, 232.22, setHeight(0), 83, 'center')
                break;
        }

        setInputLabel(doc, 'CÓDIGO ANTT', nfe.transp.veicTransp ? nfe.transp.veicTransp.RNTC : '', 315.22, setHeight(0), 83.61, 'center')
        setInputLabel(doc, 'PLACA DE VEÍCULO', nfe.transp.veicTransp ? nfe.transp.veicTransp.placa : '', 398.83, setHeight(0), 83.61, 'center')
        setInputLabel(doc, 'UF', nfe.transp.veicTransp ? nfe.transp.veicTransp.UF : '', 482.44, setHeight(0), 23.61, 'center')

        if (nfe.transp.transporta)
            setInputLabel(doc, 'CNPJ / CPF', MaskDoc(nfe.transp.transporta.CNPJ ? nfe.transp.transporta.CNPJ : nfe.transp.transporta.CPF), 506.05, setHeight(0), 83.61, 'center')
        else
            setInputLabel(doc, 'CNPJ / CPF', '', 506.05, setHeight(0), 83.61, 'center')

        setInputLabel(doc, 'ENDEREÇO', nfe.transp.transporta ? nfe.transp.transporta.xEnder : '', 5, setHeight(20), 310.22, 'center')
        setInputLabel(doc, 'MUNICÍPIO', nfe.transp.transporta ? nfe.transp.transporta.xMun : '', 315.22, setHeight(0), 167.22, 'center')
        setInputLabel(doc, 'UF', nfe.transp.transporta ? nfe.transp.transporta.UF : '', 482.44, setHeight(0), 23.61, 'center')
        setInputLabel(doc, 'INSCIÇÃO ESTADUAL', nfe.transp.transporta ? nfe.transp.transporta.IE : '', 506.05, setHeight(0), 83.61, 'center')

        setInputLabel(doc, 'QUANTIDADE', nfe.transp.vol ? nfe.transp.vol.qVol : '0', 5, setHeight(20), 97.22, 'right')
        setInputLabel(doc, 'ESPÉCIE', nfe.transp.vol ? nfe.transp.vol.esp : '', 102.12, setHeight(0), 97.22, 'right')
        setInputLabel(doc, 'MARCA', nfe.transp.vol ? nfe.transp.vol.marca : '', 199.55, setHeight(0), 97.22, 'right')
        setInputLabel(doc, 'NUMERO', '', 296.56, setHeight(0), 97.22, 'right')
        setInputLabel(doc, 'PESO BRUTO', nfe.transp.vol ? nfe.transp.vol.pesoB : '', 394, setHeight(0), 97.22, 'right')
        setInputLabel(doc, 'PESO LÍQUIDO', nfe.transp.vol ? nfe.transp.vol.pesoL : '', 491, setHeight(0), 98.22, 'right')
    }

    setTextBox(doc, `DADOS DOS PRODUTOS / SERVIÇOS`, 2, setHeight(23), 200, 20, 'left', 6)

    if (firstPage)
        nfe.cobr ? tableProdServ(doc, 10, 320 - hFat, nfe) : tableProdServ(doc, 10, 320, nfe)
    else
        tableProdServ(doc, 10, 680, nfe)

    if (firstPage) {
        setTextBox(doc, `CÁLCULO DO ISSQN`, 2, setHeight(325 - hFat), 200, 20, 'left', 6)
        setInputLabel(doc, 'INSCRIÇÃO MUNICIPAL', nfe.emit.IM ? nfe.emit.IM : '', 5, setHeight(10), 146.32, 'right')
        setInputLabel(doc, 'VALOR TOTAL DOS SERVIÇOS', nfe.total.ISSQNtot ? ToReais(nfe.total.ISSQNtot.vServ) : '0,00', 151.32, setHeight(0), 146.32, 'right')
        setInputLabel(doc, 'BASE DE CÁLCULO DO ISSQN', nfe.total.ISSQNtot ? ToReais(nfe.total.ISSQNtot.vBC) : '0,00', 297.64, setHeight(0), 146.32, 'right')
        setInputLabel(doc, 'VALOR TOTAL DO ISSQN', nfe.total.ISSQNtot ? ToReais(nfe.total.ISSQNtot.vISS) : '0,00', 443.96, setHeight(0), 146.32, 'right')

        setTextBox(doc, `DADOS ADICIONAIS / INFORMAÇÕES COMPLEMENTARES`, 2, setHeight(24), 200, 20, 'left', 6)
        setTextBox(doc, `RESERVADO AO FISCO`, 402, setHeight(0), 200, 20, 'left', 6)
        setBox(doc, 5, setHeight(10), 400, 50)
        setTextBox(doc, nfe.infAdic ? nfe.infAdic.infCpl : '', 5, setHeight(0), 400, 50, 'left', 6, '#4F4F4F')

        setBox(doc, 405, setHeight(0), 185.28, 50)
        setTextBox(doc, ``, 405, setHeight(0), 185.28, 50, 'left', 6)
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

const tableProdServ = function (doc, height, sizeH, nfe) {

    setTextBox(doc, `CÓDIGO PRODUTO`, 2, setHeight(height) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `DESCRIÇÃO PRODUTO / SERVIÇO`, 35, setHeight(0) + 5, 160, 20, 'center', 4)
    setTextBox(doc, `NCM/SH`, 195, setHeight(0) + 5, 26, 20, 'center', 4)
    if (nfe.emit.CRT != 1)
        setTextBox(doc, `O/CST`, 221, setHeight(0) + 5, 25, 20, 'center', 4)
    else
        setTextBox(doc, `O/CSOSN`, 221, setHeight(0) + 2, 25, 20, 'center', 4)
    setTextBox(doc, `CFOP`, 246, setHeight(0) + 5, 25, 20, 'center', 4)
    setTextBox(doc, `UNID.`, 271, setHeight(0) + 5, 25, 20, 'center', 4)
    setTextBox(doc, `QUANTIDADE`, 296, setHeight(0) + 5, 35, 20, 'center', 4)
    setTextBox(doc, `VALOR UNITÁRIO`, 331, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `VALOR DESCONTO`, 365, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `VALOR\nTOTAL`, 400, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `BASE DE CÁLC. ICMS`, 435, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `VALOR\nICMS`, 470, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `VALOR\nIPI`, 505, setHeight(0) + 2, 35, 20, 'center', 4)
    setTextBox(doc, `ALIQUOTA %`, 540, setHeight(0), 50, 20, 'center', 4)
    setTextBox(doc, `ICMS`, 540, setHeight(0) + 10, 25, 20, 'center', 4)
    setTextBox(doc, `IPI`, 565, setHeight(0) + 10, 25, 20, 'center', 4)

    setLine(doc, 20, 2)

    setBox(doc, 5, setHeight(0), 585.28, sizeH)
    setBox(doc, 35, setHeight(0), 160, sizeH, 0)
    setBox(doc, 195, setHeight(0), 26, sizeH, 0)
    setBox(doc, 221, setHeight(0), 25, sizeH, 0)
    setBox(doc, 246, setHeight(0), 25, sizeH, 0)
    setBox(doc, 271, setHeight(0), 25, sizeH, 0)
    setBox(doc, 296, setHeight(0), 35, sizeH, 0)
    setBox(doc, 365, setHeight(0), 35, sizeH, 0)
    setBox(doc, 400, setHeight(0), 35, sizeH, 0)
    setBox(doc, 435, setHeight(0), 35, sizeH, 0)
    setBox(doc, 470, setHeight(0), 35, sizeH, 0)
    setBox(doc, 505, setHeight(0), 35, sizeH, 0)
    setBox(doc, 540, setHeight(0) + 10, 25, sizeH - 10, 0)
    setBox(doc, 565, setHeight(0) + 10, 25.28, 10, 0)
}

const addProduct = function (doc, nfe, index) {

    let sizeHLine = nfe[index].prod.xProd.length / 56

    if (sizeHLine % parseInt(sizeHLine))
        sizeHLine = parseInt(sizeHLine) + 1
    else if ((sizeHLine % parseInt(sizeHLine)) == 0)
        sizeHLine = sizeHLine
    else
        sizeHLine = 1.3

    let OCST = '00',
        vBC = '0,00',
        vICMS = '0,00',
        pICMS = '0,00'

    if (nfe[index].imposto.ICMS)
        for (let item in nfe[index].imposto.ICMS) {
            OCST = `${nfe[index].imposto.ICMS[item].orig}${nfe[index].imposto.ICMS[item].CST ? nfe[index].imposto.ICMS[item].CST : nfe[index].imposto.ICMS[item].CSOSN}`
            vBC = `${nfe[index].imposto.ICMS[item].vBC ? nfe[index].imposto.ICMS[item].vBC : '0,00'}`
            vICMS = `${nfe[index].imposto.ICMS[item].vICMS ? nfe[index].imposto.ICMS[item].vICMS : '0,00'}`
            pICMS = `${nfe[index].imposto.ICMS[item].pICMS ? nfe[index].imposto.ICMS[item].pICMS : '0,00'}`
        }

    setTextBox(doc, nfe[index].prod.cProd.padStart(9, '0'), 2, lineBreak, 35, 20, 'center', 4)
    setTextBox(doc, nfe[index].prod.xProd, 35, lineBreak, 160, 5 * sizeHLine, 'left', 4)
    setTextBox(doc, nfe[index].prod.NCM, 195, lineBreak, 26, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, OCST, 221, lineBreak, 25, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, nfe[index].prod.CFOP, 246, lineBreak, 25, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, nfe[index].prod.uCom.toUpperCase(), 271, lineBreak, 25, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, nfe[index].prod.qCom, 296, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(nfe[index].prod.vUnCom), 331, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(nfe[index].prod.vDesc ? nfe[index].prod.vDesc : '0,00'), 365, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(nfe[index].prod.vProd), 400, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(vBC), 435, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(vICMS), 470, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(nfe[index].imposto.IPI ? nfe[index].imposto.IPI.IPITrib ? nfe[index].imposto.IPI.IPITrib.vIPI : 0 : 0), 505, lineBreak, 35, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(pICMS), 540, lineBreak, 25, 5 * sizeHLine, 'center', 4)
    setTextBox(doc, ToReais(nfe[index].imposto.IPI ? nfe[index].imposto.IPI.IPITrib ? nfe[index].imposto.IPI.IPITrib.pIPI : '0,00' : '0,00'), 565, lineBreak, 25, 5 * sizeHLine, 'center', 4)

    lineBreak += ((sizeHLine * 5) + 3.8)

    if (lineBreak < pageControlProducts)
        setLine(doc, lineBreak, 3)

}

export function countPage(nfe) {

    for (let index = 0; index < nfe.length; index++) {

        if (lineBreak < pageControlProducts) {
            let sizeHLine = nfe[index].prod.xProd.length / 56

            if (sizeHLine % parseInt(sizeHLine))
                sizeHLine = parseInt(sizeHLine) + 1
            else if ((sizeHLine % parseInt(sizeHLine)) == 0)
                sizeHLine = sizeHLine
            else
                sizeHLine = 1.3

            lineBreak += ((sizeHLine * 5) + 3.8)
        } else {
            if (index != nfe.length) {
                lineBreak = 177
                pageControlProducts = 826
                index--
                totalPages++
            }
        }
    }
    lineBreak = 437,
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
