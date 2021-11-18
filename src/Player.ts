import Board from "./Board";
import GlobalVars from "./GlobalVars";

export default class Player {
	_gv: GlobalVars;

	// Player model
	width: number;
	height: number;
	color: string;

	// Positions
	posX: number;
	posY: number;

	constructor(gv: GlobalVars, color: string, startX: number, startY: number) {
		this._gv = gv;

		// Player model dimensions
		this.width = this._gv.fieldSize;
		this.height = this._gv.fieldSize;
		this.color = color;

		this.posX = startX;
		this.posY = startY;

		this.draw(this.posX, this.posY);
	}

	draw(posX: number, posY: number) {
		// console.log("drawing player")

		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			posX,
			posY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)

	}

	move(direction: string) {
		// If player does not collide with unpassable entity (e.g. wall)

		Board.playerMoved = true;

		switch (direction) {
			case 'up':
				if (this.posY > this._gv.fieldSize * this._gv.innerBorder) {
					this.posY -= this._gv.fieldSize;
				} else {
					console.log("Shift border top");
					Board.movePartOfScene(this._gv, "top")
				}
				break;
			case 'down':
				if (this.posY < this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {
					this.posY += this._gv.fieldSize;
				} else {
					console.log("Shift border bottom");
					Board.movePartOfScene(this._gv, "bottom")
				}
				break;
			case 'left':
				if (this.posX > this._gv.fieldSize * this._gv.innerBorder) {
					this.posX -= this._gv.fieldSize;
				} else {
					console.log("Shift border left");
					Board.movePartOfScene(this._gv, "left")
				}
				break;
			case 'right':
				if (this.posX < this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {
					this.posX += this._gv.fieldSize;
				} else {
					console.log("Shift border right");
					Board.movePartOfScene(this._gv, "right")
				}
				break;
			default:
				console.log("Unknown direction");
		}
		console.log(this._gv.displayX, this._gv.displayY);

	}

	update() {
		this.draw(this.posX, this.posY);
	}

}