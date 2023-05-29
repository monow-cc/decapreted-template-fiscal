import { XmlValidation, XmlSigner, AddNFeProt, AddEnvProt, AddInutProt, AddQrCode, Contingency, UnzipNFe } from './lib/Common/Tools.mjs'
import { XmltoObj } from './lib/Common/Utils.mjs'
import Sefaz from './lib/Products/Common/Sefaz'
import { Issuance, Events, Disable } from './lib/Products/Common/Envelope'
import moment from 'moment'
import forge from 'node-forge';
import x509 from 'x509.js';
import fs from 'fs'
import os from 'os';
import path from 'path';

const homeDir = os.homedir();
const appSupportDir = path.join(homeDir, 'Library', 'Application Support');

let db = JSON.parse(fs.readFileSync((process.env.APPDATA || appSupportDir) + '/sghfiscaldb.json'))

log.info('STARTING FISCAL')

export async function send(data, callback) {

  log.info('FISCAL SEND')

  try {
    validCert(data.inf)
    new Sefaz().Status(data.inf, (result) => {
      if (result != undefined && result.cStat == '107') {

        if (db.contingency.status) {
          db.contingency = {
            status: false,
            dhCont: ''
          }
          fs.writeFileSync((process.env.APPDATA || appSupportDir) + '/sghfiscaldb.json', JSON.stringify(db))
        }

        Issuance(data, (obj) => {
          XmlSigner(obj, data.inf, 'infNFe', (xml) => {
            let note = xml
            if (data.inf.mod == '65')
              note = AddQrCode(note, data.inf)
            try {
              console.log('NOTE', note)
              if (XmlValidation(note, 'enviNFe')) {
                new Sefaz().Send(note, data.inf, async (result) => {
                  if (obj.enviNFe.indSinc == 0) {
                    data.inf.nRec = result.retEnviNFe.infRec.nRec
                    consult(note, data, (msg) => {
                      callback(msg)
                    })
                  } else {
                    AddNFeProt(note, result.retEnviNFe, data.inf, async (msg) => {
                      callback(msg)
                    })
                  }
                })
              }
            } catch (error) {
              callback(error)
            }
          })
        })
      }
      else {

        if (db.contingency.status)
          data.contingency = { dhCont: db.contingency.dhCont }
        else {
          db.contingency = {
            status: true,
            dhCont: moment().format()
          }
          data.contingency = { dhCont: db.contingency.dhCont }
          fs.writeFileSync((process.env.APPDATA || appSupportDir) + '/sghfiscaldb.json', JSON.stringify(db))
        }

        Issuance(data, (obj) => {
          XmlSigner(obj, data.inf, 'infNFe', (xml) => {
            let note = xml
            if (data.inf.mod == '65')
              note = AddQrCode(note, data.inf)
            try {
              console.log('NOTE', note)
              if (XmlValidation(note, 'enviNFe')) {
                Contingency(note, data.inf, (result) => {
                  callback(result)
                })
              }
            } catch (error) {
              callback(error)
            }
          })
        })
      }
    })
  } catch (error) {
    callback(error)
  }
}

export async function contingency(data, callback) {

  log.info('FISCAL CONTINGENCY')

  try {
    validCert(data.inf)
    let note = `${data.inf.xml.split("'").join('"')}`
    let obj = XmltoObj(note)
    new Sefaz().Send(note, data.inf, async (result) => {
      if (obj.enviNFe.indSinc == 0) {
        data.inf.nRec = result.retEnviNFe.infRec.nRec
        consult(note, data, (msg) => {
          callback(msg)
        })
      } else {
        AddNFeProt(note, result.retEnviNFe, data.inf, async (msg) => {
          callback(msg)
        })
      }
    })
  } catch (error) {
    callback(error)
  }
}

export async function event(data, callback) {

  log.info('FISCAL EVENT')

  try {
    validCert(data.inf)
    Events(data, (obj) => {
      XmlSigner(obj, data.inf, 'infEvento', (xml) => {
        let event = xml
        try {
          new Sefaz().Event(event, data, (result) => {
            AddEnvProt(event, result.retEnvEvento, data.inf, async (msg) => {
              callback(msg)
            })
          })
        } catch (error) {
          callback(error)
        }
      })
    })
  } catch (error) {
    callback(error)
  }
}

export async function disable(data, callback) {

  log.info('FISCAL DISABLE')

  try {
    validCert(data.inf)
    Disable(data, (obj) => {
      XmlSigner(obj, data.inf, 'infInut', (xml) => {
        let inut = xml
        try {
          new Sefaz().Disable(inut, data.inf, (result) => {
            AddInutProt(inut, result, (msg) => {
              callback(msg)
            })
          })
        } catch (error) {
          callback(error)
        }
      })
    })
  } catch (error) {
    callback(error)
  }
}

export async function download(data, callback) {

  log.info('FISCAL DOWNLOAD')

  try {
    validCert(data.inf)
    new Sefaz().Download(data, (result) => {
      UnzipNFe(result, [], data, (msg) => {
        callback(msg)
      })
    })
  } catch (error) {
    callback(error)
  }
}

export async function search(data, callback) {

  log.info('FISCAL SEARCH')

  try {
    validCert(data.inf)
    new Sefaz().Receipt(data.inf, (receipt) => {
      if (true){
        callback({
          error: receipt.retConsReciNFe.cStat,
          data: data.inf.xml,
          msg: receipt.retConsReciNFe.xMotivo,
          nRec: data.inf.nRec
        })
      }
      AddNFeProt(data.inf.xml, receipt.retConsReciNFe, data.inf, async (msg) => {
        callback(msg)
      })
    })
  } catch (error) {
    callback(error)
  }
}

const consult = async function (note, data, callback) {
  new Sefaz().Receipt(data.inf, (receipt) => {
    if (receipt.retConsReciNFe.cStat == '105'){
      callback({
        error: receipt.retConsReciNFe.cStat,
        data: `${note.split('"').join("'")}`,
        msg: receipt.retConsReciNFe.xMotivo,
        nRec: data.inf.nRec
      })
    }
    AddNFeProt(note, receipt.retConsReciNFe, data.inf, async (msg) => {
      callback(msg)
    })
  })
}

const validCert = function (obj) {

  try {
    let p12buffer = obj.base64cert.split('data:application/x-pkcs12;base64,').pop();

    const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer));
    const p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, obj.passCert);

    const keyData = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag]
      .concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];

    const cert = forge.pki.certificateToPem(certBags[0].cert),
      info = x509.parseCert(cert),
      nowDate = moment().format("YYYY-MM-DD"),
      certDate = new Date(info.notAfter);

    let dateFormat = JSON.stringify(certDate),
      dueDate = dateFormat.slice(1, 11)

    if (moment(nowDate).isAfter(dueDate)) {
      throw {
        error: 1000,
        data: null,
        msg: "Certificado vencido!"
      }
    }

  } catch {
    throw {
      error: 1001,
      data: null,
      msg: "Certificado vencido ou senha inválida!"
    }
  }
}