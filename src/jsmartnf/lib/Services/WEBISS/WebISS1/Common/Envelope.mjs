import { ObjtoXml } from "../../../../Common/Utils.mjs";

export function Issuance(xml) {
    const objXml = Object(
        {
            cabec: {
            },
            msg: {
                __cdata: xml
            }

        });
    return ObjtoXml(objXml);
}