import BorderWall from "./entities/BorderWall";
import Boulder from "./entities/Boulder";
import Dirt from "./entities/Dirt";
import InnerWall from "./entities/InnerWall";

export default class GlobalVars {
	// HTML elements
	app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	runRender: boolean = true; // Determines if the main board render function should be ran

	currLevelNumber: number = 0; // Mumber of the current level
	currLevel: number[][] = [[]]; // Current level
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
	innerBorder: number = 3; // fields limiting the inner area of player movement
	playerX: number;
	playerY: number;
	playerAlive: boolean = true;

	scenePart: number[][] = [[]]
	// All static elements on the board
	allElements: Array<
		BorderWall |
		Dirt |
		InnerWall
	> = []

	allDynamic: Array<
		Boulder
	> = []
}