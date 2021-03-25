export class Brick {
	constructor(
		canvasWidth,
		rows = 4,
		columns = 6,
		height = 50,
		spacing = 1,
		paddingTop = height * 2,
		paddingLeft = height,
	) {
		this.rows = rows;
		this.columns = columns;
		this.height = height;
		this.spacing = spacing;
		this.paddingTop = paddingTop;
		this.paddingLeft = paddingLeft;
		this.width = (canvasWidth - (paddingLeft * 2)) / columns;
		this.bricks = this.initBricks();
	}

	resize() {
		this.width = this.width / 2;
		this.height = this.height / 2;
		this.paddingTop = this.paddingTop / 2;
		this.paddingLeft = this.paddingLeft / 2;
	}

	initBricks(rows = this.rows, columns = this.columns) {
		let arr = [];

		for(let r = 0; r < rows; r++) {
			arr[r] = new Array(columns);

			for (let c = 0; c < columns; c++) {
				arr[r][c] = { x: 0, y: 0, status: 1, color: this.getRandomColor() };
			}
		}
		return arr;
	}

	draw(ctx) {
		for(let r = 0; r < this.rows; r++) {
			for(let c = 0; c < this.columns; c++) {
				if(this.bricks[r][c].status === 1) {
					const x = (c * (this.width + this.spacing)) + this.paddingLeft;
					const y = (r * (this.height + this.spacing)) + this.paddingTop;

					this.bricks[r][c].x = x;
					this.bricks[r][c].y = y;

					ctx.beginPath();
					ctx.fillStyle = this.bricks[r][c].color;
					ctx.rect(x, y, this.width, this.height);
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	getRandomColor() {
		const r = 250;
		const g = Math.floor((Math.random() * 100) + 1);
		const b = Math.floor((Math.random() * 140) + 120);
		return 'rgba(' + r + ',' + g + ',' + b + ', 1)';
	}
}
