import Board from "./Board";
import Boulder from "./entities/Boulder";
import Butterfly from "./entities/Butterfly";
import Diamond from "./entities/Diamond";
import Firefly from "./entities/Firefly";
import Images from "./entities/Images";
import GlobalVars from "./GlobalVars";

export default class Player {
	_gv: GlobalVars;

	// Player model
	width: number;
	height: number;

	// Relative positions -> [px]
	relX: number;
	relY: number;

	// Absolute positions
	absX: number;
	absY: number;

	color: string = "red";

	playerPassable: boolean = true;
	entityPassable: boolean = true;
	groundShifted: boolean = false;

	public static alive: boolean = false;

	imagePlayer: HTMLImageElement;
	playerPhaseSX: number[] = [0, 24, 48, 72, 96, 120, 144, 168];
	playerPhaseSY: number[] = [24, 96, 120];

	constructor(gv: GlobalVars, startX: number, startY: number) {
		this._gv = gv;

		// Player model dimensions
		this.width = this._gv.fieldSize;
		this.height = this._gv.fieldSize;

		this.absX = startX;
		this.absY = startY;

		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		this.getImage();
		this.draw(this.relX, this.relY);

	}

	getImage() {
		this.imagePlayer = Images.filter((el) => { return el.name == "rockford" })[0].image
	}

	/**
	 * Draw the player using relative positions [px]
	 * @param relX
	 * @param relY
	 */
	draw(relX: number, relY: number) {
		if (this._gv.newLevel) {
			console.log("haha zmieniam se");

			this.absX = this._gv.playerX;
			this.absY = this._gv.playerY;
			this.relX = this.absX * this._gv.fieldSize;
			this.relY = this.absY * this._gv.fieldSize;

			this._gv.newLevel = false;
		} else {
			if (this._gv.startGamePlayerShown) {
				if (this._gv.playerAlive) {
					this._gv.ctx.drawImage(
						this.imagePlayer,
						this.playerPhaseSX[this._gv.playerPhase], this.playerPhaseSY[this._gv.playerDirection],
						16, 16,
						relX, relY,
						this._gv.fieldSize, this._gv.fieldSize,
					);
				}
			}
		}
	}

