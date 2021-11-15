export default class GlobalVars {
	// HTML elements
	app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
	canvas: HTMLCanvasElement;

	// Canvas variables
	canvasWidth: number = 800; // Canvas height in pixels
	canvasHeight: number = 600; // Canvas width in pixels	
	ctx: CanvasRenderingContext2D;

	// Fields are squares, so both sides are even
	fieldSize: number = 40; // [px]

	constructor() {
		console.log("global vars created");
	}
}