import GlobalVars from "../GlobalVars";
import IImage from "./IImage";
import Images from "./Images";

// Example object on the canvas, not the part of final project
export default class BorderWall {
	_gv: GlobalVars;

	// Relative positions -> [px]
	relX: number;
	relY: number;
	// Absolute positions
	absX: number // level coord
	absY: number // level coord

	color: string = "black";

	playerPassable: boolean = false;
	entityPassable: boolean = false;

	imageBorderWall: HTMLImageElement;
	imageExit: HTMLImageElement;

	constructor(gv: GlobalVars, x: number, y: number,) {
		this._gv = gv;

		this.absX = x;
		this.absY = y;
		this.relX = this.absX * this._gv.fieldSize;
		this.relY = this.absY * this._gv.fieldSize;

		this.getImage()
		this.draw(this.relX, this.relY);
	}

	getImage() {
		this.imageBorderWall = Images.filter((el) => { return el.name == "borderWall" })[0].image
		this.imageExit = Images.filter((el) => { return el.name == "door" })[0].image
	}

	draw(relX: number, relY: number) {
		if (this.constructor.name == "BorderWall") {
			this._gv.ctx.drawImage(
				this.imageBorderWall,
				relX,
				relY,
				this._gv.fieldSize,
				this._gv.fieldSize,
			);
		} else {
			if (this._gv.exitOpen) {
				this._gv.ctx.drawImage(
					this.imageExit,
					relX,
					relY,
					this._gv.fieldSize,
					this._gv.fieldSize,
				);
			} else {
				this._gv.ctx.drawImage(
					this.imageBorderWall,
					relX,
					relY,
					this._gv.fieldSize,
					this._gv.fieldSize,
				);
			}
		}
	}

	update() {
		this.draw(this.relX, this.relY);
	}
}