	/**
	 * Checks if a plater can move in the specified direction
	 * @param direction up | down | left | right
	 */
	canMove(direction: string): boolean {
		switch (direction) {
			case "up":
				let elUp = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY - this._gv.fieldSize })
				if (elUp.length > 0) {
					if (!elUp[0].playerPassable) {
						return false;
					}
				}
				let elUpDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX && el.relY == this.relY - this._gv.fieldSize })
				if (elUpDyn.length > 0) {
					if (!elUpDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "down":
				let elDown = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize })
				if (elDown.length > 0) {
					if (!elDown[0].playerPassable) {
						return false;
					}
				}
				let elDownDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX && el.relY == this.relY + this._gv.fieldSize })
				if (elDownDyn.length > 0) {
					if (!elDownDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "left":
				let elLeft = this._gv.allElements.filter((el) => { return el.relX == this.relX - this._gv.fieldSize && el.relY == this.relY })
				if (elLeft.length > 0) {
					if (!elLeft[0].playerPassable) {
						return false;
					}
				}
				let elLeftDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX - this._gv.fieldSize && el.relY == this.relY })
				if (elLeftDyn.length > 0) {
					if (!elLeftDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			case "right":
				let elRight = this._gv.allElements.filter((el) => { return el.relX == this.relX + this._gv.fieldSize && el.relY == this.relY })
				if (elRight.length > 0) {
					if (!elRight[0].playerPassable) {
						return false;
					}
				}
				let elRightDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX + this._gv.fieldSize && el.relY == this.relY })
				if (elRightDyn.length > 0) {
					if (!elRightDyn[0].playerPassable) {
						return false;
					}
				}
				break;
			default:
				console.log("Unknown direction");
				break;
		}
		return true;
	}

	/**
	 * Moves the player
	 * @param direction up | down | left | right 
	 */
	move(direction: string) {
		// Update player's position if it was moved alongside the board
		this.absX = this._gv.playerX;
		this.absY = this._gv.playerY;

		Board.playerMoved = true;

		switch (direction) {
			case 'up':
				let upperBorderPx = this._gv.fieldSize * this._gv.innerBorder
				let minDisplayY = 0
				let distanceFromTop = this.relY

				if (this.relY > upperBorderPx || this._gv.displayY == minDisplayY && distanceFromTop <= upperBorderPx) {
					if (this.canMove(direction)) {
						this.relY -= this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY - 1][this.absX] = 9;
						this.absY--
						this._gv.playerY = this.absY;
					}
				} else {
					if (this.canMove(direction)) {
						console.log("Shift border top");
						Board.movePartOfScene(this._gv, "top")
						this.groundShifted = true;
					}
				}
				break;
			case 'down':
				let lowerBorderPx = this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromBottom = this._gv.canvasHeight - (this._gv.canvasHeight - this.relY)
				let maxDisplayY = this._gv.levelHeight - this._gv.fieldsPerHeight

				if (this.relY < lowerBorderPx || this._gv.displayY == maxDisplayY && distanceFromBottom >= lowerBorderPx) {
					if (this.canMove(direction)) {
						this.relY += this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY + 1][this.absX] = 9;
						this.absY++
						this._gv.playerY = this.absY;
					}
				} else {
					if (this.canMove(direction)) {
						console.log("Shift border bottom");
						Board.movePartOfScene(this._gv, "bottom")
						this.groundShifted = true;
					}
				}

				// this._gv.playerDirection = 0;
				break;
			case 'left':
				let leftBorderPx = this._gv.fieldSize * this._gv.innerBorder
				let minDisplayX = 0;
				let distanceFromLeft = this.relX;

				this.checkIfMovesSth(direction);

				if (this.relX > leftBorderPx || this._gv.displayX == minDisplayX && distanceFromLeft <= leftBorderPx) {
					if (this.canMove(direction)) {
						this.relX -= this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX - 1] = 9;
						this.absX--
						this._gv.playerX = this.absX;
					}
				} else {
					if (this.canMove(direction)) {
						console.log("Shift border left");
						Board.movePartOfScene(this._gv, "left")
						this.groundShifted = true;
					}
				}

				this._gv.playerDirection = 1;
				break;
			case 'right':
				let rightBorderPx = this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)
				let distanceFromRight = this._gv.canvasWidth - (this._gv.canvasWidth - this.relX);
				let maxDisplayX = this._gv.levelWidth - this._gv.fieldsPerWidth;

				this.checkIfMovesSth(direction)

				if (this.relX < rightBorderPx || this._gv.displayX == maxDisplayX && distanceFromRight >= rightBorderPx) {
					if (this.canMove(direction)) {
						this.relX += this._gv.fieldSize;
						this._gv.currLevel[this.absY][this.absX] = 0;
						this._gv.currLevel[this.absY][this.absX + 1] = 9;
						this.absX++
						this._gv.playerX = this.absX;
					}
				} else {
					if (this.canMove(direction)) {
						console.log("Shift border right");
						Board.movePartOfScene(this._gv, "right")
						this.groundShifted = true;
					}
				}

				this._gv.playerDirection = 2;
				break;
			default:
				console.log("Unknown direction");
		}
		this.checkIfWalkedOnSth();
		// console.table(this._gv.currLevel)
	}

	/**
	 * Updates player's position in the current level when the board moves
	 * @param direction top | bottom | left | right
	 */
	public static movePlayerWithBoard(gv: GlobalVars, direction: string) {
		switch (direction) {
			case "top":
				gv.currLevel[gv.playerY][gv.playerX] = 0;
				gv.currLevel[gv.playerY - 1][gv.playerX] = 9;
				gv.playerY--;
				break;
			case "bottom":
				gv.currLevel[gv.playerY][gv.playerX] = 0;
				gv.currLevel[gv.playerY + 1][gv.playerX] = 9;
				gv.playerY++;
				break;
			case "left":
				gv.currLevel[gv.playerY][gv.playerX] = 0;
				gv.currLevel[gv.playerY][gv.playerX - 1] = 9;
				gv.playerX--;
				break;
			case "right":
				gv.currLevel[gv.playerY][gv.playerX] = 0;
				gv.currLevel[gv.playerY][gv.playerX + 1] = 9;
				gv.playerX++;
				break;
		}
	}

	/**
	 * Checks if player walked on sth (e.g. diamond, dirt)
	 */
	checkIfWalkedOnSth() {
		let found = this._gv.allElements.filter((el) => { return el.relX == this.relX && el.relY == this.relY })
		if (found.length > 0) {
			let index = this._gv.allElements.indexOf(found[0])
			Board.removeEl(
				this._gv,
				index,
				found[0].relX / this._gv.fieldSize,
				found[0].relY / this._gv.fieldSize,
			)
		} else {
			let foundDyn = this._gv.allDynamic.filter((el) => { return el.relX == this.relX && el.relY == this.relY })
			if (foundDyn.length > 0) {
				let name = foundDyn[0].constructor.name
				if (name == "Diamond") {
					Player.collectDiamond(this._gv, foundDyn[0]);
				}
			} else {
				let foundAI = this._gv.allAI.filter((el) => {
					return el.relX == this.relX && el.relY == this.relY
				})
				if (foundAI.length > 0) {
					if (foundAI[0].constructor.name == "Firefly") {
						Player.die(this._gv, "fireflied")
					}
				} else {
					if (this.absX == this._gv.exit.absX && this.absY == this._gv.exit.absY) {
						this._gv.exit.exit();
					}
				}
			}
		}
	}

	/**
	 * Moves a boulder or a diamond if it's able to 
	 * @param side left | right
	 */
	checkIfMovesSth(side: string) {
		// console.log("checkIfMovesSth: ", side);

		switch (side) {
			case "left":
				let entityLeft = this._gv.allDynamic.filter((el) => {
					return el.absY == this.absY &&
						el.absX == this.absX - 1 &&
						(
							el.constructor.name == "Boulder" ||
							el.constructor.name == "Diamond"
						)
				})
				if (entityLeft.length > 0) {
					let name = entityLeft[0].constructor.name
					if (name == "Boulder") {
						if (!entityLeft[0].falling) {
							// console.log("Boulder / diamond moved:", side);
							entityLeft[0].moveByPlayer(side)
						}
					} else if (name == "Diamond") {
						// console.log("Walked on a diamond");
					} else {
						console.log("Different obj");
					}
				}
				break;

			case "right":
				let entityRight = this._gv.allDynamic.filter((el) => {
					return el.absY == this.absY &&
						el.absX == this.absX + 1 &&
						(
							el.constructor.name == "Boulder" ||
							el.constructor.name == "Diamond"
						)
				})
				if (entityRight.length > 0) {
					let name = entityRight[0].constructor.name
					// console.log(name);

					if (name == "Boulder") {
						// console.log("Boulder / diamond moved:", side);
						entityRight[0].moveByPlayer(side)
					} else if (name == "Diamond") {
						// console.log("Walked on a diamond");
					} else {
						console.log("Different obj");
					}
				}
				break;
		}
	}

	/**
	 * Collects diamond, that was walked on 
	 * @param diamond to be collected
	 */
	public static collectDiamond(gv: GlobalVars, diamond: Boulder | Diamond) {
		// console.log("Player collected a diamond!");
		if (diamond instanceof Diamond) {
			diamond.collect();
		}
		// gv.diamondsCollected += 1;
		gv.diamondsCollectedDiv.innerText = `${gv.diamondsCollected[gv.currLevelNumber]}`;
	}

	/**
	 * Handles player death event
	 * @param reason event, that got the player killed
	 */
	public static die(gv: GlobalVars, reason: string) {
		console.log(`Player died! Reason: ${reason}`);
		// change gv value
		gv.playerAlive = false;
		// change Player type value
		Player.alive = false;
		// Stop gravity interval
		let boulders: Boulder[] = gv.allDynamic.filter((el) => { return el.constructor.name == "Boulder" })
		for (let boulder of boulders) {
			clearInterval(boulder.gravityInterval)
		}
		// Stop AI moving 
		for (let ai of gv.allAI) {
			if (ai instanceof Firefly || ai instanceof Butterfly) {
				clearInterval(ai.movementInterval);
			}
		}
		// Show end game picture
		setTimeout(() => {
			// Background
			gv.ctx.fillStyle = "black";
			gv.ctx.fillRect(0, 0, gv.canvas.width, gv.canvas.height);

			// Text
			gv.ctx.font = "48px serif";
			gv.ctx.fillStyle = "red";
			gv.ctx.fillText(`Ded becose: ${reason}`, 100, 100);

			// Image
			let img = new Image()
			img.src = "../assets/graphics/death_screen_2.jpg";
			img.onload = function () {
				gv.ctx.drawImage(img,
					(gv.canvasWidth - 544) / 2,
					(gv.canvas.height - 339) / 2,
				)
			}
		}, 100);

	}

	public static win(gv: GlobalVars) {
		gv.playerAlive = false;
		// change Player type value
		Player.alive = false;

		// Stop movement on the board
		let boulders: Boulder[] = gv.allDynamic.filter((el) => { return el.constructor.name == "Boulder" })
		for (let boulder of boulders) {
			clearInterval(boulder.gravityInterval)
		}
		for (let ai of gv.allAI) {
			if (ai instanceof Firefly || ai instanceof Butterfly) {
				clearInterval(ai.movementInterval);
			}
		}

		setTimeout(() => {
			// Background
			gv.ctx.fillStyle = "black";
			gv.ctx.fillRect(0, 0, gv.canvas.width, gv.canvas.height);

			// Text
			gv.ctx.font = "48px font123";
			gv.ctx.fillStyle = "red";
			gv.ctx.fillText(`You win! Your score: ${gv.score}`, 100, 100);

			// Image
			let img = new Image()
			img.src = "../assets/graphics/win_screen.jpg";
			img.onload = function () {
				gv.ctx.drawImage(img,
					(gv.canvasWidth - 265) / 2,
					(gv.canvas.height - 257) / 2,
				)
			}
		}, 100);

	}

	update() {
		this.draw(this.relX, this.relY);

		// Handles the ground shifting exception
		if (this.groundShifted) {
			this.checkIfWalkedOnSth();
			this.groundShifted = false;
		}
	}
}