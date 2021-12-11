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
	// canBeCrushed: boolean = false;
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

	canFall(): boolean {
		// console.log(this);

		if (this.absY < this._gv.levelHeight - 1) {
			let fieldBeneath;

			// console.log(this._gv.allElements);

			// Find an object of a field beneath in static and dynamic table
			let foundStatic = this._gv.allElements.filter((el) => {
				return el.absX == this.absX && el.absY == this.absY + 1
			})
			// console.log(foundStatic);

			if (foundStatic.length == 0) {
				let foundDynamic = this._gv.allDynamic.filter((el) => {
					return el.absX == this.absX && el.absY == this.absY + 1;
				})
				// console.log(foundDynamic);
				if (foundDynamic.length > 0) {
					fieldBeneath = foundDynamic[0];
				}
			} else {
				fieldBeneath = foundStatic[0];
			}
			// console.log(fieldBeneath);

			// Examine the field beneath
			if (fieldBeneath != undefined) {
				return fieldBeneath.entityPassable;
				// if (fieldBeneath.canBeCrushed) {
				// 	fieldBeneath.crush()
				// }
			}
		}
		return true;
	}

	/**
	 * Movement affected by gravity
	 */
	fall() {
		//#region plan
		//	not bottom of map
		//	(check field under)
		//	an empty field
		//		can fall
		//	anonther object
		//		if entity-traversable
		// 			can fall
		// 			check if crushes sth (crawler, player, butterfly)

		// on fall update relative and absolute positions (move in a whole level)
		//#endregion

		setInterval(() => {
			if (this.canFall()) {
				// Fall relatively
				this.relY += this._gv.fieldSize;
				// Fall absolutely
				this._gv.currLevel[this.absY][this.absX] = 0
				this._gv.currLevel[this.absY + 1][this.absX] = 4;
				this.absY++;
			} else {
				this.rollDown();
			}
		}, 1000 + Math.random() * 200)
	}

	/**
	 * Checks if empty space below or stacked on another boulder
	 * @returns table of directions: left | right
	 */
	canRollDown(): string[] {
		// console.log(this);
		// can roll if a boulder beneath

		let directions: string[] = []
		let foundDynamic = this._gv.allDynamic.filter((el) => {
			return el.absX == this.absX &&
				el.absY == this.absY + 1 &&
				el.constructor.name == "Boulder"
		})
		// console.log(foundDynamic);
		if (foundDynamic.length > 0) {

			if (this.absY < this._gv.levelHeight - 1) {
				// Try to fall left
				// get the field on the left of the boulder

				// Search the static table
				let foundLeft = this._gv.allElements.filter((el) => {
					return el.absX == this.absX - 1 && el.absY == this.absY
				})

				if (foundLeft.length == 0) {
					foundLeft = this._gv.allDynamic.filter((el) => {
						return el.absX == this.absX - 1 &&
							el.absY == this.absY &&
							el.constructor.name == "Boulder"
					})
				}
				// console.log("foundLeft: ", foundLeft);

				if (foundLeft.length == 0) {
					// No element found, can be moved left
					let foundLeftBelow = this._gv.allElements.filter((el) => {
						return el.absX == this.absX - 1 &&
							el.absY == this.absY + 1;
					})
					if (foundLeftBelow.length == 0) {
						foundLeftBelow = this._gv.allDynamic.filter((el) => {
							return el.absX == this.absX - 1 &&
								el.absY == this.absY + 1 &&
								el.constructor.name == "Boulder"
						})
					}
					// console.log("found left below", foundLeftBelow);

					if (foundLeftBelow.length == 0 || foundLeftBelow[0].entityPassable) {
						// can fall -> will be pushed left
						directions.push("left");
					}
				}
				// if empty, get the one below
				// Try to fall right
				if (directions.length == 0) { // Can't fall left, check right
					let foundRight = this._gv.allElements.filter((el) => {
						return el.absX == this.absX + 1 && el.absY == this.absY
					})
					if (foundRight.length == 0) {
						foundRight = this._gv.allDynamic.filter((el) => {
							return el.absX == this.absX + 1 &&
								el.absY == this.absY &&
								el.constructor.name == "Boulder"
						})
					}
					// console.log("found right: ", foundRight);

					if (foundRight.length == 0) {
						// No element found, can be moved right
						let foundRightBelow = this._gv.allElements.filter((el) => {
							return el.absX == this.absX + 1 &&
								el.absY == this.absY + 1;
						})
						if (foundRightBelow.length == 0) {
							foundRightBelow = this._gv.allDynamic.filter((el) => {
								return el.absX == this.absX + 1 &&
									el.absY == this.absY + 1 &&
									el.constructor.name == "Boulder"
							})
						}
						// console.log("found right below: ", foundRightBelow);

						if (foundRightBelow.length == 0 || foundRightBelow[0].entityPassable) {
							// can fall -> will be pushed right
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
			console.log("Rolling down", directions[0]);
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
		}
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}