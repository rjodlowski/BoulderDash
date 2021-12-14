import GlobalVars from "../GlobalVars";
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

	smolAmebas: SmolAmeba[] = [];

	expandInterval: NodeJS.Timer;
	expandedDuringIteration: number = 0;

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
		this.expand();

		// TODO Player interaction with small ameba (?)
		// TODO Boulder interaction with small ameba (crushing)
		// TODO Boulder interaction -> swapping dirt under boulder -> no crush
		// TODO Ameba stops growing if no space
	}

	/**
	  * Movement based on board shifting
	  * @param direction top | bottom | left | right
	  */
	mandatoryMove(direction: string) {
		// 	// move all smol amebas
		// 	for (let smol of this._gv.allAI) {
		// 		smol.mandatoryMove(direction);
		// 	}
	}

	/**
	 * Main grow function
	 */
	expand() {
		// this.expandInterval = setInterval(() => {
		setTimeout(() => {
			console.log("expansion iteration");
			// this.expandedDuringIteration = 0; TODO reset counter somehow
			this.contaminate()
			// setTimeout(() => {
			// 	console.log("expansion iteration2");
			// 	this.contaminate()
			// }, 5000);
		}, 5000);
		// }, this._gv.gravityIntervalTime * 5)
	}

	/**
	 * A single iteration of ameba's expansion
	 */
	contaminate() {
		console.log("Expanding big");
		let amebasOnStart = this._gv.allAI.map((el) => { return el });

		for (let ameba of amebasOnStart) {
			if (ameba instanceof SmolAmeba && ameba.canExpand) {
				let canExpandInto: string[] = ameba.canExpandInto();
				console.log(this, canExpandInto);

				for (let direction of canExpandInto) {
					switch (direction) {
						case "top":
							if (this._gv.currLevel[ameba.absY - 1][ameba.absX] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX && el.absY == ameba.absY - 1
								}).length == 0) {
									console.log("expanding top");
									this.addNewAmeba(ameba.absX, ameba.absY - 1);
								} else {
									console.log("Smol ameba exists");
								}
							} else {
								// Handle player interaction
							}
							break;
						case "bottom":
							if (this._gv.currLevel[ameba.absY + 1][ameba.absX] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX && el.absY == ameba.absY + 1
								}).length == 0) {
									console.log("expanding bottom");
									this.addNewAmeba(ameba.absX, ameba.absY + 1);
								} else {
									console.log("Smol ameba exists");
								}
							} else {
								// Handle player interaction
							}
							break;
						case "left":
							if (this._gv.currLevel[ameba.absY][ameba.absX - 1] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX - 1 && el.absY == ameba.absY
								}).length == 0) {
									console.log("expanding left");
									this.addNewAmeba(ameba.absX - 1, ameba.absY);
								} else {
									console.log("Smol ameba exists");
								}
							} else {
								// Handle player interaction
							}
							break;
						case "right":
							if (this._gv.currLevel[ameba.absY][ameba.absX + 1] != 9) {
								if (this._gv.allAI.filter((el) => {
									return el.absX == ameba.absX + 1 && el.absY == ameba.absY
								}).length == 0) {
									console.log("expanding right");
									this.addNewAmeba(ameba.absX + 1, ameba.absY);
								} else {
									console.log("Smol ameba exists");
								}
							} else {
								// Handle player interaction
							}
							break;
					}
				}
			}
		}
		console.log(this._gv.allAI);
	}

	/**
	 * Creates new small Ameba tile
	 * @param x absX of the new SmolAmeba
	 * @param y absY of the new SmolAmeba
	 */
	addNewAmeba(x: number, y: number) {
		// this.smolAmebas.push(
		this._gv.allAI.push(
			new SmolAmeba(this._gv, x, y)
		)
		this._gv.currLevel[y][x] = 8;
		this.expandedDuringIteration++;

		// console.table(this._gv.currLevel);
	}

	update() {
		// for (let ameba of this.smolAmebas) {
		// 	ameba.update();
		// }
	}
}