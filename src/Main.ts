import Board from "./Board";
import GlobalVars from "./GlobalVars";
import Keyboard from "./Keyboard";
import Player from "./Player";

export default class Main {
	_gv: GlobalVars
	_keyboard: Keyboard
	_board: Board
	_player: Player

	constructor() {
		console.log("Main created");

		this._gv = new GlobalVars();
		this._keyboard = new Keyboard(this._gv);
		this._board = new Board(this._gv);
		this._player = new Player(this._gv);

		this.createEverything();
	}

	createEverything() {
		console.log("creating stuff");
	}
}

new Main();