import soap from 'soap'
import { GetCertKeys } from "../../../../Common/Certificate.mjs"
import { Issuance } from "./Envelope.mjs"

class Sefaz {
    constructor() {
    }

    Send(objXml, info, metodo, callback) {

        const cert = GetCertKeys(info).pfx
        let url = 'https://homologacao.webiss.com.br/ws/nfse.asmx'
        info.url = 'https://homologacao.webiss.com.br'

        if (info.tAmb == 1){
            url = `https://${info.xMun.split(' ').join('')}${info.UF}.webiss.com.br/ws/nfse.asmx`
            info.url = `https://${info.xMun.split(' ').join('')}${info.UF}.webiss.com.br`
        }

        let xml = Issuance(objXml)
        soap.createClient(url + '?WSDL', {
            overrideRootElement: {
                namespace: 'nfse',
                xmlnsAttributes: [{
                    name: 'xmlns:nfse',
                    value: "http://nfse.abrasf.org.br"
                }]
            },
            wsdl_options: {
                rejectUnauthorized: false,
                pfx: cert,
                passphrase: info.passCert,
                strictSSL: false
            },
            envelopeKey: "soapenv"
        }, (error, client) => {
            if (error !== null) {
                callback({
                    error: 1,
                    data: error,
                    msg: 'Erro na conexão com servidor!'
                })
                return
            }
            client.NfseWSService.NfseWSServiceSoap12[metodo](
                {
                    $xml: xml
                },
                (error, result) => {
                    if (error !== null) {
                        callback({
                            error: 1,
                            data: error,
                            msg: 'Erro na resposta do servidor!'
                        })
                        return
                    }
                    console.log(result)
                    callback({
                        data: result.outputXML,
                        msg: 'Enviada com sucesso!'
                    })
                    return
                })
        })
    }

}

export default Sefaz