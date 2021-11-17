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
				if (this.posY > this._gv.fieldSize * this._gv.innerBorder) {
					this.posY -= this._gv.fieldSize;
				} else {
					console.log("Shift border top");
				}
				break;
			case 'down':
				if (this.posY < this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {
					this.posY += this._gv.fieldSize;
				} else {
					console.log("Shift border bottom");
				}
				break;
			case 'left':
				if (this.posX > this._gv.fieldSize * this._gv.innerBorder) {
					this.posX -= this._gv.fieldSize;
				} else {
					console.log("Shift border left");
				}
				break;
			case 'right':
				if (this.posX < this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {
					this.posX += this._gv.fieldSize;
				} else {
					console.log("Shift border right");
				}

				break;
			default:
				console.log("Unknown direction");
		}
	}

	update() {
		this.draw(this.posX, this.posY);
	}

}