import GlobalVars from "./GlobalVars";
import levels from "./levels/Levels";
import Player from "./Player";
import BorderWall from "./entities/BorderWall";
import InnerWall from "./entities/InnerWall";
import Dirt from "./entities/Dirt";
import Butterfly from "./entities/Butterfly";
import Firefly from "./entities/Firefly";
import Boulder from "./entities/Boulder";
import Diamond from "./entities/Diamond";
import Ameba from "./entities/Ameba";
import Entrance from "./entities/Entrance";

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

	timerUpdateInterval: NodeJS.Timer;

	constructor(gv: GlobalVars) {
		this._gv = gv;

		this.displaysWalls = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		}

		// image loading


		// Game stuff
		this.createStats();
		this.setLevel(this._gv.currLevelNumber);
		this.createCanvas();
		this.checkWalls();
		this.getPartOfScene();
		this.displayScene();
		this.generateBoulders();

		this.startGame();
	}

	createStats() {
		this._gv.statsDiv = document.createElement("div") as HTMLDivElement;
		this._gv.levelNumberDiv = document.createElement("div") as HTMLDivElement;
		this._gv.diamondsCollectedDiv = document.createElement("div") as HTMLDivElement;
		this._gv.diamondsToCollectDiv = document.createElement("div") as HTMLDivElement;
		this._gv.timeLeftDiv = document.createElement("div") as HTMLDivElement;
		this._gv.scoreDiv = document.createElement("div") as HTMLDivElement;

		this._gv.statsDiv.id = "statsDiv";
		this._gv.levelNumberDiv.id = "levelNumber";
		this._gv.diamondsCollectedDiv.id = "diamondsCollected";
		this._gv.diamondsToCollectDiv.id = "diamondsToCollect";
		this._gv.timeLeftDiv.id = "timeLeft";
		this._gv.scoreDiv.id = "score";

		this._gv.statsDiv.style.width = `${this._gv.canvasWidth}px`;

		this._gv.levelNumberDiv.innerText = `${this._gv.currLevelNumber + 1}`;
		this._gv.diamondsCollectedDiv.innerText = `${this._gv.diamondsCollected}`;
		this._gv.diamondsToCollectDiv.innerText = `${this._gv.diamondsToCollectNumber}`;
		this._gv.timeLeftDiv.innerText = `${this._gv.timeLeft}`;
		this._gv.scoreDiv.innerText = `${this._gv.score}`;

		this._gv.statsDiv.appendChild(this._gv.levelNumberDiv)
		this._gv.statsDiv.appendChild(this._gv.diamondsCollectedDiv)
		this._gv.statsDiv.appendChild(this._gv.diamondsToCollectDiv)
		this._gv.statsDiv.appendChild(this._gv.timeLeftDiv)
		this._gv.statsDiv.appendChild(this._gv.scoreDiv)

		this._gv.app.appendChild(this._gv.statsDiv);
	}

	async startGame() {
		// await this.sleep(3000)
		for (let i = 0; i < 31; i++) {
			this._gv.startGameEntranceFlicker = !this._gv.startGameEntranceFlicker;
			await this.sleep(150);
		}
		this._gv.startGamePlayerShown = true;
		this._gv.playerCanMove = true;

		let ameba = this._gv.allAI.filter((el) => { return el.constructor.name == "Ameba" });
		if (ameba.length > 0) {
			ameba[0] instanceof Ameba ? ameba[0].expand() : null;
		}

		let firefliesNButterflies = this._gv.allAI.filter((el) => {
			return el.constructor.name == "Firefly" ||
				el.constructor.name == "Butterfly"
		})
		if (firefliesNButterflies.length > 0) {
			for (let ai of firefliesNButterflies) {
				if (ai instanceof Firefly || ai instanceof Butterfly)
					ai.startMoving();
			}
		}

		this.setLevelTimer()

	}

	setLevelTimer() {
		this._gv.startTime = new Date().getTime();
		this._gv.endTime = this._gv.startTime + (this._gv.timePerLevel * 1000);
		this.timerUpdateInterval = setInterval(() => {
			this._gv.timeLeft = Math.floor((this._gv.endTime - new Date().getTime()) / 1000);

			this._gv.timeLeftDiv.innerText = `${this._gv.timeLeft}`;

			if (this._gv.timeLeft <= 0) {
				Player.die(this._gv, "timed out");
				clearInterval(this.timerUpdateInterval);
			}
		}, 500)
	}

	sleep(ms: number): Promise<unknown> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	updateGameStats() {

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
		this._gv.ctx.fillStyle = "black";
		this._gv.ctx.fillRect(0, 0, canvas.width, canvas.height);
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
		this._gv.levelNumberDiv.innerText = `${this._gv.currLevelNumber + 1}`;
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
					Player.movePlayerWithBoard(gv, "top");

				} else {
					console.log("Can't move up", gv.displayY);
				}
				break;

			case "bottom":
				if (gv.displayY + gv.fieldsPerHeight <= gv.levelHeight - 1) {
					gv.displayY++;
					Board.moveDynamicMandatory(gv, "bottom");
					Board.moveStaticMandatory(gv, "bottom")
					Player.movePlayerWithBoard(gv, "bottom");

				} else {
					console.log("Can't move down", gv.displayY);
				}
				break;

			case "left":
				if (gv.displayX > 0) {
					gv.displayX--;
					Board.moveDynamicMandatory(gv, "left");
					Board.moveStaticMandatory(gv, "left")
					Player.movePlayerWithBoard(gv, "left");

				} else {
					console.log("Can't move left", gv.displayX);
				}
				break;

			case "right":
				if (gv.displayX + gv.fieldsPerWidth <= gv.levelWidth - 1) {
					gv.displayX++;
					Board.moveDynamicMandatory(gv, "right");
					Board.moveStaticMandatory(gv, "right")
					Player.movePlayerWithBoard(gv, "right");

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

		for (let dynamic of gv.allDynamic) {
			dynamic.mandatoryMove(direction)
		}
		for (let ai of gv.allAI) {
			if (!(ai instanceof Ameba)) {
				ai.mandatoryMove(direction)
			}
		}
		gv.exit.mandatoryMove(direction);
	}

	/**
	 * Moves static elements of the gameboard
	 * @param direction top | bottom | left | right
	 */
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
					case 4: // Boulder 
						break;
					case 5: // Diamond 
						break;
					case 6: // Firefly 
						break;
					case 7: // Butterfly 
						break;
					case 8: // Ameba 
						break;

					case 9: // Player
						// console.log(`Creating player: x:${x}, y:${y}`);
						this._gv.entrance = new Entrance(this._gv, this, x, y, "start");
						this._gv.playerX = x;
						this._gv.playerY = y;
						break;

					case 10:
						this._gv.exit = new Entrance(this._gv, this, x, y, "exit");
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
						new Boulder(this._gv, x, y)
					)
				} else if (this._gv.currLevel[y][x] == 5) {
					this._gv.allDynamic.push(
						new Diamond(this._gv, x, y)
					)
				} else if (this._gv.currLevel[y][x] == 6) {
					this._gv.allAI.push(
						new Firefly(this._gv, x, y)
					)
				} else if (this._gv.currLevel[y][x] == 7) {
					this._gv.allAI.push(
						new Butterfly(this._gv, x, y)
					)
				} else if (this._gv.currLevel[y][x] == 8) {
					this._gv.allAI.push(
						new Ameba(this._gv, x, y)
					)
				}
			}
		}
		// this.enableGravity();
	}

	/**
	 * Switches gravity on for each boulder and diamond
	 */
	// enableGravity() {
	// 	let boulders: Boulder[] = this._gv.allDynamic.filter((el) => { return el.constructor.name == "Boulder" })
	// 	for (let boulder of boulders) {
	// 		boulder.fall();
	// 	}

	// 	let diamonds: Diamond[] = this._gv.allDynamic.filter((el) => { return el.constructor.name == "Diamond" })
	// 	for (let diamond of diamonds) {
	// 		diamond.fall();
	// 	}
	// }

	/**
	 * Removes a static element from the game 
	 * @param index of the static element
	 * @param x relative of removed element
	 * @param y relative of removed element
	 */
	public static removeEl(gv: GlobalVars, index: number, x: number, y: number) {
		// Remove from allElements
		gv.allElements.splice(index, 1);

		// Remove from level
		gv.currLevel[gv.displayY + y][gv.displayX + x] = 0
	}

	update() {
		if (this._gv.startGameEntranceFlicker) {
			this._gv.entrance.update();
		}
		this._gv.exit.update();

		// update all static elements on the board
		if (Board.playerMoved) {
			this.getPartOfScene();
			Board.playerMoved = false;
		}

		// Update allElements on board
		for (let element of this._gv.allElements) {
			element.update();
		}

		// Update all dynamic elements
		for (let dynamic of this._gv.allDynamic) {
			dynamic.update();
		}

		// Update all AI elements
		for (let ai of this._gv.allAI) {
			if (!(ai instanceof Ameba)) {
				ai.update();
			}
		}
	}
}