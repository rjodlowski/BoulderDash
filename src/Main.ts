import Board from "./Board";
import GlobalVars from "./GlobalVars";
import Keyboard from "./Keyboard";
import Player from "./Player";
import Image from "./entities/IImage";
import Images from "./entities/Images";

export default class Main {
	_gv: GlobalVars
	_keyboard: Keyboard
	_board: Board
	_player: Player

	constructor() {
		this.loadGraphics(Images);
		setTimeout(() => {
			this._gv = new GlobalVars();
			this._board = new Board(this._gv);
			this._player = new Player(this._gv, this._gv.playerX, this._gv.playerY);
			this._keyboard = new Keyboard(this._gv, this._player);

			this.setAnimationIntervals();
			this.animate();
		}, 100);
	}

	loadGraphics(list: Image[]) {
		console.log("loading images");

		let total = 0;
		for (let i = 0; i < list.length; i++) {
			let img = new Image(40, 40);
			Images[i].image = img;
			img.onload = function () {
				total++;
				if (total == list.length) {
					console.log("Images loaded!");
				}
			};
			img.src = list[i].url;
		}
	}

	setAnimationIntervals() {
		this._gv.diamondPhaseInterval = setInterval(() => {
			if (this._gv.diamondPhase < 7) {
				this._gv.diamondPhase++;
			} else {
				this._gv.diamondPhase = 0;
			}
		}, 50)
		this._gv.fireflyPhaseInterval = setInterval(() => {
			if (this._gv.fireflyPhase < 7) {
				this._gv.fireflyPhase++;
			} else {
				this._gv.fireflyPhase = 0;
			}
		}, 35)
		this._gv.butterflyPhaseInterval = setInterval(() => {
			if (this._gv.butterflyPhase < 7) {
				this._gv.butterflyPhase++;
			} else {
				this._gv.butterflyPhase = 0;
			}
		}, 45)
		this._gv.amebaPhaseInterval = setInterval(() => {
			if (this._gv.amebaPhase < 7) {
				this._gv.amebaPhase++;
			} else {
				this._gv.amebaPhase = 0;
			}
		}, 40)
		this._gv.playerPhaseInterval = setInterval(() => {
			if (this._gv.playerPhase < 7) {
				this._gv.playerPhase++;
			} else {
				this._gv.playerPhase = 0;
			}
		}, 40)
	}

	animate() {
		if (this._gv.runRender) {
			this._gv.ctx.clearRect(0, 0, this._gv.canvas.width, this._gv.canvas.height)
			if (this._gv.playerAlive) {
				this._gv.ctx.fillStyle = "black";
				this._gv.ctx.fillRect(0, 0, this._gv.canvas.width, this._gv.canvas.height);

				this._board.update();
				this._player.update();

				requestAnimationFrame(this.animate.bind(this));
			}
		}
	}
}

new Main();