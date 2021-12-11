import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class Dirt {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;
	// Absolute position
	absX: number // level coord
	absY: number // level coord


	color: string;

	deleted: boolean = false;

	playerPassable: boolean = true;
	entityPassable: boolean = false;

	constructor(gv: GlobalVars, color: string, x: number, y: number,) {
		this._gv = gv;
		this.relX = x;
		this.relY = y;

		this.absX = (this.relX / this._gv.fieldSize) - this._gv.displayX;
		this.absY = (this.relY / this._gv.fieldSize) - this._gv.displayY;

		this.color = color;

		if (!this.deleted) {
			this.draw(this.relX, this.relY);
		}
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