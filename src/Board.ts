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

	level: number[][];

	constructor(gv: GlobalVars) {
		this._gv = gv;
		this.allElements = {
			borderWalls: [],
			innerWalls: [],
			dirt: [],
		}
		this.level = levels[this._gv.currLevel];

		// console.log(this.level1);

		this.createCanvas();
		this.getPartOfScene();
		this.displayScene();
		// this.createOuterWalls();
	}

	createCanvas() {
		let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
		canvas.width = this._gv.canvasWidth;
		canvas.height = this._gv.canvasHeight;
		this._gv.app.append(canvas);
		this._gv.canvas = canvas;
		this._gv.ctx = this._gv.canvas.getContext("2d");
	}

	// Gets the part of the scene to display
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

	// Move the part of the scene in the given direction
	movePartOfScene(direction: string) {

	}

	/**
	 * Displays a part of the scene
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