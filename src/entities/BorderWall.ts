import GlobalVars from "../GlobalVars";

// Example object on the canvas, not the part of final project
export default class BorderWall {
	_gv: GlobalVars;
	x: number;
	y: number;
	color: string;

	constructor(gv: GlobalVars, color: string, x: number, y: number,) {
		this._gv = gv;
		this.x = x;
		this.y = y;
		this.color = color;

		this.draw(this.x, this.y);
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