import GlobalVars from "../GlobalVars";
import Dirt from "./Dirt";
import Images from "./Images";

export default class SmolAmeba {
	_gv: GlobalVars;

	// Relative position
	relX: number // [px]
	relY: number // [px]

	// Absolute position
	absX: number // level coord
	absY: number // level coord

	color: string = "cyan";

	canExpand: boolean = true;
	show: boolean = false;

	imageAmeba: HTMLImageElement
	amebaPhase1sx: number[] = [0, 24, 48, 72, 96, 120, 144, 168];

	constructor(gv: GlobalVars, x: number, y: number) {
		this._gv = gv;

		this.absX = x;
		this.absY = y;
		this.relX = (this.absX - this._gv.displayX) * this._gv.fieldSize;
		this.relY = (this.absY - this._gv.displayY) * this._gv.fieldSize;

		this.getImage();

		this.showAfter(Math.random() * 2000);
	}

	showAfter(time: number) {
		setTimeout(() => {
			this.show = !this.show;
		}, time);
	}

	/**
	  * Movement based on board shifting
	  * @param direction top | bottom | left | right
	  */
	mandatoryMove(direction: string) {
		switch (direction) {
			case "top":
				this.relY += this._gv.fieldSize;
				break;
			case "bottom":
				this.relY -= this._gv.fieldSize;
				break;
			case "left":
				this.relX += this._gv.fieldSize;
				break;
			case "right":
				this.relX -= this._gv.fieldSize;
				break;
		}
	}

	/**
	 * Gets  directions small ameba can expand into and deletes disturbing dirt
	 * @returns top | bottom | left | right
	 */
	canExpandInto(): string[] {
		let directions: string[] = [];

		// Top
		let topField = this._gv.currLevel[this.absY - 1][this.absX];
		if (topField == 0 || topField == 3) { // Empty field or dirt
			if (topField == 3) {
				let dirtToDelete = this._gv.allElements.filter((el) => {
					return el.absX == this.absX && el.absY == this.absY - 1
				})
				if (dirtToDelete.length > 0 && dirtToDelete[0] instanceof Dirt) {
					// console.log("deleting dirt");
					dirtToDelete[0].delete();
				}
			}
			directions.push("top");
		}
		// Bottom
		let bottomField = this._gv.currLevel[this.absY + 1][this.absX];
		if (bottomField == 0 || bottomField == 3) {
			if (bottomField == 3) {
				let dirtToDelete = this._gv.allElements.filter((el) => {
					return el.absX == this.absX && el.absY == this.absY + 1
				})
				if (dirtToDelete.length > 0 && dirtToDelete[0] instanceof Dirt) {
					// console.log("deleting dirt");
					dirtToDelete[0].delete();
				}
			}
			directions.push("bottom");
		}
		// Left
		let leftField = this._gv.currLevel[this.absY][this.absX - 1];
		if (leftField == 0 || leftField == 3) {
			if (leftField == 3) {
				let dirtToDelete = this._gv.allElements.filter((el) => {
					return el.absX == this.absX - 1 && el.absY == this.absY
				})
				if (dirtToDelete.length > 0 && dirtToDelete[0] instanceof Dirt) {
					// console.log("deleting dirt");
					dirtToDelete[0].delete();
				}
			}
			directions.push("left");
		}
		// Right
		let rightField = this._gv.currLevel[this.absY][this.absX + 1];
		if (rightField == 0 || rightField == 3) {
			if (rightField == 3) {
				let dirtToDelete = this._gv.allElements.filter((el) => {
					return el.absX == this.absX + 1 && el.absY == this.absY
				})
				if (dirtToDelete.length > 0 && dirtToDelete[0] instanceof Dirt) {
					// console.log("deleting dirt");
					dirtToDelete[0].delete();
				}
			}
			directions.push("right");
		}

		directions.length > 0 ? this.canExpand = true : this.canExpand = false;

		return directions;
	}

	/**
	 * Remove smol ameba when crushed by a rock
	 */
	delete() {
		let index = this._gv.allAI.indexOf(this);
		this._gv.allAI.splice(index, 1);
	}

	getImage() {
		this.imageAmeba = Images.filter((el) => { return el.name == "ameba" })[0].image
	}

	draw(relX: number, relY: number) {
		if (this.show) {
			this._gv.ctx.drawImage(
				this.imageAmeba,
				this.amebaPhase1sx[this._gv.amebaPhase], 0,
				16, 16,
				relX, relY,
				this._gv.fieldSize, this._gv.fieldSize,
			);
		}
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}