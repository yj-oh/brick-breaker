import { Brick } from './brick.js';
import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

export class Game {
	constructor(width, height) {
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.width = width ?? this.canvas.style.width.replace('px', '');
		this.height = height ?? this.canvas.style.height.replace('px', '');

		this.lives = 3;
		this.stage = 1;
		this.score = 0;
		this.scoreInterval = 10;
		this.cumulativeScore = 0;

		this.rows = 4;
		this.columns = 6;
		this.ballSpeed = 5;

		this.bricks = new Brick(this.canvas.width, this.rows, this.columns);
		this.paddle = new Paddle(this.canvas.width, this.canvas.height);
		this.ball = new Ball(
			(this.canvas.width - 10) / 2,
			(this.canvas.height - 10) - (this.paddle.height * 2),
			this.ballSpeed,
			10,
			'#f54141',
		);

		this.resize();
		window.addEventListener('resize', this.resize.bind(this), false);

		document.addEventListener('keydown', this.onKeydown.bind(this), false);
		document.addEventListener('keyup', this.onKeyup.bind(this), false);

		requestAnimationFrame(this.animate.bind(this));
	}

	resize() {
		this.canvas.width = this.width * 2;
		this.canvas.height = this.height * 2;
		this.ctx.scale(2, 2);

		this.bricks.resize();
		this.paddle.resize();
		this.ball.resize();
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.ctx.clearRect(0, 0, this.width, this.height);

		this.paddle.moveLeft();
		this.paddle.moveRight();

		this.drawStage();

		this.bricks.draw(this.ctx);
		this.paddle.draw(this.ctx);
		this.ball.draw(this.ctx);

		this.drawLives();
		this.drawScore();

		this.moveBall();
		this.breakBricks();
	}

	moveBall() {
		const height = this.height - this.paddle.height * 2;

		const afterX = this.ball.x + this.ball.moveX;
		const afterY = this.ball.y + this.ball.moveY;

		if(afterX > this.width - this.ball.radius || afterX < this.ball.radius) {
			this.ball.moveX = -this.ball.moveX;
		}

		if(afterY < this.ball.radius) {
			this.ball.moveY = -this.ball.moveY;

		} else if(afterY > height - this.ball.radius) {
			if(afterX > this.paddle.x && afterX < this.paddle.x + this.paddle.width) {
				this.ball.moveY = -this.ball.moveY;

			} else {
				this.lives--;

				if(this.lives === 0) {
					alert(`🔥 GAME OVER! 🔥\n Your score : ${this.score}`);
					document.location.reload();

				} else {
					this.ball.init(this.ballSpeed);
					this.ball.draw(this.ctx);
					this.paddle.x = (this.width - this.paddle.width) / 2;
				}
			}
		}

		this.ball.x += this.ball.moveX;
		this.ball.y += this.ball.moveY;
	}

	breakBricks() {
		for (let r = 0; r < this.bricks.rows; r++) {
			for (let c = 0; c < this.bricks.columns; c++) {
				const brick = this.bricks.bricks[r][c];

				if (brick.status === 1) {
					// 공이 벽돌에 닿으면 벽돌의 상태값을 바꾸고, 공의 방향을 반대로 튼다.
					if (
						this.ball.x > brick.x
							&& this.ball.x < brick.x + this.bricks.width
							&& this.ball.y > brick.y
							&& this.ball.y < brick.y + this.bricks.height
					) {
						this.ball.moveY = -this.ball.moveY;
						brick.status = 0;
						this.score += this.scoreInterval;

						if (this.score === this.bricks.rows * this.bricks.columns * this.scoreInterval + this.cumulativeScore) {
							alert(`🎊 CONGRATULATIONS! 🥳\n Stage ${this.stage} clear!`);

							this.cumulativeScore = this.score;

							this.stage++;

							if(this.rows < 7 && this.stage % 2 === 0) {
								this.rows++;
							} else if(this.columns < 10 && this.stage % 2 === 1) {
								this.columns++;
							} else {
								this.ballSpeed++;
							}

							this.bricks = new Brick(this.canvas.width, this.rows, this.columns);
							this.bricks.resize();
							this.bricks.initBricks();
							this.bricks.draw(this.ctx);

							this.ball.init(this.ballSpeed);
						}
					}
				}
			}
		}
	}

	drawStage() {
		this.ctx.font = 'bold 30px JetBrains Mono';
		this.ctx.fillStyle = '#c6c6c6';
		this.ctx.fillText(`Stage ${this.stage}`, this.width / 2 - 60, this.height / 2 + 70);
	}

	drawScore() {
		this.ctx.font = 'bold 18px JetBrains Mono';
		this.ctx.fillStyle = '#000000';
		this.ctx.fillText('Score : ' + this.score, this.width - 140, this.bricks.paddingTop / 2);
	}

	drawLives() {
		let emoji = '';
		for(let i = 0; i < this.lives; i++) {
			emoji += '🌳';
		}

		this.ctx.font = 'bold 18px JetBrains Mono';
		this.ctx.fillStyle = '#000000';
		this.ctx.fillText(
			'Lives : ' + emoji,
			this.bricks.paddingLeft / 2,
			this.bricks.paddingTop / 2
		);
	}

	onKeydown(e) {
		if(e.key === 'ArrowLeft') {
			this.paddle.left = true;

		} else if(e.key === 'ArrowRight') {
			this.paddle.right = true;
		}
	}

	onKeyup(e) {
		if(e.key === 'ArrowLeft') {
			this.paddle.left = false;

		} else if(e.key === 'ArrowRight') {
			this.paddle.right = false;
		}
	}
}
