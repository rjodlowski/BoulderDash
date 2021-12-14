import GlobalVars from "../GlobalVars";
import Player from "../Player";
import Dirt from "./Dirt";

export default class Firefly {
	_gv: GlobalVars;

	// Relative position
	relX: number // [px]
	relY: number // [px]

	// Absolute position
	absX: number // level coord
	absY: number // level coord

	color: string = "orange";

	playerPassable: boolean = true;
	entityPassable: boolean = false;
	isTurning: boolean = false;

	movementInterval: NodeJS.Timer;

	facing: string;

	constructor(gv: GlobalVars, x: number, y: number) {
		console.log("Firefly created!");
		this._gv = gv;

		this.absX = x;
		this.absY = y;
		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		// TODOEXTRA Fireflies overlap each other

		setTimeout(() => {
			this.startMoving();
		}, 1000);
	}

	/**
	 * Sets the movement interval
	 */
	startMoving() {
		this.getStartFacing();

		this.movementInterval = setInterval(() => {
			console.log("Moving firefly");
			this.jump();
		}, this._gv.gravityIntervalTime)
	}

	/**
	 * Gets the direction the Firefly is facing
	 * @returns top | bottom | left | right
	 */
	getStartFacing() {
		let facing: string = "";

		if (this._gv.currLevel[this.absY - 1][this.absX] != 0) {
			facing = "right";
		} else if (this._gv.currLevel[this.absY][this.absX - 1] != 0) {
			facing = "top";
		} else if (this._gv.currLevel[this.absY + 1][this.absX] != 0) {
			facing = "left";
		} else if (this._gv.currLevel[this.absY][this.absX + 1] != 0) {
			facing = "bottom";
		}

		// console.log(facing);
		this.facing = facing;
	}

	/**
	 * Main move decision function
	 */
	jump() {
		console.log(this.facing);
		console.log(this.canGoForwards());

		if (!this.isTurning) {
			if (!this.isOnCorner()) {
				if (this.canGoForwards()) {
					this.move();
				} else {
					this.rotate();
				}
			} else {
				this.turn();
			}
		}
	}

	/**
	 * Check if is going to slam the forehead against a wall
	 * @returns if can go forwards
	 */
	canGoForwards(): boolean {
		let canGoForwards: boolean = false;

		switch (this.facing) {
			case "top":
				let fieldTop = this._gv.currLevel[this.absY - 1][this.absX]
				fieldTop == 0 || fieldTop == 6 ? canGoForwards = true : 0

				if (this.absX == this._gv.playerX && this.absY - 1 == this._gv.playerY) {
					Player.die(this._gv, "fireflied");
				}
				break;
			case "bottom":
				let fieldBottom = this._gv.currLevel[this.absY + 1][this.absX]
				fieldBottom == 0 || fieldBottom == 6 ? canGoForwards = true : 0

				if (this.absX == this._gv.playerX && this.absY + 1 == this._gv.playerY) {
					Player.die(this._gv, "fireflied");
				}
				break;
			case "left":
				let fieldLeft = this._gv.currLevel[this.absY][this.absX - 1]
				fieldLeft == 0 || fieldLeft == 6 ? canGoForwards = true : 0;

				if (this.absX - 1 == this._gv.playerX && this.absY == this._gv.playerY) {
					Player.die(this._gv, "fireflied");
				}
				break;
			case "right":
				let fieldRight = this._gv.currLevel[this.absY][this.absX + 1]
				fieldRight == 0 || fieldRight == 6 ? canGoForwards = true : 0;

				if (this.absX + 1 == this._gv.playerX && this.absY == this._gv.playerY) {
					Player.die(this._gv, "fireflied");
				}
				break;
		}
		return canGoForwards;
	}

	/**
	 * Move forwards one tile
	 */
	move() {
		switch (this.facing) {
			case "top":
				if (this._gv.currLevel[this.absY - 1][this.absX] == 9) {
					Player.die(this._gv, "fireflied")
				}
				this.relY -= this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY - 1][this.absX] = 6;
				this.absY--;
				break;

			case "bottom":
				if (this._gv.currLevel[this.absY + 1][this.absX] == 9) {
					Player.die(this._gv, "fireflied")
				}
				this.relY += this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY + 1][this.absX] = 6;
				this.absY++;
				break;

