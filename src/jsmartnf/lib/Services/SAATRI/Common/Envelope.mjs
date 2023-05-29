import { ObjtoXml } from "../../../../Common/Utils.mjs";

export function Issuance(xml) {
    const objXml = Object(
        {
            nfseCabecMsg: {
                __cdata: BuildHeader()
            },
            nfseDadosMsg: {
                __cdata: xml
            }

        });
    return ObjtoXml(objXml);
}

const BuildHeader = function () {
    const objXml = new Object({
        cabecalho: {
            attributes: {
                versao: 2.02,
                'xmlns': 'http://www.abrasf.org.br/nfse.xsd',
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
            },
            versaoDados: 2.02
        }
    });

    return ObjtoXml(objXml);
}

// BuildBody() {
//     const objXml = new Object({
//         ConsultarLoteRpsEnvio: {
//             attributes: {
//                 'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
//                 'xmlns:xsd': "http://www.w3.org/2001/XMLSchema",
//                 'xmlns': "http://www.abrasf.org.br/nfse.xsd"
//             },
//             Prestador: {
//                 CpfCnpj: {
//                     Cnpj: '01406403000106'
//                 },
//                 InscricaoMunicipal: '562410'
//             },
//             Protocolo: '1523574555956'
//         }
//     });

//     return ObjtoXml(objXml);
// }