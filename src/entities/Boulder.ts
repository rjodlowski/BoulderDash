import GlobalVars from "../GlobalVars";
import Player from "../Player";
import Butterfly from "./Butterfly";
import Firefly from "./Firefly";
import SmolAmeba from "./SmolAmeba";

export default class Boulder {
	_gv: GlobalVars;

	// Relative position
	relX: number // [px]
	relY: number // [px]

	// Absolute position
	absX: number // level coord
	absY: number // level coord

	color: string = "yellow";
	gravityInterval: NodeJS.Timer;

	playerPassable: boolean = false;
	entityPassable: boolean = false;
	falling: boolean = false;

	constructor(gv: GlobalVars, x: number, y: number) {
		// console.log("Boulder created");
		this._gv = gv;

		this.absX = x;
		this.absY = y;
		this.relX = (this.absX - this._gv.displayX) * this._gv.fieldSize;
		this.relY = (this.absY - this._gv.displayY) * this._gv.fieldSize;

		// setTimeout(() => {
		this.fall();
		// }, 100);
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

	/**
	  * Movement affected by gravity
	  */
	fall() {
		this.gravityInterval = setInterval(() => {
			if (this.canFall()) {
				// Fall relatively
				this.relY += this._gv.fieldSize;
				// Fall absolutely
				this._gv.currLevel[this.absY][this.absX] = 0
				this._gv.currLevel[this.absY + 1][this.absX] = 4;
				this.absY++;
				this.falling = true;
			} else {
				// console.log(this, "rolling down");
				this.rollDown();

			}
		}, this._gv.gravityIntervalTime + Math.random() * this._gv.gravityIntervalTime / 10)
		// }, this._gv.gravityIntervalTime)
		// this._gv.gravityIntervalTime -= 6; // Rocks lower fall faster
	}

	/**
	 * Checks if empty field beneath 
	 */
	canFall(): boolean {
		if (this.absY < this._gv.levelHeight - 1) {
			let fieldBeneath;

			// Find an object of a field beneath in static and dynamic table
			let foundStatic = this._gv.allElements.filter((el) => {
				return el.absX == this.absX && el.absY == this.absY + 1
			})

			if (foundStatic.length == 0) {
				let foundDynamic = this._gv.allDynamic.filter((el) => {
					return el.absX == this.absX && el.absY == this.absY + 1;
				})

				if (foundDynamic.length > 0) {
					fieldBeneath = foundDynamic[0];
				} else {
					if (this.absX == this._gv.playerX && this.absY + 1 == this._gv.playerY) {
						if (this.falling) {
							if (this.constructor.name == "Diamond") {
								Player.collectDiamond(this._gv, this)
							} else {
								Player.die(this._gv, "crushed");
							}
							return true;
						} else {
							return false;
						}
					} else {
						let foundAI = this._gv.allAI.filter((el) => {
							return el.absX == this.absX && el.absY == this.absY + 1;
						})

						if (foundAI.length > 0) {
							if (foundAI[0] instanceof Firefly) {
								foundAI[0].crush();
							} else if (foundAI[0] instanceof SmolAmeba) {
								if (this.falling) {
									foundAI[0].delete();
									this._gv.smolAmebaCount--;
									return true;
								} else {
									return false;
								}
							}
						}
					}
				}
			} else {
				fieldBeneath = foundStatic[0];
			}

			if (fieldBeneath != undefined) {
				if (
					this.falling &&
					this instanceof Boulder && fieldBeneath instanceof Firefly ||
					this instanceof Boulder && fieldBeneath instanceof Butterfly
				) {
					console.log("firefly found");

					fieldBeneath.crush();
				}
				return fieldBeneath.entityPassable;
			}
		}
		return true;
	}


	/**
	 * Checks if empty space below or stacked on another boulder
	 * @returns table of directions: left | right
	 */
	canRollDown(): string[] {
		let directions: string[] = []

		let objectBeneath = this._gv.allDynamic.filter((el) => {
			return el.absX == this.absX &&
				el.absY == this.absY + 1 &&
				(
					el.constructor.name == "Boulder" ||
					el.constructor.name == "Diamond"
				)
		})

		if (objectBeneath.length > 0) {
			if (this.absY < this._gv.levelHeight - 1) {
				// Try to fall left
				if (this._gv.currLevel[this.absY][this.absX - 1] == 0) {
					if (this._gv.currLevel[this.absY + 1][this.absX - 1] == 0) {
						directions.push("left");
					}
				}
				// Can't fall left, check right
				if (directions.length == 0) {
					if (this._gv.currLevel[this.absY][this.absX + 1] === 0) {
						if (this._gv.currLevel[this.absY + 1][this.absX + 1] === 0) {
							directions.push("right");
						}
					}
				}
			}
		}
		return directions;
	}

	/**
	 * Rolls down the side whenever able to
	 */
	rollDown() {
		let directions = this.canRollDown();

		if (directions.length > 0) {
			// console.log("Rolling down", directions[0]);
			switch (directions[0]) {
				case "left":
					// Move relatively
					this.relX -= this._gv.fieldSize;
					// Move absolutely
					this._gv.currLevel[this.absY][this.absX] = 0
					this._gv.currLevel[this.absY][this.absX - 1] = 4;
					this.absX--;

					break;
				case "right":
					// Move relatively
					this.relX += this._gv.fieldSize;
					// Move absolutely
					this._gv.currLevel[this.absY][this.absX] = 0
					this._gv.currLevel[this.absY][this.absX + 1] = 4;
					this.absX++;

					break;
			}
		} else {
			this.falling = false;
		}
	}

	/**
	 * Boulder pushed by a player
	 * @param side left | right
	 */
	moveByPlayer(side: string) {
		// TODO can be moved to the side just once
		if (!this.falling) {
			switch (side) {
				case "left":
					if (this._gv.currLevel[this.absY][this.absX - 1] == 0) {
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX - 1] = 4;

						this.absX--;
						this.relX -= this._gv.fieldSize;
					}
					break;
				case "right":
					if (this._gv.currLevel[this.absY][this.absX + 1] == 0) {
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX + 1] = 4;

						this.absX++;
						this.relX += this._gv.fieldSize;
					}
					break;
			}
		}
	}

	/**
	 * Method for the sake of Typescript, shouldn't ever be called
	 */
	collect() {
		alert("Boulder is not collectable lol");
	}

	/**
	 * Destroys boulder (e.g. if exploded)
	 */
	destroy() {
		clearInterval(this.gravityInterval);
		this._gv.currLevel[this.absY][this.absX] = 0;
		let index = this._gv.allDynamic.indexOf(this);
		this._gv.allDynamic.splice(index, 1);
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}