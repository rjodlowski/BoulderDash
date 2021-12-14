import GlobalVars from "../GlobalVars";
import BorderWall from "./BorderWall";
import Boulder from "./Boulder";
import Diamond from "./Diamond";
import Dirt from "./Dirt";
import InnerWall from "./InnerWall";

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

		// TODO Moves near the walls always on the same side (left) -> done
		// TODO Walkes over all static and dynamic obstacles - not another AI elements - done
		// TODO Kills player if walks on him / touches him
		// TODO Explodes a 3x3 field (destroys everything except BorderWalls) if crushed
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
				this._gv.currLevel[this.absY - 1][this.absX] == 0 ? canGoForwards = true : 0
				break;
			case "bottom":
				this._gv.currLevel[this.absY + 1][this.absX] == 0 ? canGoForwards = true : 0
				break;
			case "left":
				this._gv.currLevel[this.absY][this.absX - 1] == 0 ? canGoForwards = true : 0;
				break;
			case "right":
				this._gv.currLevel[this.absY][this.absX + 1] == 0 ? canGoForwards = true : 0;
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
				this.relY -= this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY - 1][this.absX] = 6;
				this.absY--;
				break;
			case "bottom":
				this.relY += this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY + 1][this.absX] = 6;
				this.absY++;
				break;
			case "left":
				this.relX -= this._gv.fieldSize;
				this._gv.currLevel[this.absY][this.absX] = 0;
				this._gv.currLevel[this.absY][this.absX - 1] = 6;
				this.absX--;
				break;
			case "right":
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
				this._gv.currLevel[this.absY - 1][this.absX - 1] == 0 ? goingToTurn = true : 0
				break;
			case "bottom":
				this._gv.currLevel[this.absY + 1][this.absX + 1] == 0 ? goingToTurn = true : 0
				break;
			case "left":
				this._gv.currLevel[this.absY + 1][this.absX - 1] == 0 ? goingToTurn = true : 0
				break;
			case "right":
				this._gv.currLevel[this.absY - 1][this.absX + 1] == 0 ? goingToTurn = true : 0
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

	update() {
		this.draw(this.relX, this.relY);
	}
}