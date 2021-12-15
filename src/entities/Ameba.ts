import GlobalVars from "../GlobalVars";
import Boulder from "./Boulder";
import Diamond from "./Diamond";
import SmolAmeba from "./SmolAmeba";

export default class Ameba {
	_gv: GlobalVars;

	// Origin positions
	// Relative position
	relX: number // [px]
	relY: number // [px]

	// Absolute position
	absX: number // level coord
	absY: number // level coord

	expandInterval: NodeJS.Timer;
	expandedDuringIteration: number = 1;
	// smolCount: number = 1;

	constructor(gv: GlobalVars, x: number, y: number) {
		console.log("Ameba created");

		this._gv = gv;

		this.absX = x;
		this.absY = y;
		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		// Initial smol ameba
		this._gv.allAI.push(
			new SmolAmeba(this._gv, this.absX, this.absY)
		)
		this._gv.smolAmebaCount++;
		this.expand();

		// Player interaction with small ameba (blocks the wae) -> done
		// Boulder interaction with small ameba (crushing) - done
		// Boulder interaction -> swapping dirt under boulder -> no crush - done
		// Ameba stops growing if no space (detection) - done
		// Ameba changes into Diamonds or Boulders depending on size - done
	}

	/**
	 * Main grow function
	 */
	expand() {
		this.expandInterval = setInterval(() => {
			if (this.expandedDuringIteration != 0) {
				console.log("expansion iteration");
				this.contaminate()
			} else {
				clearInterval(this.expandInterval);
				console.log("Stopped growing");
				this.finishExisting();
			}
		}, this._gv.gravityIntervalTime * 5)
	}

	/**
	 * A single iteration of ameba's expansion
	 */
	contaminate() {
		this.expandedDuringIteration = 0;
		let amebasOnStart = this._gv.allAI.map((el) => { return el });

		for (let ameba of amebasOnStart) {
			if (ameba instanceof SmolAmeba && ameba.canExpand) {
				let canExpandInto: string[] = ameba.canExpandInto();

				for (let direction of canExpandInto) {
					switch (direction) {
						case "top":
							if (this._gv.currLevel[ameba.absY - 1][ameba.absX] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX && el.absY == ameba.absY - 1
								}).length == 0) {
									this.addNewAmeba(ameba.absX, ameba.absY - 1);
								}
							}
							break;
						case "bottom":
							if (this._gv.currLevel[ameba.absY + 1][ameba.absX] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX && el.absY == ameba.absY + 1
								}).length == 0) {
									this.addNewAmeba(ameba.absX, ameba.absY + 1);
								}
							}
							break;
						case "left":
							if (this._gv.currLevel[ameba.absY][ameba.absX - 1] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX - 1 && el.absY == ameba.absY
								}).length == 0) {
									this.addNewAmeba(ameba.absX - 1, ameba.absY);
								}
							}
							break;
						case "right":
							if (this._gv.currLevel[ameba.absY][ameba.absX + 1] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX + 1 && el.absY == ameba.absY
								}).length == 0) {
									this.addNewAmeba(ameba.absX + 1, ameba.absY);
								}
							}
							break;
					}
				}
			}
		}
	}

	/**
	 * Creates new small Ameba tile
	 * @param x absX of the new SmolAmeba
	 * @param y absY of the new SmolAmeba
	 */
	addNewAmeba(x: number, y: number) {
		this._gv.allAI.push(
			new SmolAmeba(this._gv, x, y)
		)
		this._gv.currLevel[y][x] = 8;
		this.expandedDuringIteration++;
		this._gv.smolAmebaCount++;
	}

	/**
	 * Turn into Boulders or Diamonds if cannot expand anymore
	 */
	finishExisting() {
		let smols = this._gv.allAI.filter((el) => { return el.constructor.name == "SmolAmeba" })

		if (this._gv.smolAmebaCount < this._gv.amebaLimit) {
			// console.log("Turnin into Diamonds");
			for (let smol of smols) {
				let diamond = new Diamond(this._gv, smol.absX, smol.absY);

				let index = this._gv.allAI.indexOf(smol);
				this._gv.allAI.splice(index, 1);

				this._gv.allDynamic.push(diamond);
			}
		} else {
			// console.log("Turnin into Boulders");
			for (let smol of smols) {
				let diamond = new Boulder(this._gv, smol.absX, smol.absY);

				let index = this._gv.allAI.indexOf(smol);
				this._gv.allAI.splice(index, 1);

				this._gv.allDynamic.push(diamond);
			}
		}
	}
}