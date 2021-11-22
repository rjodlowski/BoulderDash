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

	groundShifted: boolean;

	constructor(gv: GlobalVars, color: string, startX: number, startY: number) {
		this._gv = gv;

		// Player model dimensions
		this.width = this._gv.fieldSize;
		this.height = this._gv.fieldSize;
		this.color = color;

		this.posX = startX;
		this.posY = startY;

		this.groundShifted = false;

		this.draw(this.posX, this.posY);
	}

	/**
	 * Draw the player
	 * @param posX [px]
	 * @param posY [px]
	 */
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

	/**
	 * Checks if a plater can move in the specified direction
	 * @param direction up | down | left | right
	 */
	canMove(direction: string): boolean {
		switch (direction) {
			case "up":
				let elUp = this._gv.allElements.filter((el) => { return el.x == this.posX && el.y == this.posY - this._gv.fieldSize })
				if (elUp.length > 0) {
					if (!elUp[0].passable) {
						return false;
					}
				}
				break;
			case "down":
				let elDown = this._gv.allElements.filter((el) => { return el.x == this.posX && el.y == this.posY + this._gv.fieldSize })
				if (elDown.length > 0) {
					if (!elDown[0].passable) {
						return false;
					}
				}
				break;
			case "left":
				let elLeft = this._gv.allElements.filter((el) => { return el.x == this.posX - this._gv.fieldSize && el.y == this.posY })
				if (elLeft.length > 0) {
					if (!elLeft[0].passable) {
						return false;
					}
				}
				break;
			case "right":
				let elRight = this._gv.allElements.filter((el) => { return el.x == this.posX + this._gv.fieldSize && el.y == this.posY })
				if (elRight.length > 0) {
					if (!elRight[0].passable) {
						return false;
					}
				}
				break;
			default:
				console.log("Unknown direction");
				break;
		}
		return true;
	}

	/**
	 * Moves the player
	 * @param direction up | down | left | right 
	 */
	move(direction: string) {
		Board.playerMoved = true;

		switch (direction) {
			case 'up':
				let upperBorderPx = this._gv.fieldSize * this._gv.innerBorder
				let minDisplayY = 0
				let distanceFromTop = this.posY

				if (this.posY > upperBorderPx || this._gv.displayY == minDisplayY && distanceFromTop <= upperBorderPx) {
					if (this.canMove(direction)) {
						this.posY -= this._gv.fieldSize;
					}
				} else {
					console.log("Shift border top");
					Board.movePartOfScene(this._gv, "top")
					this.groundShifted = true;
				}
				break;
			case 'down':
				let lowerBorderPx = this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromBottom = this._gv.canvasHeight - (this._gv.canvasHeight - this.posY)
				let maxDisplayY = this._gv.levelHeight - this._gv.fieldsPerHeight

				if (this.posY < lowerBorderPx || this._gv.displayY == maxDisplayY && distanceFromBottom >= lowerBorderPx) {
					if (this.canMove(direction)) {
						this.posY += this._gv.fieldSize;
					}
				} else {
					console.log("Shift border bottom");
					Board.movePartOfScene(this._gv, "bottom")
					this.groundShifted = true;
				}
				break;
			case 'left':
				let leftBorderPx = this._gv.fieldSize * this._gv.innerBorder
				let minDisplayX = 0;
				let distanceFromLeft = this.posX;

				if (this.posX > leftBorderPx || this._gv.displayX == minDisplayX && distanceFromLeft <= leftBorderPx) {
					if (this.canMove(direction)) {
						this.posX -= this._gv.fieldSize;
					}
				} else {
					console.log("Shift border left");
					Board.movePartOfScene(this._gv, "left")
					this.groundShifted = true;
				}
				break;
			case 'right':
				let rightBorderPx = this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromRight = this._gv.canvasWidth - (this._gv.canvasWidth - this.posX);
				let maxDisplayX = this._gv.levelWidth - this._gv.fieldsPerWidth;

				if (this.posX < rightBorderPx || this._gv.displayX == maxDisplayX && distanceFromRight >= rightBorderPx) {
					if (this.canMove(direction)) {
						this.posX += this._gv.fieldSize;
					}
				} else {
					console.log("Shift border right");
					Board.movePartOfScene(this._gv, "right")
					this.groundShifted = true;
				}
				break;
			default:
				console.log("Unknown direction");
		}

		this.checkIfWalkedOnSth();
	}

	checkIfWalkedOnSth() {
		let found = this._gv.allElements.filter((el) => { return el.x == this.posX && el.y == this.posY })
		// console.log(found, this._gv.allElements, this.posX, this.posY);

		if (found.length > 0) {
			let name = found[0].constructor.name
			switch (name) {
				case "Dirt":
					let index = this._gv.allElements.indexOf(found[0])
					Board.removeEl(
						this._gv,
						index,
						found[0].x / this._gv.fieldSize,
						found[0].y / this._gv.fieldSize,
					)
					break;

				default:
					console.log(`Deleting: ${name} - no case`);
					break;
			}
		}
	}

	update() {
		this.draw(this.posX, this.posY);

		// Handles the ground shifting exception
		if (this.groundShifted) {
			this.checkIfWalkedOnSth();
			this.groundShifted = false;
		}
	}

}