import{Game}from"./game.js";class Intro{constructor(t,e){this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.width=t??this.canvas.style.width.replace("px",""),this.height=e??this.canvas.style.height.replace("px",""),this.resize(),this.img=new Image,this.img.onload=()=>{this.draw()},this.img.src="./images/intro.png",document.addEventListener("keydown",this.play.bind(this),!1),document.querySelector("button#start").addEventListener("click",function(){this.game||(this.game=new Game)}.bind(this),!1),document.querySelector("button#reset").addEventListener("click",function(){this.game&&document.location.reload()}.bind(this),!1)}resize(){this.canvas.width=2*this.width,this.canvas.height=2*this.height,this.ctx.scale(2,2)}draw(){this.ctx.beginPath(),this.ctx.fillStyle="#007eff",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.drawImage(this.img,0,0,this.width,this.height),this.ctx.closePath()}play(t){this.game||"Enter"!==t.key?this.game&&"Backspace"===t.key&&document.location.reload():this.game=new Game}}window.onload=()=>{new Intro};