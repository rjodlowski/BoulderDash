import GlobalVars from "./GlobalVars";

export default class Player {
	_gv: GlobalVars;

	constructor(gv: GlobalVars) {
		console.log("Player created");
		this._gv = gv;
	}
}