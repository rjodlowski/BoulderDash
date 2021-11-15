import GlobalVars from "./GlobalVars";

export default class Board {
	_gv: GlobalVars;

	constructor(gv: GlobalVars) {
		console.log("Board created");
		this._gv = gv;


		this.create();
		// this.createSquares();
	}

	create() {
		let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
		canvas.width = this._gv.canvasWidth;
		canvas.height = this._gv.canvasHeight;
		this._gv.app.append(canvas);
		this._gv.canvas = canvas;
		this._gv.ctx = this._gv.canvas.getContext("2d");
	}

	// createSquares() {
	// 	for (let i: number = 0; i < 20; i++) {
	// 		for (let j: number = 0; j < 15; j++) {
	// 			this._gv.ctx.fillStyle = "rgba(0, 255, 0, 1)";
	// 			this._gv.ctx.fillRect(
	// 				i * this._gv.fieldHeight,
	// 				j * this._gv.fieldWidth,
	// 				this._gv.fieldHeight,
	// 				this._gv.fieldWidth
	// 			);
	// 		}
	// 	}
	// }

	animate() {

	}
}