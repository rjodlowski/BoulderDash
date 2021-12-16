import GlobalVars from "../GlobalVars";
import Images from "./Images";

// Example object on the canvas, not the part of final project
export default class InnerWall {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;
	// Absolute position
	absX: number // level coord
	absY: number // level coord

	color: string = "gray";

	playerPassable: boolean = false;
	entityPassable: boolean = false;

	imageToDraw: HTMLImageElement;

	constructor(gv: GlobalVars, x: number, y: number,) {
		this._gv = gv;

		this.absX = x;
		this.absY = y;

		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		this.getImage();
		this.draw(this.relX, this.relY);
	}

	getImage() {
		this.imageToDraw = Images.filter((el) => { return el.name == "innerWall" })[0].image
	}

	draw(relX: number, relY: number) {
		this._gv.ctx.drawImage(
			this.imageToDraw,
			relX,
			relY,
			this._gv.fieldSize,
			this._gv.fieldSize,
		);
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}