import GlobalVars from "../GlobalVars";
import Boulder from "./Boulder";

export default class Diamond extends Boulder {
	playerPassable: boolean = true;

	color: string = "green";

	imageToDraw: HTMLImageElement;

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
			this._gv.score += this._gv.pointsPerDiamondCollected;
			this._gv.scoreDiv.innerText = `${this._gv.score}`;
			this._gv.diamondsCollected++;
			this.checkForOpenEntrance();
		}
	}

	checkForOpenEntrance() {
		if (this._gv.diamondsCollected >= this._gv.diamondsToCollectNumber) {
			this._gv.exitOpen = true;
		}
	}
}