import { GetWService, GetCodUF, Sleep } from "../../Common/Utils.mjs";
import { GetCertKeys } from "../../Common/Certificate.mjs";
import soap from "soap";

class Sefaz {
  constructor() {}

  Send(xml, obj, callback) {
    const cert = GetCertKeys(obj).pfx;

    soap.createClient(
      GetWService(obj).NfeAutorizacao.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ SEND`);
          console.log(error);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        client.NFeAutorizacao4.NFeAutorizacao4Soap12.nfeAutorizacaoLote(
          {
            $xml: xml,
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ SEND`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ SEND RESULT`);
              callback(result);
            }
          }
        );
      }
    );
  }

  Event(xml, obj, callback) {
    const cert = GetCertKeys(obj.inf).pfx,
      webservice = GetWService(obj.inf);

    soap.createClient(
      webservice.RecepcaoEvento.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.inf.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ EVENT`);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.inf.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        console.log(xml);
        client.NFeRecepcaoEvento4.NFeRecepcaoEvento4Soap12[
          webservice.RecepcaoEvento.Method
        ](
          {
            $xml: xml,
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ EVENT`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ EVENT RESULT`);
              console.log(result);
              callback(result);
            }
          }
        );
      }
    );
  }

  Disable(xml, obj, callback) {
    const cert = GetCertKeys(obj).pfx;

    soap.createClient(
      GetWService(obj).NfeInutilizacao.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ INUTILIZACAO`);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        client.NFeInutilizacao4.NFeInutilizacao4Soap12.nfeInutilizacaoNF(
          {
            $xml: xml,
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ INUTILIZACAO`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ INUTILIZACAO RESULT`);
              callback(result);
            }
          }
        );
      }
    );
  }

  async Receipt(obj, callback) {
    await Sleep(3000);

    const cert = GetCertKeys(obj).pfx;

    soap.createClient(
      GetWService(obj).NfeRetAutorizacao.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ SEND`);
          console.log(error);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        client.NFeRetAutorizacao4.NFeRetAutorizacao4Soap12.nfeRetAutorizacaoLote(
          {
            consReciNFe: {
              attributes: {
                xmlns: "http://www.portalfiscal.inf.br/nfe",
                versao: "4.00",
              },
              tpAmb: obj.tpAmb,
              nRec: obj.nRec,
            },
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ SEND`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ SEND RESULT`);
              callback(result);
            }
          }
        );
      }
    );
  }

  Situation(obj, callback) {
    const cert = GetCertKeys(obj).pfx;

    soap.createClient(
      GetWService(obj).NfeConsultaCadastro.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ CONSULTA`);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        client.NFeConsultaProtocolo4.NFeConsultaProtocolo4Soap12.nfeConsultaNF(
          {
            consSitNFe: {
              attributes: {
                xmlns: "http://www.portalfiscal.inf.br/nfe",
                versao: "4.00",
              },
              tpAmb: obj.tpAmb,
              xServ: "CONSULTAR",
              tpEmis: obj.tpEmis ? obj.tpEmis : 1,
              chNFe: obj.chave,
            },
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ CONSULTA`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ CONSULTA RESULT`);
              callback({
                cStat: result.retConsStatServ.cStat,
                xMotivo: result.retConsStatServ.xMotivo,
              });
            }
          }
        );
      }
    );
  }

  Status(obj, callback) {
    const cert = GetCertKeys(obj).pfx;

    soap.createClient(
      GetWService(obj).NfeStatusServico.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ STATUS`);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        client.NFeStatusServico4.NFeStatusServico4Soap12.nfeStatusServicoNF(
          {
            consStatServ: {
              attributes: {
                xmlns: "http://www.portalfiscal.inf.br/nfe",
                versao: GetWService(obj).NfeStatusServico.Version,
              },
              tpAmb: obj.tpAmb,
              cUF: GetCodUF(obj),
              xServ: "STATUS",
            },
          },
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ STATUS`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ STATUS RESULT`);
              callback({
                cStat: result.retConsStatServ.cStat,
                xMotivo: result.retConsStatServ.xMotivo,
              });
            }
          }
        );
      }
    );
  }

  async Download(obj, callback) {
    await Sleep(2000);
    obj.inf.AN = true;
    const cert = GetCertKeys(obj.inf).pfx;

    let xml = {
      nfeDadosMsg: {
        attributes: {
          xmlns: "http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe",
        },
        distDFeInt: {
          attributes: {
            xmlns: "http://www.portalfiscal.inf.br/nfe",
            versao: GetWService(obj.inf).NfeDistribuicaoDFe.Version,
          },
          tpAmb: obj.inf.tpAmb,
          cUFAutor: GetCodUF(obj.inf),
          CNPJ: obj.infEvento.CNPJ,
        },
      },
    };

    if (obj.infEvento.chNFe) {
      xml.nfeDadosMsg.distDFeInt.consChNFe = {
        chNFe: obj.infEvento.chNFe,
      };
    } else {
      xml.nfeDadosMsg.distDFeInt.distNSU = {
        ultNSU: obj.infEvento.ultNSU.toString().padStart(15, "0"),
      };
    }

    soap.createClient(
      GetWService(obj.inf).NfeDistribuicaoDFe.Url + "?wsdl",
      {
        wsdl_options: {
          pfx: cert,
          passphrase: obj.inf.passCert,
          secureProtocol: "TLSv1_2_method",
          rejectUnauthorized: false,
          requestCert: false,
          agent: false,
        },
      },
      async (error, client) => {
        if (error !== null) {
          log.error(`FISCAL SEFAZ DOWNLOAD`);
          callback(error);
        }
        try {
          client.setSecurity(
            new soap.ClientSSLSecurityPFX(cert, obj.inf.passCert, {
              secureProtocol: "TLSv1_2_method",
              rejectUnauthorized: false,
              requestCert: false,
              agent: false,
            })
          );
        } catch {
          return;
        }
        await client.NFeDistribuicaoDFe.NFeDistribuicaoDFeSoap12.nfeDistDFeInteresse(
          xml,
          (error, result) => {
            if (error !== null) {
              log.error(`FISCAL SEFAZ DOWNLOAD`);
              callback(error);
            } else {
              log.info(`FISCAL SEFAZ DOWNLOAD RESULT`);
              callback(result);
            }
          }
        );
      }
    );
  }
}

export default Sefaz;
