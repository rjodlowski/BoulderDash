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
		this._gv = new GlobalVars();
		this._board = new Board(this._gv);
		this._player = new Player(this._gv, "red", 120, 120);
		this._keyboard = new Keyboard(this._gv, this._player);
		// this._canvasTest = new CanvasTest();

		this.animate();
	}

	animate() {
		this._gv.ctx.clearRect(0, 0, this._gv.canvas.width, this._gv.canvas.height)

		this._board.update();
		this._player.update();

		requestAnimationFrame(this.animate.bind(this));
	}
}

new Main();