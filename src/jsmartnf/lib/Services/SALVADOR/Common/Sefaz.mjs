import soap from 'soap'
import { GetCertKeys, CertInfoIssuer } from "../../../Common/Certificate.mjs"
import { Issuance } from "./Envelope.mjs"

class Sefaz {
    constructor() {
    }

    Send(objXml, info, metod, callback) {

        const cert = GetCertKeys(info).pfx
        let url = `https://notahml.salvador.ba.gov.br/rps/ENVIOLOTERPS/EnvioLoteRPS.svc`

        if (info.tAmb == 1)
            url = `https://nfse.salvador.ba.gov.br/rps/ENVIOLOTERPS/EnvioLoteRPS.svc`

        let xml = Issuance(objXml)
        console.log(xml)
        soap.createClient(url + '?WSDL', {
            wsdl_options: {
				pfx: cert,
				passphrase: info.passCert,
				secureProtocol: 'TLSv1_2_method',
				rejectUnauthorized: false,
				requestCert: false,
				agent: false
			},
		}, (error, client) => {
			if (error !== null) {
				callback(error)
			}
			try {
				client.setSecurity(new soap.ClientSSLSecurityPFX(
					cert,
					info.passCert,
					{
						secureProtocol: 'TLSv1_2_method',
						rejectUnauthorized: false,
						requestCert: false,
						agent: false
					},
				))
			} catch {
				return
            }
            console.log(client)
            client.EnvioLoteRPS.EnvioLoteRPSBinding[metod](
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
                    callback({
                        data: result[`${metod}Result`],
                        msg: 'Enviada com sucesso!'
                    })
                    return
                })
        })
    }

}

export default Sefaz