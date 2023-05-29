import EnvEvento from "./EnvEvento.mjs";

class Event {
	constructor(obj) {
		this.envEvento = new EnvEvento(obj);
	}
}

export default Event;