import GlobalVars from "./GlobalVars";

export default class Player {
	_gv: GlobalVars;

	// Player model
	width: number;
	height: number;

	// Positions
	posX: number;
	posY: number;

	constructor(gv: GlobalVars, startX: number, startY: number) {
		console.log("Player created");
		this._gv = gv;

		// Player model dimensions
		this.width = this._gv.fieldSize;
		this.height = this._gv.fieldSize;

		this.posX = startX;
		this.posY = startY;

		this.draw(this.posX, this.posY);
	}

	draw(posX: number, posY: number) {
		// console.log("drawing player")

		this._gv.ctx.fillRect(
			posX,
			posY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)
		this._gv.ctx.fillStyle = "black";

	}

	move(direction: string) {
		// If player does not collide with unpassable entity (e.g. wall)

		switch (direction) {
			case 'up':
				this.posY -= this._gv.fieldSize;
				break;
			case 'down':
				this.posY += this._gv.fieldSize;
				break;
			case 'left':
				this.posX -= this._gv.fieldSize;
				break;
			case 'right':
				this.posX += this._gv.fieldSize;
				break;
			default:
				console.log("Unknown direction");
		}
	}

	update() {
		this.draw(this.posX, this.posY);
	}

}