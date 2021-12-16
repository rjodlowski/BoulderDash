import GlobalVars from "./GlobalVars";
import Player from "./Player";

export default class Keyboard {
	_gv: GlobalVars;
	_player: Player;

	constructor(gv: GlobalVars, player: Player) {
		this._gv = gv;
		this._player = player;

		window.onkeydown = this.keyPressed.bind(this);
	}

	keyPressed(event: KeyboardEvent) {
		if (this._gv.playerCanMove) {
			let key: string = event.key
			// console.log(key);

			// Move player
			if (event.repeat != true) {
				if (key == "a" || key == "ArrowLeft") {
					this._player.move("left")
				} else if (key == "d" || key == "ArrowRight") {
					this._player.move("right")
				} else if (key == "w" || key == "ArrowUp") {
					this._player.move("up")
				} else if (key == "s" || key == "ArrowDown") {
					this._player.move("down")
				} else if (key == " ") {
					this._gv.runRender = !this._gv.runRender;
				}
			}
		}
	}
}