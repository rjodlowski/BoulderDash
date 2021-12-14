import GlobalVars from "../GlobalVars";
import Firefly from "./Firefly";


export default class Butterfly extends Firefly {
	playerPassable: boolean = true;

	color: string = "blue";

	constructor(gv: GlobalVars, x: number, y: number) {
		super(gv, x, y);

		console.log("Butterfly created!");
	}
}