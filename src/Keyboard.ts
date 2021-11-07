import GlobalVars from "./GlobalVars";

export default class Keyboard {
	_gv: GlobalVars

	constructor(gv: GlobalVars) {
		console.log("keyboard created");
		this._gv = gv;
	}
}