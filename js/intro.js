import { Game } from './game.js';

class Intro {
	constructor(width, height) {
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.width = width ?? this.canvas.style.width.replace('px', '');
		this.height = height ?? this.canvas.style.height.replace('px', '');

		this.resize();

		this.img = new Image();
		this.img.onload = () => {
			this.draw();
		}
		this.img.src = './images/intro.png';

		document.addEventListener('keydown', this.play.bind(this), false);

		document.querySelector('button#start').addEventListener('click', function() {
			if(!this.game) this.game = new Game();
		}.bind(this), false);

		document.querySelector('button#reset').addEventListener('click', function() {
			if(this.game) document.location.reload();
		}.bind(this), false);
	}

	resize() {
		this.canvas.width = this.width * 2;
		this.canvas.height = this.height * 2;
		this.ctx.scale(2, 2);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = '#007eff';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
		this.ctx.closePath();
	}

	play(e) {
		if(!this.game && e.key === 'Enter') {
			this.game = new Game();

		} else if(this.game && e.key === 'Backspace') {
			document.location.reload();
		}
	}
}

window.onload = () => {
	new Intro();
}
