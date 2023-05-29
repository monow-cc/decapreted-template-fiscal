import moment from "moment";
import Event from "../Events/Event.mjs";
import Inut from "../InutNFe/Inut.mjs";
import Note from "../Note.mjs";
import {
    GetkeyData,
    GetWService,
    OnlyNumbers,
    RemoveAccents,
    GetCodUF,
} from "../../Common/Utils.mjs";
import { CertInfoIssuer } from "../../Common/Certificate.mjs";

export async function Events(data, callback) {
    log.info(`FISCAL EVENT`);

    let envEvento = {
        idLote: moment().format("DDMMYYYY"),
        evento: {
            infEvento: {
                tpAmb: data.inf.tpAmb,
                chNFe: data.infEvento.chNFe,
                tpEvento: data.infEvento.tpEvento,
                nSeqEvento:
                    data.infEvento.nSeqEvento == null ? "1" : data.infEvento.nSeqEvento,
                detEvento: {
                    nProt: data.detEvento.nProt,
                    xJust: data.detEvento.xJust,
                    xCorrecao: data.detEvento.xCorrecao,
                    chNFeRef: data.detEvento.chNFeRef,
                },
            },
        },
    };

    envEvento.evento.infEvento.CNPJ = GetkeyData(data.infEvento.chNFe).CNPJ;
    envEvento.evento.infEvento.cOrgao = GetCodUF(data.inf);

    if (
        ["210200", "210210", "210220", "210240"].includes(data.infEvento.tpEvento)
    ) {
        envEvento.evento.infEvento.CNPJ = CertInfoIssuer(data.inf).CNPJ;
        envEvento.evento.infEvento.cOrgao = "91";
        data.inf.AN = true;
    }

    envEvento.evento.infEvento.verEvento = GetWService(
        data.inf
    ).RecepcaoEvento.Version;

    envEvento.evento.infEvento.attributes = {
        Id:
            "ID" +
            envEvento.evento.infEvento.tpEvento.padStart(6, "0") +
            envEvento.evento.infEvento.chNFe +
            envEvento.evento.infEvento.nSeqEvento.padStart(2, "0"),
    };

    const event = new Event(envEvento);
    callback(event);
}

export async function Disable(data, callback) {
    log.info(`FISCAL INUTILIZACAO`);

    let inutNFe = {
        infInut: {
            tpAmb: data.inf.tpAmb,
            cUF: GetCodUF(data.inf),
            ano: moment().format("YY"),
            CNPJ: CertInfoIssuer(data.inf).CNPJ,
            mod: data.inf.mod,
            serie: data.inf.serie,
            nNFIni: data.infInut.nNFIni,
            nNFFin: data.infInut.nNFFin,
            xJust: data.infInut.xJust,
        },
    };

    inutNFe.infInut.attributes = {
        Id:
            "ID" +
            inutNFe.infInut.cUF +
            inutNFe.infInut.ano +
            inutNFe.infInut.CNPJ +
            inutNFe.infInut.mod +
            inutNFe.infInut.serie.padStart(3, "0") +
            inutNFe.infInut.nNFIni.padStart(9, "0") +
            inutNFe.infInut.nNFFin.padStart(9, "0"),
    };

    const inut = new Inut(inutNFe);
    callback(inut);
}

