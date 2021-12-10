import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class InnerWall {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;

	color: string;

	playerPassable: boolean = false;
	entityPassable: boolean = false;

	constructor(gv: GlobalVars, color: string, x: number, y: number,) {
		this._gv = gv;
		this.relX = x;
		this.relY = y;
		this.color = color;

		this.draw(this.relX, this.relY);
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