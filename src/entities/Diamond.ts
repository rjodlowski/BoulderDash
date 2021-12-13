import GlobalVars from "../GlobalVars";
import Boulder from "./Boulder";

export default class Diamond extends Boulder {
	playerPassable: boolean = true;

	color: string = "green";

	constructor(gv: GlobalVars, x: number, y: number) {
		super(gv, x, y);
	}

	/**
	 * Collects this diamond
	 */
	collect() {
		// console.log("I am being collected");
		let index = this._gv.allDynamic.indexOf(this);
		this._gv.allDynamic.splice(index, 1);

		if (index != -1) {
			this._gv.currentScore += this._gv.pointsPerDiamondCollected;
		}
	}
}