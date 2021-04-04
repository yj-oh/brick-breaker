export class Ball {
	constructor(
		x,
		y,
		speed,
		radius,
		color,
	) {
		this.absoluteX = x;
		this.absoluteY = y;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.moveX = speed;
		this.moveY = -speed;
		this.radius = radius;
		this.color = color;
	}

	resize() {
		this.x = this.x / 2;
		this.y = this.y / 2;
	}

	init(speed) {
		this.x = this.absoluteX;
		this.y = this.absoluteY;
		this.moveX = speed ?? this.speed;
		this.moveY = speed ?? this.speed;
		this.resize();
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}