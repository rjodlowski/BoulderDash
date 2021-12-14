import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class Dirt {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;
	// Absolute positions
	absX: number // level coord
	absY: number // level coord

	color: string = "brown";

	deleted: boolean = false;
	playerPassable: boolean = true;
	entityPassable: boolean = false;

	constructor(gv: GlobalVars, x: number, y: number,) {
		this._gv = gv;

		this.absX = x;
		this.absY = y;

		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		if (!this.deleted) {
			this.draw(this.relX, this.relY);
		}
	}

	delete() {
		let index = this._gv.allElements.indexOf(this);
		this._gv.allElements.splice(index, 1);
	}

	draw(relX: number, relY: number) {
		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			relX,
			relY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}