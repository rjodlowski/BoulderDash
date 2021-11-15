// Example object on the canvas, not the part of final project
export default class Circle {
	x: number;
	y: number;
	dx: number;
	dy: number;
	radius: number;
	canvas: HTMLCanvasElement;

	constructor(
		canvas: HTMLCanvasElement,
		x: number,
		y: number,
		dx: number,
		dy: number,
		radius: number,
	) {
		this.canvas = canvas;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
	}

	draw() {
		let c = this.canvas.getContext("2d");

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = "blue";
		c.stroke();

	}

	update() {
		if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}