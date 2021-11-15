// Main canvas learning file, not part of the final project
import Circle from "./entities/Circle";

export default class CanvasTest {
	app: HTMLDivElement;
	canvas: HTMLCanvasElement;
	circles: Circle[];

	constructor() {
		console.log("Canvas test created");

		this.app = document.getElementById("app") as HTMLDivElement;

		this.canvas = document.createElement("canvas") as HTMLCanvasElement;
		this.canvas.id = "main";
		this.canvas.width = 700
		this.canvas.height = 500
		this.circles = [];
		this.app.append(this.canvas);

		// Adjusting the canvas after resizing the window
		// window.addEventListener("resize", this.resize);

		this.create2();
	}

	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	create() {
		let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
		canvas.id = "main";
		canvas.width = 700
		canvas.height = 500

		let c = canvas.getContext("2d");
		c.fillStyle = "rgba(255, 0, 0, 0.5)";
		c.fillRect(100, 100, 100, 100); 1
		c.fillStyle = "rgba(0, 0, 255, 0.5)";
		c.fillRect(400, 100, 100, 100);
		c.fillStyle = "rgba(0, 255, 0, 0.5)";
		c.fillRect(300, 300, 100, 100);

		// Drawing lines
		c.beginPath();
		c.moveTo(50, 300); // begin point
		c.lineTo(300, 100); // end point
		c.lineTo(400, 300); // next points

		c.strokeStyle = "purple";
		c.stroke(); // actual "draw" method -> sth like "show me this line";

		// Drawing arcs / circles
		c.beginPath(); // also resets the connection between drawings
		c.arc(300, 300, 30, 0, Math.PI * 2, false);
		c.strokeStyle = "blue";
		c.stroke();

		for (let i: number = 0; i < 3; i++) {
			let x: number = Math.random() * 700;
			let y: number = Math.random() * 500;

			c.beginPath();
			c.arc(x, y, 30, 0, Math.PI * 2, false);
			c.strokeStyle = "blue";
			c.stroke();
		}

		this.app.append(canvas);
	}

	create2() {

		for (let i: number = 0; i < 100; i++) {
			let radius = 30;
			let x = Math.random() * (this.canvas.width - (radius * 2)) + radius
			let y = Math.random() * (this.canvas.height - (radius * 2)) + radius
			let dx = (Math.random() - 0.5) * 3;
			let dy = (Math.random() - 0.5) * 3;

			this.circles.push(new Circle(this.canvas, x, y, dx, dy, radius));
		}

		this.animate();
	}

	animate() {
		console.log("No siema");
		let c = this.canvas.getContext("2d");
		c.clearRect(0, 0, this.canvas.width, this.canvas.height)

		for (let i: number = 0; i < this.circles.length; i++) {
			this.circles[i].update();
		}

		requestAnimationFrame(this.animate.bind(this));
	}
}