import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class Dirt {
	_gv: GlobalVars;
	x: number; // [px]
	y: number; // [px]
	color: string;
	passable: boolean;
	deleted: boolean;

	constructor(gv: GlobalVars, color: string, x: number, y: number,) {
		this._gv = gv;
		this.x = x;
		this.y = y;
		this.color = color;
		this.passable = true;
		this.deleted = false;

		if (!this.deleted) {
			this.draw(this.x, this.y);
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
		this.draw(this.x, this.y);
	}
}