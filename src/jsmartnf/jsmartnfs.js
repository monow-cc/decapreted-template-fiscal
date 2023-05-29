import { GetWService } from './lib/Common/Utils.mjs'
import WebISS1 from './lib/Services/WEBISS/WebISS1/WebISS1.mjs'
import WebISS2 from './lib/Services/WEBISS/WebISS2/WebISS2.mjs'

export async function request(obj, callback) {

    const service = GetWService(obj.inf, true)

    obj.inf.issuer = service.ISSUER
    obj.inf.url = service.URL
    
    switch (obj.inf.issuer) {
        case 'WEBISS1':
            new WebISS1().Method(obj, result => {
                callback(result)
            })
            break;
        case 'WEBISS2':
            new WebISS2().Method(obj, result => {
                callback(result)
            })
            break;
    }

}