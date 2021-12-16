import Ameba from "./entities/Ameba";
import BorderWall from "./entities/BorderWall";
import Boulder from "./entities/Boulder";
import Butterfly from "./entities/Butterfly";
import Diamond from "./entities/Diamond";
import Dirt from "./entities/Dirt";
import Entrance from "./entities/Entrance";
import Firefly from "./entities/Firefly";
import InnerWall from "./entities/InnerWall";
import SmolAmeba from "./entities/SmolAmeba";

export default class GlobalVars {
	// Canvas variables
	app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	statsDiv: HTMLDivElement;
	levelNumberDiv: HTMLDivElement;
	diamondsCollectedDiv: HTMLDivElement;
	diamondsToCollectDiv: HTMLDivElement;
	timeLeftDiv: HTMLDivElement;
	scoreDiv: HTMLDivElement;

	runRender: boolean = true; // Determines if the main board render function should be ran
	fieldSize: number = 40; // [px] - Fields are squares, so both sides are even
	fieldsPerWidth: number = 24;
	fieldsPerHeight: number = 16;
	canvasWidth: number = this.fieldsPerWidth * this.fieldSize; // Canvas height in pixels
	canvasHeight: number = this.fieldsPerHeight * this.fieldSize; // Canvas width in pixels	
	currentScore: number = 0;

	// Game variables
	currLevelNumber: number = 0; // Mumber of the current level
	levelWidth: number; // Width of a level in fields
	levelHeight: number;
	currLevel: number[][] = [[]]; // Current level
	scenePart: number[][] = [[]] // Shown part of the level
	gravityIntervalTime: number = 250;
	// gravityIntervalTime: number = 1000;
	amebaLimit: number = 10; // Max ameba size in order to change into diamonds
	smolAmebaCount: number = 0;
	startTime: number;
	endTime: number;
	timePerLevel: number = 150;
	timeLeft: number = this.timePerLevel;
	diamondsCollected: number = 0;
	diamondsToCollectNumber: number = 69;
	pointsPerDiamondCollected: number = 10;
	pointsPerSecondSaved: number = 10;
	score: number = 1000;
	newLevel: boolean = false;
	exitOpen: boolean = false;

	// Board display variables
	displayX: number = 0; // x of the top left field of a displayed background
	displayY: number = 0; // y

	// Player variables
	innerBorder: number = 3; // fields limiting the inner area of player movement
	playerX: number;
	playerY: number;
	playerAlive: boolean = true;
	startGamePlayerShown: boolean = false;
	startGameEntranceFlicker: boolean = true;
	playerCanMove: boolean = false;

	// All elements on the board
	allElements: Array<
		BorderWall |
		Dirt |
		InnerWall
	> = []
	allDynamic: Array<
		Boulder |
		Diamond
	> = []
	allAI: Array<
		Firefly |
		Butterfly |
		Ameba |
		SmolAmeba
	> = []

	entrance: Entrance;
	exit: Entrance;
}