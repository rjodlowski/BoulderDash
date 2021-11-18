import BorderWall from "./entities/BorderWall";
import Dirt from "./entities/Dirt";
import InnerWall from "./entities/InnerWall";
import GlobalVars from "./GlobalVars";
import levels from "./levels/Levels";

export default class Board {
	_gv: GlobalVars;

	// All level elements
	scenePart: number[][] = [[]];
	allElements: {
		borderWalls: BorderWall[],
		innerWalls: InnerWall[],
		dirt: Dirt[],
	}

	// part of scene displays border walls
	displaysWalls: {
		top: boolean,
		bottom: boolean,
		left: boolean,
		right: boolean,
	}

	level: number[][];

	public static playerMoved: boolean = false;

	constructor(gv: GlobalVars) {
		this._gv = gv;
		this.allElements = {
			borderWalls: [],
			innerWalls: [],
			dirt: [],
		}
		// this.level = levels[this._gv.currLevel];
		// console.log(this.level);

		this.displaysWalls = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		}


		// console.log(this.level1);

		this.setLevel(0);
		this.createCanvas();
		this.checkWalls();
		this.getPartOfScene();
		this.displayScene();
	}

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
		this._gv.currLevel = levelId;
		this.level = levels[this._gv.currLevel];
		this._gv.levelHeight = this.level.length;
		this._gv.levelWidth = this.level[0].length;
	}

	/**
	 * Gets the part of the scene to display
	 */
	getPartOfScene() {
		let partOfScene: number[][] = new Array(this._gv.fieldsPerHeight).fill(0).map(() => new Array(this._gv.fieldsPerWidth).fill("JD"));

		for (let y = 0; y < this._gv.fieldsPerHeight; y++) {
			for (let x = 0; x < this._gv.fieldsPerWidth; x++) {
				if (
					y + this._gv.displayY < this.level.length &&
					x + this._gv.displayX < this.level[0].length
				) {
					partOfScene[y][x] = this.level[y + this._gv.displayY][x + this._gv.displayX];
				}
			}
		}
		this.scenePart = partOfScene;
		// console.log(this.scenePart);
	}

	/**
	 * Checks if the sides of a level are displayed
	 */
	checkWalls() {
		this._gv.displayY == 0 ? this.displaysWalls.top = true : this.displaysWalls.top = false;
		this._gv.displayY + this._gv.fieldsPerHeight >= this.level.length - 1 ? this.displaysWalls.bottom = true : this.displaysWalls.bottom = false;
		this._gv.displayX == 0 ? this.displaysWalls.left = true : this.displaysWalls.left = false;
		this._gv.displayX + this._gv.fieldsPerWidth >= this.level[0].length - 1 ? this.displaysWalls.right = true : this.displaysWalls.right = false;
		console.log(this.displaysWalls);
		this.displayScene();
	}

	/** 
	 * Move the part of the scene in the given direction
	 */
	public static movePartOfScene(gv: GlobalVars, direction: string) {
		console.log(direction);
		switch (direction) {
			case "top":
				if (gv.displayY > 0) {
					gv.displayY--;
				} else {
					console.log("Can't move up", gv.displayY);
				}
				break;

			case "bottom":
				if (gv.displayY + gv.fieldsPerHeight <= gv.levelHeight - 1) {
					gv.displayY++;
				} else {
					console.log("Can't move down", gv.displayY);
				}
				break;

			case "left":
				if (gv.displayX > 0) {
					gv.displayX--;
				} else {
					console.log("Can't move left", gv.displayX);
				}
				break;

			case "right":
				if (gv.displayX + gv.fieldsPerWidth <= gv.levelWidth - 1) {
					gv.displayX++;
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
	 * Displays a part of the scene; Renders items represented by numbers in a level
	 */
	displayScene() {
		// Save a part of the scene to the variable
		for (let y: number = 0; y < this.scenePart.length; y++) {
			for (let x: number = 0; x < this.scenePart[0].length; x++) {
				let entityNumber: number = this.scenePart[y][x];
				// console.log(entityNumber);
				switch (entityNumber) {
					case 0: // Empty field
						// Do nothing
						break;
					case 1: // Border wall
						// find if el exists
						let borderFound: BorderWall[] = this.allElements.borderWalls.filter((el) => { return el.x == x && el.y == y });
						// console.log(borderFound);

						if (borderFound.length == 0) {
							this.allElements.borderWalls.push(new BorderWall(
								this._gv,
								"black",
								x * this._gv.fieldSize,
								y * this._gv.fieldSize,
							));
						} else {
							// Sth can break here tho
							console.log("border wall exists");
						}
						break;
					case 2: // Inner wall
						let innerFound: InnerWall[] = this.allElements.innerWalls.filter((el) => { return el.x == x && el.y == y });
						// console.log(innerFound);

						if (innerFound.length == 0) {
							this.allElements.innerWalls.push(new InnerWall(
								this._gv,
								"gray",
								x * this._gv.fieldSize,
								y * this._gv.fieldSize,
							));
						} else {
							console.log("Inner wall exists");
						}
						break;
					case 3: // 
						let dirtFound: InnerWall[] = this.allElements.dirt.filter((el) => { return el.x == x && el.y == y });

						if (dirtFound.length == 0) {
							this.allElements.dirt.push(new Dirt(
								this._gv,
								"brown",
								x * this._gv.fieldSize,
								y * this._gv.fieldSize,
							));
						} else {
							console.log("dirt exists");
						}

						break;
					case 4:

						break;

					default:
						console.log("Unknown entity type");
						break;
				}

			}
			// console.log(this.allElements);
		}
	}

	update() {
		// update all static elements on the board
		this.getPartOfScene();

		if (Board.playerMoved) {
			console.log("Player moved");
			this.displayScene();
			Board.playerMoved = false;
		}

		// Border walls
		for (let i: number = 0; i < this.allElements.borderWalls.length; i++) {
			this.allElements.borderWalls[i].update();
		}

		// Inner walls
		for (let i: number = 0; i < this.allElements.innerWalls.length; i++) {
			this.allElements.innerWalls[i].update();
		}

		// Dirt
		for (let i: number = 0; i < this.allElements.dirt.length; i++) {
			this.allElements.dirt[i].update();
		}

	}

}