			case "left":
				if (this._gv.currLevel[this.absY][this.absX - 1] == 9) {
					Player.die(this._gv, "fireflied")
				}
				this.relX -= this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY][this.absX - 1] = 6;
				this.absX--;
				break;

			case "right":
				if (this._gv.currLevel[this.absY][this.absX + 1] == 9) {
					Player.die(this._gv, "fireflied")
				}
				this.relX += this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY][this.absX + 1] = 6;
				this.absX++;
				break;
		}
	}

	/**
	 * Change movement direction if slammed forehead into a wall
	 */
	rotate() {
		console.log(`Rotating: ${this.facing}`);

		switch (this.facing) {
			case "top": // From top to right
				this.facing = "right";
				break;
			case "bottom": // From bottom to left
				this.facing = "left";
				break;
			case "left": // From left to top
				this.facing = "top";
				break;
			case "right": // From right to bottom
				this.facing = "bottom";
				break;
		}
	}

	/**
	 * Perform a rotation for a turn - opposite of normal rotate
	 */
	turnRotate() {
		// console.log(`Rotating: ${this.facing}`);

		switch (this.facing) {
			case "top": // From top to right
				this.facing = "left";
				break;
			case "bottom": // From bottom to left
				this.facing = "right";
				break;
			case "left": // From left to top
				this.facing = "bottom";
				break;
			case "right": // From right to bottom
				this.facing = "top";
				break;
		}
	}

	/**
	 * Checks if is about to turn the corner
	 * @returns if the corner is incoming
	 */
	isOnCorner(): boolean {
		// console.log("is on corner");
		let goingToTurn: boolean = false;

		// If field diagonally is empty
		switch (this.facing) {
			case "top":
				let fieldTop = this._gv.currLevel[this.absY - 1][this.absX - 1]
				fieldTop == 0 || fieldTop == 9 ? goingToTurn = true : 0
				break;

			case "bottom":
				let fieldBot = this._gv.currLevel[this.absY + 1][this.absX + 1]
				fieldBot == 0 || fieldBot == 9 ? goingToTurn = true : 0
				break;

			case "left":
				let fieldLeft = this._gv.currLevel[this.absY + 1][this.absX - 1]
				fieldLeft == 0 || fieldLeft == 9 ? goingToTurn = true : 0
				break;

			case "right":
				let fieldRight = this._gv.currLevel[this.absY - 1][this.absX + 1]
				fieldRight == 0 || fieldRight == 9 ? goingToTurn = true : 0
				break;
		}
		// console.log("is on corner: ", goingToTurn);

		return goingToTurn;
	}

	/**
	 * Perform a turn
	 */
	turn() {
		// console.log("You spin me right round");
		this.isTurning = true;

		this.move();
		setTimeout(() => {
			this.turnRotate();
			this.move();
			this.isTurning = false;
		}, this._gv.gravityIntervalTime);
	}

	/**
	 * Movement based on board shifting
	 * @param direction top | bottom | left | right
	 */
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

	draw(relX: number, relY: number) {
		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			relX,
			relY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)
	}

	crush() {
		console.log("Firefly crushed");
		clearInterval(this.movementInterval)

		for (let y = this.absY - 1; y <= this.absY + 1; y++) {
			for (let x = this.absX - 1; x <= this.absX + 1; x++) {
				let field = this._gv.currLevel[y][x];
				// console.log(field);

				if (field != 1) {
					let foundStatic = this._gv.allElements.filter((el) => {
						return el.absX == x && el.absY == y;
					})

					if (foundStatic.length > 0) {
						// Destroy it
						if (foundStatic[0] instanceof Dirt) {
							foundStatic[0].delete();
						}
					} else {
						// Search dynamic 
						let foundDynamic = this._gv.allDynamic.filter((el) => {
							return el.absX == x && el.absY == y;
						})

						if (foundDynamic.length > 0) {
							// Destroy dynamic 
							foundDynamic[0].destroy();
						} else {
							// Search AI
							let foundAI = this._gv.allAI.filter((el) => {
								return el.absX == x && el.absY == y;
							})
							if (foundAI.length > 0 && foundAI[0].absX != this.absX && foundAI[0].absY != this.absY) {
								// Blast another AI
								foundAI[0].crush();
							} else {
								if (this._gv.playerX == x && this._gv.playerY == y) {
									Player.die(this._gv, "exploded");
								}
							}
						}
					}
					this._gv.currLevel[y][x] = 0;
				}
			}
		}
		let index = this._gv.allAI.indexOf(this)
		this._gv.allAI.splice(index, 1);
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}