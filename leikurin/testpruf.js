// canvas er breyta sem geymir vísun á <canvas> í html skrá.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angle = Math.PI/180;

movment_speed = 5;


const pacman = {
    x: 100,
    y: 100,
    radius: 25,
    color: 'yellow',
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, 30 , angle * 30, angle * 330, false);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        pacman.x += movment_speed;
    }
    if (event.code === 'ArrowLeft') {
        pacman.x -= movment_speed;
    }
    if (event.code === 'ArrowUp') {
        pacman.y -= movment_speed;
    }
    if (event.code === 'ArrowDown') {
        pacman.y += movment_speed;
    }  
}, false);

hradi = 5;


function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pacman.draw();
    /* 
    if (pacman.x > canvas.width - pacman.radius) {
        hradi = -5;
    }
    if (pacman.x < 0 + pacman.radius) {
        hradi = 5;
    }
    pacman.x += hradi; */
    window.requestAnimationFrame(init);
};

init();