export async function Issuance(data, callback) {
    log.info(`CERTIFICADO INFO`, CertInfoIssuer(data.inf));
    log.info(`FISCAL ISSUANCE`);

    let obj = new Object();
    obj.det = [];
    obj.pag = [];

    //TAG IDE
    obj.ide = {
        cUF: GetCodUF(data.inf),
        mod: data.inf.mod,
        serie: data.inf.serie,
        nNF: data.inf.nNF,
        tpEmis: "1",
        tpNF: data.inf.tpNF,
        tpAmb: data.inf.tpAmb,
        natOp: data.inf.natOp,
        finNFe: data.inf.finNFe,
        refNFe: data.inf.finNFe > 1 ? data.inf.refNFe : undefined,
    };

    obj.indSinc =
        [29, 52, 35].includes(obj.ide.cUF) && obj.ide.mod == "55" ? "0" : "1";

    if (data.contingency) {
        obj.ide.tpEmis = "9";
        obj.ide.dhCont = data.contingency.dhCont;
        obj.ide.xJust = "Problemas com provedor de internet!";
    }

    //TAG EMIT
    obj.emit = data.emit;

    //TAG DEST
    obj.dest = data.dest;

    //TAG TRANSP
    obj.modFrete = "9";

    //INF ISSQN
    obj.ISSQN = {
        dCompet: data.inf.dCompet
            ? data.inf.dCompet
            : moment().format("YYYY-MM-DD"),
        cRegTrib: data.inf.cRegTrib,
        vAliq: data.inf.vAliq,
    };

    //TAG AUTXML
    if (data.inf.autxml) {
        obj.autXML = {
            CPF: data.inf.autxml.length == 11 ? data.inf.autxml : undefined,
            CNPJ: data.inf.autxml.length == 14 ? data.inf.autxml : undefined,
        };
    }

    //TAG PROD
    data.det.map((item, index) => {
        let prod = new Object();

        prod.nItem = index + 1;
        prod.cProd = item.prod.cProd;
        prod.cEAN = undefined;
        prod.xProd = RemoveAccents(item.prod.xProd);
        prod.NCM = OnlyNumbers(item.prod.NCM);
        prod.CEST = OnlyNumbers(item.prod.CEST);
        prod.CFOP = OnlyNumbers(item.prod.CFOP);
        prod.uCom = item.prod.uCom;
        prod.qCom = parseFloat(item.prod.qCom).toFixed(4);
        prod.vUnCom = parseFloat(item.prod.vUnCom).toFixed(2);
        prod.vProd = parseFloat(item.prod.vProd).toFixed(2);
        prod.vFrete = item.prod.vFrete ? parseFloat(item.prod.vFrete).toFixed(2) : undefined;
        prod.vSeg = item.prod.vSeg ? parseFloat(item.prod.vSeg).toFixed(2) : undefined;
        prod.vOutro = item.prod.vOutro ? parseFloat(item.prod.vOutro).toFixed(2) : undefined;
        prod.vDesc = item.prod.vDesc
            ? parseFloat(item.prod.vDesc).toFixed(2)
            : undefined;
        prod.cEANTrib = undefined;
        prod.uTrib = item.prod.uTrib;
        prod.qTrib = parseFloat(item.prod.qTrib).toFixed(4);
        prod.vUnTrib = parseFloat(item.prod.vUnTrib).toFixed(2);
        prod.indTot = item.prod.indTot == "0" ? "0" : "1";

        prod.imposto = {
            ICMS: {
                orig: item.ICMS.orig,
                CSOSN: item.ICMS.CSOSN,
                CST: item.ICMS.CST,
                pCredSN: item.ICMS.pCredSN,
                modBCST: item.ICMS.modBCST,
                pMVAST: item.ICMS.pMVAST,
                pRedBCST: item.ICMS.pRedBCST,
                vBCST: item.ICMS.vBCST,
                pICMSST: item.ICMS.pICMSST,
                vICMSST: item.ICMS.vICMSST,
                UFST: item.ICMS.vICMSST,
                vBCFCPST: item.ICMS.vBCFCPST,
                pFCPST: item.ICMS.pFCPST,
                vFCPST: item.ICMS.vFCPST,
                vBCSTRet: item.ICMS.vBCSTRet,
                pST: item.ICMS.pST,
                vICMSSTRet: item.ICMS.vICMSSTRet,
                vBCFCPSTRet: item.ICMS.vBCFCPSTRet,
                pFCPSTRet: item.ICMS.pFCPSTRet,
                vFCPSTRet: item.ICMS.vFCPSTRet,
                modBC: item.ICMS.modBC ? item.ICMS.modBC : 0,
                pRedBC: item.ICMS.pRedBC,
                pICMS: item.ICMS.pICMS ? item.ICMS.pICMS : 0,
                pRedBCEfet: item.ICMS.pRedBCEfet,
                vBCEfet: item.ICMS.vBCEfet,
                pICMSEfet: item.ICMS.pICMSEfet,
                vICMSEfet: item.ICMS.vICMSEfet,
                vICMSSubstituto: item.ICMS.vICMSSubstituto,
            },
            ISSQN: {
                vAliq: obj.ISSQN.vAliq,
                vISSQN: item.ISSQN ? item.ISSQN.vISSQN : undefined,
                cMunFG: obj.emit.enderEmit.cMun,
                cListServ: item.ISSQN ? item.ISSQN.cListServ : undefined,
                vDeduccao: item.ISSQN ? item.ISSQN.vDeduccao : undefined,
                vOutro: item.ISSQN ? item.ISSQN.vOutro : undefined,
                vDescIncond: item.ISSQN ? item.ISSQN.vDescIncond : undefined,
                vDescCond: item.ISSQN ? item.ISSQN.vDescCond : undefined,
                vISSRet: item.ISSQN ? item.ISSQN.vISSRet : undefined,
                indISS: item.ISSQN ? item.ISSQN.indISS : undefined,
                cServico: item.ISSQN ? item.ISSQN.cServico : undefined,
                cMun: item.ISSQN ? item.ISSQN.cMun : undefined,
                cPais: item.ISSQN ? item.ISSQN.cPais : undefined,
                nProcesso: item.ISSQN ? item.ISSQN.nProcesso : undefined,
                indIncentivo: item.ISSQN ? item.ISSQN.indIncentivo : undefined,
            },
            IPI: {
                CST: item.IPI.CST,
                pIPI: item.IPI.pIPI ? item.IPI.pIPI : 0,
                clEnq: item.IPI.clEnq,
                CNPJProd: item.IPI.CNPJProd,
                cSelo: item.IPI.cSelo,
                qSelo: item.IPI.qSelo,
                cEnq: item.IPI.cEnq,
                qUnid: item.IPI.qUnid,
                vUnid: item.IPI.vUnid,
            },
            PIS: {
                CST: item.PIS.CST,
                pPIS: item.PIS.pPIS ? item.PIS.pPIS : 0,
                vAliqProd: item.PIS.pPIS ? item.PIS.pPIS : 0,
            },
            COFINS: {
                CST: item.COFINS.CST,
                pCOFINS: item.COFINS.pCOFINS ? item.COFINS.pCOFINS : 0,
                vAliqProd: item.COFINS.pCOFINS ? item.COFINS.pCOFINS : 0,
            },
        };

        obj.det.push(prod);
    });

    //TAG PAG
    data.pag.detPag.map((item) => {
        let pag = new Object();

        pag.tPag = item.tPag;
        pag.vPag = parseFloat(item.vPag).toFixed(2);

        pag.tpIntegra = item.tpIntegra ? item.tpIntegra : "2";
        pag.CNPJ = item.CNPJ;
        pag.tBand = item.tBand;
        pag.cAut = item.cAut;

        obj.pag.push(pag);
    });

    obj.pag.vTroco = data.pag.vTroco
        ? parseFloat(data.pag.vTroco).toFixed(2)
        : "0.00";

    //TAG INFORMAÇÕES ADICIONAIS
    obj.infAdic = {
        infCpl: data.infCpl.replace(/\n|\r/g, "").trim(),
    };

    //MAKE JSON NOTA
    let nota = new Note(obj);

    callback(nota);
}
