export default class GlobalVars {
	// HTML elements
	app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	// Fields are squares, so both sides are even
	fieldSize: number = 40; // [px]

	// Canvas variables
	canvasWidth: number = 800; // Canvas height in pixels
	canvasHeight: number = 600; // Canvas width in pixels	
	canvasWidthFields: number = this.canvasWidth / this.fieldSize;
	canvasHeightFields: number = this.canvasHeight / this.fieldSize;

	// Board display variables
	displayX: number = 0; // x of the top left field of a displayed background
	displayY: number = 0; // y

	// Player variables
	innerBorder: number = 2; // fields limiting the inner area of player movement


	constructor() {
		console.log("global vars created");
	}
}