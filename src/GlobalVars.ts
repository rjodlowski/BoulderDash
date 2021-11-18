export default class GlobalVars {
	// HTML elements
	app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	currLevel: number = 0; //number of the current level;
	levelWidth: number; // Width of a level in fields
	levelHeight: number;

	// Canvas variables
	fieldSize: number = 40; // [px] - Fields are squares, so both sides are even
	fieldsPerWidth: number = 24;
	fieldsPerHeight: number = 16;
	canvasWidth: number = this.fieldsPerWidth * this.fieldSize; // Canvas height in pixels
	canvasHeight: number = this.fieldsPerHeight * this.fieldSize; // Canvas width in pixels	

	// Board display variables
	displayX: number = 0; // x of the top left field of a displayed background
	displayY: number = 0; // y

	// Player variables
	innerBorder: number = 2; // fields limiting the inner area of player movement
}