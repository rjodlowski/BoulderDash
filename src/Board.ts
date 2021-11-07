import GlobalVars from "./GlobalVars";

export default class Board {
	_gv: GlobalVars;

	constructor(gv: GlobalVars) {
		console.log("Board created");
		this._gv = gv;
	}
}