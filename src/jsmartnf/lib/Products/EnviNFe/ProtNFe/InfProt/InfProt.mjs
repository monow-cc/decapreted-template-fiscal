
class InfProt {
	constructor(obj) {
		this.attributes = { versao: '4.00' };
		this.tpAmb = obj.tpAmb;
		this.verAplic = obj.verAplic;
		this.chNFe = obj.chNFe;
		this.dhRecbto = obj.dhRecbto;
		this.nProt = obj.nProt;
		this.digVal = obj.digVal;
		this.cStat = obj.cStat;
		this.xMotivo = obj.xMotivo;
	}
}

export default InfProt;