import forge from 'node-forge';
import x509 from 'x509.js';

export function CertInfoIssuer(obj) {
	const info = x509.parseCert(GetCertKeys(obj).cert);
	console.log('INFO CERT: ', info)
	return {
		xNome: info.subject.commonName.split(':')[0],
		CNPJ: info.subject.commonName.split(':')[1],
		xMun: info.subject.localityName,
		UF: info.subject.stateOrProvinceName,
		emissao: info.notBefore,
		validade: info.notAfter
	}
}

export function KeyProvider(obj) {
	this.getKeyInfo = function () {
		return '<X509Data>' +
			'<X509Certificate>' +
			PubKeyFormat(GetCertKeys(obj).cert) +
			'</X509Certificate>' +
			'</X509Data>';
	}
}

export function GetCertKeys(obj) {
	let p12buffer = obj.base64cert.split('data:application/x-pkcs12;base64,').pop();

	const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer));
	const p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, obj.passCert);

	const keyData = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag]
		.concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
	const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];

	return {
		cert: forge.pki.certificateToPem(certBags[0].cert),
		ca: certBags.slice(1).map((a) => forge.pki.certificateToPem(a.cert)),
		key: keyData.length ? forge.pki.privateKeyToPem(keyData[0].key) : undefined,
		pfx: Buffer.from(p12buffer, 'base64')
	};
}

export function PubKeyFormat(pubKey) {

	var certKey = pubKey.toString();

	return certKey.replace('-----BEGIN CERTIFICATE-----', '')
				.replace('-----END CERTIFICATE-----', '')
				.replace(/\s/g, '')
				.replace(/(\r\n\t|\n|\r\t)/gm, '');
}

export function PriKeyFormat(priKey) {

	var certKey = priKey.toString();

	return certKey.replace('-----BEGIN RSA PRIVATE KEY-----', '')
				.replace('-----BEGIN RSA PRIVATE KEY-----', '')
				.replace(/\s/g, '')
				.replace(/(\r\n\t|\n|\r\t)/gm, '');
}

