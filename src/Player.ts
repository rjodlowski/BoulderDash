import Board from "./Board";
import GlobalVars from "./GlobalVars";

export default class Player {
	_gv: GlobalVars;

	// Player model
	width: number;
	height: number;

	// Relative positions -> [px]
	relX: number;
	relY: number;

	// Absolute positions
	absX: number;
	absY: number;

	color: string = "red";

	playerPassable: boolean = true;
	entityPassable: boolean = true;
	groundShifted: boolean = false;

	constructor(gv: GlobalVars, startX: number, startY: number) {
		this._gv = gv;

		// Player model dimensions
		this.width = this._gv.fieldSize;
		this.height = this._gv.fieldSize;

		this.absX = startX;
		this.absY = startY;

		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		this.draw(this.relX, this.relY);
	}

	/**
	 * Draw the player using relative positions [px]
	 * @param relX
	 * @param relY
	 */
	draw(relX: number, relY: number) {
		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			relX,
			relY,
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
				let elUp = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY - this._gv.fieldSize })
				if (elUp.length > 0) {
					if (!elUp[0].playerPassable) {
						return false;
					}
				}
				let elUpDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX && el.relY == this.relY - this._gv.fieldSize })
				if (elUpDyn.length > 0) {
					if (!elUpDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "down":
				let elDown = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize })
				if (elDown.length > 0) {
					if (!elDown[0].playerPassable) {
						return false;
					}
				}
				let elDownDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize })
				if (elDownDyn.length > 0) {
					if (!elDownDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "left":
				let elLeft = this._gv.allElements.filter((el) => { return el.relX == this.relX - this._gv.fieldSize && el.relY == this.relY })
				if (elLeft.length > 0) {
					if (!elLeft[0].playerPassable) {
						return false;
					}
				}
				let elLeftDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX - this._gv.fieldSize && el.relY == this.relY })
				if (elLeftDyn.length > 0) {
					if (!elLeftDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "right":
				let elRight = this._gv.allElements.filter((el) => { return el.relX == this.relX + this._gv.fieldSize && el.relY == this.relY })
				if (elRight.length > 0) {
					if (!elRight[0].playerPassable) {
						return false;
					}
				}
				let elRightDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX + this._gv.fieldSize && el.relY == this.relY })
				if (elRightDyn.length > 0) {
					if (!elRightDyn[0].playerPassable) {
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
				let distanceFromTop = this.relY

				if (this.relY > upperBorderPx || this._gv.displayY == minDisplayY && distanceFromTop <= upperBorderPx) {
					if (this.canMove(direction)) {
						this.relY -= this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY - 1][this.absX] = 9;
						this.absY--
						this._gv.playerY = this.absY;
					}
				} else {
					console.log("Shift border top");
					Board.movePartOfScene(this._gv, "top")
					this.groundShifted = true;
				}
				break;
			case 'down':
				let lowerBorderPx = this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromBottom = this._gv.canvasHeight - (this._gv.canvasHeight - this.relY)
				let maxDisplayY = this._gv.levelHeight - this._gv.fieldsPerHeight

				if (this.relY < lowerBorderPx || this._gv.displayY == maxDisplayY && distanceFromBottom >= lowerBorderPx) {
					if (this.canMove(direction)) {
						this.relY += this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY + 1][this.absX] = 9;
						this.absY++
						this._gv.playerY = this.absY;
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
				let distanceFromLeft = this.relX;

				if (this.relX > leftBorderPx || this._gv.displayX == minDisplayX && distanceFromLeft <= leftBorderPx) {
					if (this.canMove(direction)) {
						this.relX -= this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX - 1] = 9;
						this.absX--
						this._gv.playerX = this.absX;
					}
				} else {
					console.log("Shift border left");
					Board.movePartOfScene(this._gv, "left")
					this.groundShifted = true;
				}
				break;
			case 'right':
				let rightBorderPx = this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromRight = this._gv.canvasWidth - (this._gv.canvasWidth - this.relX);
				let maxDisplayX = this._gv.levelWidth - this._gv.fieldsPerWidth;

				if (this.relX < rightBorderPx || this._gv.displayX == maxDisplayX && distanceFromRight >= rightBorderPx) {
					if (this.canMove(direction)) {
						this.relX += this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX + 1] = 9;
						this.absX++
						this._gv.playerX = this.absX;
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
		let found = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY })
		// console.log(found, this._gv.allElements, this.posX, this.posY);

		if (found.length > 0) {
			let name = found[0].constructor.name
			switch (name) {
				case "Dirt":
					let index = this._gv.allElements.indexOf(found[0])
					Board.removeEl(
						this._gv,
						index,
						found[0].relX / this._gv.fieldSize,
						found[0].relY / this._gv.fieldSize,
					)
					break;

				default:
					console.log(`Deleting: ${name} - no case`);
					break;
			}
		}
	}

	update() {
		this.draw(this.relX, this.relY);

		// Handles the ground shifting exception
		if (this.groundShifted) {
			this.checkIfWalkedOnSth();
			this.groundShifted = false;
		}
	}

}