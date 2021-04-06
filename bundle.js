(()=>{"use strict";var t={466:(t,i,s)=>{t.exports=s.p+"b37944725d0c23cfcd01.png"},816:(t,i,s)=>{t.exports=s.p+"6b906e0c7aa4070d5c27.png"}},i={};function s(e){var h=i[e];if(void 0!==h)return h.exports;var a=i[e]={exports:{}};return t[e](a,a.exports,s),a.exports}s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var i=s.g.document;if(!t&&i&&(i.currentScript&&(t=i.currentScript.src),!t)){var e=i.getElementsByTagName("script");e.length&&(t=e[e.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),(()=>{class t{constructor(t,i=4,s=6,e=50,h=1,a=2*e,r=e){this.rows=i,this.columns=s,this.height=e,this.spacing=h,this.paddingTop=a,this.paddingLeft=r,this.width=(t-2*r)/s,this.bricks=this.initBricks()}resize(){this.width=this.width/2,this.height=this.height/2,this.paddingTop=this.paddingTop/2,this.paddingLeft=this.paddingLeft/2}initBricks(t=this.rows,i=this.columns){let s=[];for(let e=0;e<t;e++){s[e]=new Array(i);for(let t=0;t<i;t++)s[e][t]={x:0,y:0,status:1,color:this.getRandomColor()}}return s}draw(t){for(let i=0;i<this.rows;i++)for(let s=0;s<this.columns;s++)if(1===this.bricks[i][s].status){const e=s*(this.width+this.spacing)+this.paddingLeft,h=i*(this.height+this.spacing)+this.paddingTop;this.bricks[i][s].x=e,this.bricks[i][s].y=h,t.beginPath(),t.fillStyle=this.bricks[i][s].color,t.rect(e,h,this.width,this.height),t.fill(),t.closePath()}}getRandomColor(){return"rgba(250,"+Math.floor(100*Math.random()+1)+","+Math.floor(140*Math.random()+120)+", 1)"}}class i{constructor(t,i,s=200,e=26,h=10,a=(t-s)/2,r=!1,l=!1){this.canvasWidth=t,this.canvasHeight=i,this.width=s,this.height=e,this.speed=h,this.x=a,this.left=r,this.right=l}resize(){this.canvasWidth=this.canvasWidth/2,this.canvasHeight=this.canvasHeight/2,this.width=this.width/2,this.height=this.height/2,this.x=this.x/2}draw(t){t.beginPath(),t.rect(this.x,this.canvasHeight-2*this.height,this.width,this.height),t.fillStyle="#095350",t.fill(),t.closePath()}moveLeft(t=this.speed){this.left&&this.x>0&&(this.x-=t)}moveRight(t=this.speed){this.right&&this.x<this.canvasWidth-this.width&&(this.x+=t)}}class e{constructor(t,i,s,e,h){this.absoluteX=t,this.absoluteY=i,this.x=t,this.y=i,this.speed=s,this.moveX=s,this.moveY=-s,this.radius=e,this.color=h}resize(){this.x=this.x/2,this.y=this.y/2}init(t){this.x=this.absoluteX,this.y=this.absoluteY,this.moveX=t??this.speed,this.moveY=t??this.speed,this.resize()}draw(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),t.fillStyle=this.color,t.fill(),t.closePath()}}firebase.initializeApp({apiKey:"AIzaSyCvwggEZcrRaQOX_LBoZx7B5eBCYs8X12k",projectId:"brick-breaker-978b7",storageBucket:"brick-breaker-978b7.appspot.com",appId:"1:423014326394:web:190cf070bd7ffd409f1bc3"});const h=firebase.firestore(),a="score";var r=s(816);class l{constructor(s,h){this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.width=s??this.canvas.style.width.replace("px",""),this.height=h??this.canvas.style.height.replace("px",""),this.lives=3,this.stage=1,this.score=0,this.scoreInterval=10,this.cumulativeScore=0,this.rows=4,this.columns=6,this.ballSpeed=5,this.ballRadius=10,this.bricks=new t(this.canvas.width,this.rows,this.columns),this.paddle=new i(this.canvas.width,this.canvas.height),this.ball=new e(this.canvas.width/2,this.canvas.height-2*this.ballRadius-2*this.paddle.height,this.ballSpeed,this.ballRadius,"#f54141"),this.resize(),window.addEventListener("resize",this.resize.bind(this),!1),document.addEventListener("keydown",this.onKeydown.bind(this),!1),document.addEventListener("keyup",this.onKeyup.bind(this),!1),requestAnimationFrame(this.animate.bind(this))}resize(){this.canvas.width=2*this.width,this.canvas.height=2*this.height,this.ctx.scale(2,2),this.bricks.resize(),this.paddle.resize(),this.ball.resize()}animate(){if(this.frame=requestAnimationFrame(this.animate.bind(this)),!localStorage.username){const t=prompt("Please enter name.")??"anonymous";localStorage.setItem("username",t)}this.ctx.clearRect(0,0,this.width,this.height),this.paddle.moveLeft(),this.paddle.moveRight(),this.drawStage(),this.bricks.draw(this.ctx),this.paddle.draw(this.ctx),this.ball.draw(this.ctx),this.drawLives(),this.drawScore(),this.moveBall(),this.breakBricks()}moveBall(){const t=this.height-2*this.paddle.height,i=this.ball.x+this.ball.moveX,s=this.ball.y+this.ball.moveY;(i>this.width-this.ball.radius||i<this.ball.radius)&&(this.ball.moveX=-this.ball.moveX),s<this.ball.radius?this.ball.moveY=-this.ball.moveY:s>t-this.ball.radius&&(i>this.paddle.x&&i<this.paddle.x+this.paddle.width?this.ball.moveY=-this.ball.moveY:(this.lives--,0===this.lives?(alert(`🔥 GAME OVER! 🔥\n Your score : ${this.score}`),cancelAnimationFrame(this.frame),(async(t,i)=>{await h.collection(a).add({username:t,score:i,createdAt:(new Date).getTime()})})(localStorage.username,this.score).then((()=>{this.drawRanking()}))):(this.ball.init(this.ballSpeed),this.ball.draw(this.ctx),this.paddle.x=(this.width-this.paddle.width)/2))),this.ball.x+=this.ball.moveX,this.ball.y+=this.ball.moveY}breakBricks(){for(let i=0;i<this.bricks.rows;i++)for(let s=0;s<this.bricks.columns;s++){const e=this.bricks.bricks[i][s];1===e.status&&this.ball.x>e.x&&this.ball.x<e.x+this.bricks.width&&this.ball.y>e.y&&this.ball.y<e.y+this.bricks.height&&(this.ball.moveY=-this.ball.moveY,e.status=0,this.score+=this.scoreInterval,this.score===this.bricks.rows*this.bricks.columns*this.scoreInterval+this.cumulativeScore&&(alert(`🎊 CONGRATULATIONS, ${localStorage.username}! 🥳\n Stage ${this.stage} clear!`),this.cumulativeScore=this.score,this.stage++,this.rows<7&&this.stage%2==0?this.rows++:this.columns<10&&this.stage%2==1?this.columns++:this.ballSpeed++,this.bricks=new t(this.canvas.width,this.rows,this.columns),this.bricks.resize(),this.bricks.initBricks(),this.bricks.draw(this.ctx),this.ball.init(this.ballSpeed)))}}drawStage(){this.ctx.font="bold 30px JetBrains Mono",this.ctx.fillStyle="#c6c6c6",this.ctx.fillText(`Stage ${this.stage}`,this.width/2-60,this.height/2+70)}drawScore(){this.ctx.font="bold 18px JetBrains Mono",this.ctx.fillStyle="#000000",this.ctx.fillText("Score : "+this.score,this.width-140,this.bricks.paddingTop/2)}drawLives(){let t="";for(let i=0;i<this.lives;i++)t+="🌳";this.ctx.font="bold 18px JetBrains Mono",this.ctx.fillStyle="#000000",this.ctx.fillText("Lives : "+t,this.bricks.paddingLeft/2,this.bricks.paddingTop/2)}drawRanking(){this.img=new Image,this.img.onload=()=>{this.ctx.beginPath(),this.ctx.fillStyle="#282828",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.drawImage(this.img,0,0,this.width,this.height),this.ctx.font="bold 20px JetBrains Mono",this.ctx.fillStyle="#242424",(async()=>{let t=[];return await h.collection(a).orderBy("score","desc").orderBy("createdAt","desc").limit(5).get().then((i=>{i.forEach((i=>{t.push(i.data())}))})).catch((t=>{console.log(t)})),t})().then((t=>{let i=!0;for(let s=0;s<t.length;s++){let e="";i&&t[s].username===localStorage.getItem("username")&&t[s].score===this.score&&(e="🔥",i=!1),this.ctx.fillText(`${t[s].username}  ${t[s].score}  ${e}`,200,80+57*s)}})),this.ctx.closePath()},this.img.src=r}onKeydown(t){"ArrowLeft"===t.key?this.paddle.left=!0:"ArrowRight"===t.key&&(this.paddle.right=!0)}onKeyup(t){"ArrowLeft"===t.key?this.paddle.left=!1:"ArrowRight"===t.key&&(this.paddle.right=!1)}}var c=s(466);class o{constructor(t,i){this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.width=t??this.canvas.style.width.replace("px",""),this.height=i??this.canvas.style.height.replace("px",""),this.resize(),this.img=new Image,this.img.onload=()=>{this.draw()},this.img.src=c,document.addEventListener("keydown",this.play.bind(this),!1),document.querySelector("button#start").addEventListener("click",function(){this.game||(this.game=new l)}.bind(this),!1),document.querySelector("button#reset").addEventListener("click",function(){this.game&&document.location.reload()}.bind(this),!1)}resize(){this.canvas.width=2*this.width,this.canvas.height=2*this.height,this.ctx.scale(2,2)}draw(){this.ctx.beginPath(),this.ctx.fillStyle="#007eff",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.drawImage(this.img,0,0,this.width,this.height),this.ctx.closePath()}play(t){this.game||"Enter"!==t.key?this.game&&"Backspace"===t.key&&document.location.reload():this.game=new l}}window.onload=()=>{new o}})()})();