``` js 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angle = Math.PI/180;

const ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: 'yellow',
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, 30, angle * 30, angle * 330, false);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
};
const ghost = {
  x: 325,
  y: 200,
  radius: 25,
  color_main: 'red',
  color_lines: 'black',
  color_eye: 'white',
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color_main;  
    ctx.strokeStyle = this.color_lines;
    ctx.lineWidth = 3; 
    ctx.arc(this.x,this.y,this.radius,angle * 180 ,angle * 0, false);
    let temp = this.x+25;
    for (let i = 0; i < 11; i++) {
      if (i % 2 == 0) {
        ctx.lineTo(temp,this.y+50);
      } else {
        ctx.lineTo(temp,this.y+40);
      }
      temp-=5;
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.color_lines;
    ctx.fillStyle = this.color_eye;
    ctx.lineWidth = 3;
    ctx.arc(this.x-12.5,this.y,5,angle * 0,angle*360, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.color_lines;
    ctx.fillStyle = this.color_eye;
    ctx.lineWidth = 3;
    ctx.arc(this.x+12.5,this.y,5,angle * 0,angle*360, false);
    ctx.fill();
    ctx.stroke(); 
  }
}

hradi = 5;
g_hradi = 5;

function init() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
    ghost.draw();
    if (ball.x > canvas.width) {
        hradi = -5;
    }
    if (ball.x < 0) {
        hradi = 5;
    } 
    ball.x += hradi;
    if (ghost.x > canvas.width) {
      g_hradi = -5;
    }
    if (ghost.x < 0) {
      g_hradi = 5;
    } 
    ghost.x += g_hradi;
    window.requestAnimationFrame(init);
}
init();
```
