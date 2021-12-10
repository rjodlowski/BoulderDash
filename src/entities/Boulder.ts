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
		console.log(this);

		if (this.absY < this._gv.levelHeight - 1) {
			let fieldBeneath;

			console.log(this._gv.allElements);

			// Find an object of a field beneath in static and dynamic table
			let foundStatic = this._gv.allElements.filter((el) => {
				return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize
			})
			console.log(foundStatic);

			if (foundStatic.length == 0) {
				let foundDynamic = this._gv.allDynamic.filter((el) => {
					return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize;
				})
				console.log(foundDynamic);
				if (foundDynamic.length > 0) {
					fieldBeneath = foundDynamic[0];
				}
			} else {
				fieldBeneath = foundStatic[0];
			}
			console.log(fieldBeneath);

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
		console.log(this.canFall());

		if (this.canFall()) {
			// Fall relatively
			this.relY += this._gv.fieldSize;
			// Fall absolutely
			this._gv.currLevel[this.absY][this.absX] = 0
			this._gv.currLevel[this.absY + 1][this.absX] = 4;
			this.absY++;
		}
	}

	/**
	 * Rolls down the side when stacked
	 */
	rollDown() { }

	update() {
		this.draw(this.relX, this.relY);
	}
}