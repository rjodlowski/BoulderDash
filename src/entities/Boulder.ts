import GlobalVars from "../GlobalVars";

export default class Boulder {
	_gv: GlobalVars;

	// Relative position
	relX: number // [px]
	relY: number // [px]

	// Absolute position
	absX: number // level coord
	absY: number // level coord

	deleted: boolean;

	playerPassable: boolean = false;
	entityPassable: boolean = false;
	color: string = "yellow";

	constructor(gv: GlobalVars, x: number, y: number) {
		console.log("Boulder created");
		this._gv = gv;

		this.relX = x;
		this.relY = y;
		this.absX = (this.relX / this._gv.fieldSize) - this._gv.displayX;
		this.absY = (this.relY / this._gv.fieldSize) - this._gv.displayY;
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

	mandatoryMove(direction: string) {
		// console.log("Moving me: ", direction);

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

	update() {
		this.draw(this.relX, this.relY);
	}
}