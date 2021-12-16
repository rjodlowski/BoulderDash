import Board from "../Board";
import GlobalVars from "../GlobalVars";
import Ameba from "./Ameba";
import BorderWall from "./BorderWall";
import Butterfly from "./Butterfly";
import Firefly from "./Firefly";
import levels from "../levels/Levels";

// Example object on the canvas, not the part of final project
export default class Entrance extends BorderWall {
	_board: Board;
	color: string = "magenta";

	mode: string;

	playerPassable: boolean = true;

	constructor(gv: GlobalVars, board: Board, x: number, y: number, mode: string) {
		super(gv, x, y)
		this._board = board;
		this.mode = mode;

		console.log("Entrance created, mode: ", this.mode);

		// TODO Mandatory move entrance
	}

	exit() {
		if (this.mode == "exit") {
			if (this._gv.exitOpen) {
				this.endGame();
			} else {
				console.log("Not yet open!");
				// TODO check open every diamond collect
			}
		}
	}

	async endGame() {
		console.log("Ending level");

		// Disable player movement
		this._gv.playerCanMove = false;

		this.stopAllEntities();
		await this.timeLeftToPoints();
		this.nextLevel();
	}

	stopAllEntities() {
		// Disable rock gravity
		let rocksAndDiamonds = this._gv.allDynamic.filter((el) => {
			return el.constructor.name == "Boulder" ||
				el.constructor.name == "Diamond"
		})
		if (rocksAndDiamonds.length > 0) {
			for (let i = 0; i < rocksAndDiamonds.length; i++) {
				clearInterval(rocksAndDiamonds[i].gravityInterval)
			}
		}

		// Disable Ai movement
		let fireAndButter = this._gv.allAI.filter((el) => {
			return el.constructor.name == "Firefly" ||
				el.constructor.name == "Butterfly"
		})
		console.log(fireAndButter);
		if (fireAndButter.length > 0) {
			for (let i = 0; i < fireAndButter.length; i++) {
				let item = fireAndButter[i]
				if (
					item instanceof Butterfly ||
					item instanceof Firefly
				) {
					clearInterval(item.movementInterval)
				}
			}
		}

		// Disable ameba growth
		let ameba = this._gv.allAI.filter((el) => {
			return el.constructor.name == "Ameba"
		})
		if (ameba.length > 0) {
			if (ameba[0] instanceof Ameba) {
				clearInterval(ameba[0].expandInterval)
			}
		}
	}

	async timeLeftToPoints() {
		clearInterval(this._board.timerUpdateInterval);
		let timeLeftStart = this._gv.timeLeft;
		for (let i = 0; i < timeLeftStart; i++) {
			await this.sleep(25);
			this._gv.timeLeft -= 1;
			this._gv.timeLeftDiv.innerText = `${this._gv.timeLeft}`;
			this._gv.score += this._gv.pointsPerSecondSaved;
			this._gv.scoreDiv.innerText = `${this._gv.score}`
		}
		await this.sleep(2000);
	}

	nextLevel() {
		this._gv.currLevelNumber += 1;
		if (this._gv.currLevelNumber < levels.length) {
			this.resetVariables();
			this._board.setLevel(this._gv.currLevelNumber);
			this._board.checkWalls();
			this._board.getPartOfScene();
			this._board.displayScene();
			// this._board.generateBoulders();
			this._gv.newLevel = true;
			this._board.startGame();
		} else {
			alert("No more levels");
			// TODO Game win screen
		}
	}

	resetVariables() {
		this._gv.allElements = [];
		this._gv.allDynamic = [];
		this._gv.allAI = [];
		this._gv.displayX = 0;
		this._gv.displayY = 0;
		this._gv.entrance = undefined;
		this._gv.exit = undefined;
		this._gv.newLevel = true;

		this._gv.timeLeft = this._gv.timePerLevel;
		this._gv.timeLeftDiv.innerText = `${this._gv.timeLeft}`;

		this._gv.diamondsCollected = 0;
		this._gv.diamondsCollectedDiv.innerText = `${this._gv.diamondsCollected}`
		this._gv.startGameEntranceFlicker = true;
		this._gv.startGamePlayerShown = false;
	}

	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	draw(relX: number, relY: number) {
		// if (this._gv.startGameEntranceFlicker) {
		this._gv.ctx.fillStyle = this.color;
		this._gv.ctx.fillRect(
			relX,
			relY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		)
		// }
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}