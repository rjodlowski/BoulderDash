import Board from "./Board";
import CanvasTest from "./CanvasTest";
import GlobalVars from "./GlobalVars";
import Keyboard from "./Keyboard";
import Player from "./Player";

export default class Main {
	_gv: GlobalVars
	_keyboard: Keyboard
	_board: Board
	_player: Player
	_canvasTest: CanvasTest // to delete

	constructor() {
		console.log("Main created");

		this._gv = new GlobalVars();
		this._board = new Board(this._gv);
		this._player = new Player(this._gv, 80, 80);
		this._keyboard = new Keyboard(this._gv, this._player);
		// this._canvasTest = new CanvasTest();

		this.animate();
	}

	animate() {
		// console.log("new frame");
		this._gv.ctx.clearRect(0, 0, this._gv.canvas.width, this._gv.canvas.height)

		this._player.update();
		requestAnimationFrame(this.animate.bind(this));
	}
}

new Main();