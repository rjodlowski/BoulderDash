import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class Dirt {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;

	color: string;

	deleted: boolean = false;

	playerPassable: boolean = true;
	entityPassable: boolean = false;

	constructor(gv: GlobalVars, color: string, x: number, y: number,) {
		this._gv = gv;
		this.relX = x;
		this.relY = y;
		this.color = color;

		if (!this.deleted) {
			this.draw(this.relX, this.relY);
		}
	}

	draw(posX: number, posY: number) {
		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			posX,
			posY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}