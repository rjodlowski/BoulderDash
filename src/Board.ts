import BorderWall from "./entities/BorderWall";
import Boulder from "./entities/Boulder";
import Dirt from "./entities/Dirt";
import InnerWall from "./entities/InnerWall";
import GlobalVars from "./GlobalVars";
import levels from "./levels/Levels";

export default class Board {
	_gv: GlobalVars;

	// part of scene displays border walls
	displaysWalls: {
		top: boolean,
		bottom: boolean,
		left: boolean,
		right: boolean,
	}

	public static playerMoved: boolean = false;

	constructor(gv: GlobalVars) {
		this._gv = gv;

		this.displaysWalls = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		}

		this.setLevel(this._gv.currLevelNumber);
		this.createCanvas();
		this.checkWalls();
		this.getPartOfScene();
		this.displayScene();
		this.generateBoulders();
	}

	/**
	 * Creates canvas element and drawing context
	 */
	createCanvas() {
		let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
		canvas.width = this._gv.canvasWidth;
		canvas.height = this._gv.canvasHeight;
		this._gv.app.append(canvas);
		this._gv.canvas = canvas;
		this._gv.ctx = this._gv.canvas.getContext("2d");
	}

	/**
	 * Sets the level id and associated params in GlobalVars
	 * @param levelId 
	 */
	setLevel(levelId: number) {
		this._gv.currLevelNumber = levelId;
		this._gv.currLevel = levels[this._gv.currLevelNumber];
		this._gv.levelHeight = this._gv.currLevel.length;
		this._gv.levelWidth = this._gv.currLevel[0].length;
	}

	/**
	 * Gets the part of the scene to display
	 */
	getPartOfScene() {
		let partOfScene: number[][] = new Array(this._gv.fieldsPerHeight).fill(0).map(() => new Array(this._gv.fieldsPerWidth).fill("XD"));

		for (let y = 0; y < this._gv.fieldsPerHeight; y++) {
			for (let x = 0; x < this._gv.fieldsPerWidth; x++) {
				if (
					y + this._gv.displayY < this._gv.currLevel.length &&
					x + this._gv.displayX < this._gv.currLevel[0].length
				) {
					partOfScene[y][x] = this._gv.currLevel[y + this._gv.displayY][x + this._gv.displayX];
				}
			}
		}
		this._gv.scenePart = partOfScene;
		// console.log(this.scenePart);
	}

	/**
	 * Checks if the sides of a level are displayed
	 */
	checkWalls() {
		this._gv.displayY == 0 ? this.displaysWalls.top = true : this.displaysWalls.top = false;
		this._gv.displayY + this._gv.fieldsPerHeight >= this._gv.currLevel.length - 1 ? this.displaysWalls.bottom = true : this.displaysWalls.bottom = false;
		this._gv.displayX == 0 ? this.displaysWalls.left = true : this.displaysWalls.left = false;
		this._gv.displayX + this._gv.fieldsPerWidth >= this._gv.currLevel[0].length - 1 ? this.displaysWalls.right = true : this.displaysWalls.right = false;
		// console.log(this.displaysWalls);
		// this.displayScene();
	}

	/** 
	 * Move the part of the scene in the given direction
	 * @param direction top | bottom | left | right
	 */
	public static movePartOfScene(gv: GlobalVars, direction: string) {
		// console.log(direction);
		switch (direction) {
			case "top":
				if (gv.displayY > 0) {
					gv.displayY--;
					Board.moveDynamicMandatory(gv, "top");
					Board.moveStaticMandatory(gv, "top")
				} else {
					console.log("Can't move up", gv.displayY);
				}
				break;

			case "bottom":
				if (gv.displayY + gv.fieldsPerHeight <= gv.levelHeight - 1) {
					gv.displayY++;
					Board.moveDynamicMandatory(gv, "bottom");
					Board.moveStaticMandatory(gv, "bottom")

				} else {
					console.log("Can't move down", gv.displayY);
				}
				break;

			case "left":
				if (gv.displayX > 0) {
					gv.displayX--;
					Board.moveDynamicMandatory(gv, "left");
					Board.moveStaticMandatory(gv, "left")

				} else {
					console.log("Can't move left", gv.displayX);
				}
				break;

			case "right":
				if (gv.displayX + gv.fieldsPerWidth <= gv.levelWidth - 1) {
					gv.displayX++;
					Board.moveDynamicMandatory(gv, "right");
					Board.moveStaticMandatory(gv, "right")

				} else {
					console.log("Can't move right", gv.displayX);
				}
				break;

			default:
				console.log("Unknown direction");
				break;
		}
	}

	/**
	 * Moves all dynamic entities when the board shifts
	 * @param direction top | bottom | left | right
	 */
	public static moveDynamicMandatory(gv: GlobalVars, direction: string) {
		// console.log("Moving all dynamic entities: ", direction);

		for (let i = 0; i < gv.allDynamic.length; i++) {
			gv.allDynamic[i].mandatoryMove(direction)
		}
	}

	public static moveStaticMandatory(gv: GlobalVars, direction: string) {
		switch (direction) {
			case "top":
				for (let i = 0; i < gv.allElements.length; i++) {
					gv.allElements[i].relY += gv.fieldSize;
				}
				break;
			case "bottom":
				for (let i = 0; i < gv.allElements.length; i++) {
					gv.allElements[i].relY -= gv.fieldSize;
				}
				break;
			case "left":
				for (let i = 0; i < gv.allElements.length; i++) {
					gv.allElements[i].relX += gv.fieldSize;
				}
				break;
			case "right":
				for (let i = 0; i < gv.allElements.length; i++) {
					gv.allElements[i].relX -= gv.fieldSize;
				}
				break;
		}
	}

	/**
	 * Displays a part of the scene; Renders items represented by numbers in a level
	 */
	displayScene() {
		for (let y: number = 0; y < this._gv.currLevel.length; y++) {
			for (let x: number = 0; x < this._gv.currLevel[0].length; x++) {
				let entityNumber: number = this._gv.currLevel[y][x];
				switch (entityNumber) {
					case 0: // Empty field
						break;
					case 1: // Border wall
						this._gv.allElements.push(
							new BorderWall(this._gv, x, y)
						);
						break;
					case 2: // Inner wall
						this._gv.allElements.push(
							new InnerWall(this._gv, x, y)
						);
						break;
					case 3: // 
						this._gv.allElements.push(
							new Dirt(this._gv, x, y)
						);
						break;
					case 4: // Boulder - not created over and over again
						break;

					case 9: // Player
						// console.log(`Creating player: x:${x}, y:${y}`);
						this._gv.playerX = x;
						this._gv.playerY = y;
						break;

					default:
						console.log("Unknown entity type");
						break;
				}
			}
		}
	}

	/**
	 * Generates all boulders in the level
	 */
	generateBoulders() {
		for (let y: number = 0; y < this._gv.levelHeight; y++) {
			for (let x: number = 0; x < this._gv.levelWidth; x++) {
				if (this._gv.currLevel[y][x] == 4) {
					this._gv.allDynamic.push(
						new Boulder(this._gv, x, y,)
					)
				}
			}
		}
		this.enableGravity();

		// console.log("allDynamic: ", this._gv.allDynamic);
	}

	enableGravity() {
		// setInterval(() => {
		console.log("gravity")
		let boulders = this._gv.allDynamic.filter((el) => { return el.constructor.name == "Boulder" })
		for (let i = 0; i < boulders.length; i++) {
			boulders[i].fall();
		}
		// }, 1000)
	}

	public static removeEl(gv: GlobalVars, index: number, x: number, y: number) {
		// Remove from allElements
		gv.allElements.splice(index, 1);

		// Remove from level
		gv.currLevel[gv.displayY + y][gv.displayX + x] = 0
	}

	update() {

		// update all static elements on the board

		if (Board.playerMoved) {
			// Player.checkIfWalkedOnSth(this._gv, );
			this.getPartOfScene();
			// this._gv.allElements = []
			// this.displayScene();
			Board.playerMoved = false;
		}

		// Update allElements on board
		for (let i: number = 0; i < this._gv.allElements.length; i++) {
			this._gv.allElements[i].update();
		}

		// Update all dynamic elements
		for (let i: number = 0; i < this._gv.allDynamic.length; i++) {
			this._gv.allDynamic[i].update();
		}
	}
}