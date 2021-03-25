export class Paddle {
	constructor(
		canvasWidth,
		canvasHeight,
		width = 200,
		height = 26,
		speed = 10,
		x = (canvasWidth - width) / 2,
		left = false,
		right = false,
	) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.x = x;
		this.left = left;
		this.right = right;

	}

	resize() {
		this.canvasWidth = this.canvasWidth / 2;
		this.canvasHeight = this.canvasHeight / 2;
		this.width = this.width / 2;
		this.height = this.height / 2;
		this.x = this.x / 2;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.canvasHeight - this.height * 2, this.width, this.height);
		ctx.fillStyle = '#095350';
		ctx.fill();
		ctx.closePath();
	}

	moveLeft(speed = this.speed) {
		if(this.left && this.x > 0) {
			this.x -= speed;
		}
	}

	moveRight(speed = this.speed) {
		if(this.right && this.x < this.canvasWidth - this.width) {
			this.x += speed;
		}
	}
}
