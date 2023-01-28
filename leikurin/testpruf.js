// canvas er breyta sem geymir vísun á <canvas> í html skrá.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angle = Math.PI / 180;


const pacman = {
    x: 100,
    y: 100,
    radius: 25,
    color: 'yellow',
    pacman_speed: 5,
    angle: 0,
    move_angle: 0,
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, 30, angle * 30, angle * 330, false);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    },
    /* angle_packman() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.move_angle * angle);
        ctx.restore();
    } */
};

const ghost = {
    x: 325,
    y: 200,
    radius: 25,
    color_main: 'red',
    color_lines: 'black',
    color_eye: 'white',
    ghost_speed: 5,
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color_main;
        ctx.strokeStyle = this.color_lines;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, angle * 180, angle * 0, false);
        let temp = this.x + 25;
        for (let i = 0; i < 11; i++) {
            if (i % 2 == 0) {
                ctx.lineTo(temp, this.y + 50);
            } else {
                ctx.lineTo(temp, this.y + 40);
            }
            temp -= 5;
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = this.color_lines;
        ctx.fillStyle = this.color_eye;
        ctx.lineWidth = 3;
        ctx.arc(this.x - 12.5, this.y, 5, angle * 0, angle * 360, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = this.color_lines;
        ctx.fillStyle = this.color_eye;
        ctx.lineWidth = 3;
        ctx.arc(this.x + 12.5, this.y, 5, angle * 0, angle * 360, false);
        ctx.fill();
        ctx.stroke();
    }
}


document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        pacman.x += pacman.pacman_speed;
    }
    if (event.code === 'ArrowLeft') {
        pacman.x -= pacman.pacman_speed;
    }
    if (event.code === 'ArrowUp') {
        pacman.y -= pacman.pacman_speed;
    }
    if (event.code === 'ArrowDown') {
        pacman.y += pacman.pacman_speed ;
    }
    /* if (event.code === 'arrowRight' || event.code === 'arrowUp') {
        ghost.x += pacman.pacman_speed * Math.sin(pacman.angle);
    }  */
}, false);


const red_ghost = Object.create(ghost);
const pink_ghost = Object.create(ghost);
pink_ghost.x = 100, y = 100;
pink_ghost.color_main = "pink";

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pink_ghost.x > canvas.width) {
        pink_ghost.ghost_speed = -2;
    }
    if (pink_ghost.x < 0) {
        pink_ghost.ghost_speed = 2;
    }
    pink_ghost.x += pink_ghost.ghost_speed;

    if (red_ghost.x > canvas.width) {
        red_ghost.ghost_speed = -3;
    }
    if (red_ghost.x < 0) {
        red_ghost.ghost_speed = 3;
    }
    red_ghost.x += red_ghost.ghost_speed;

    pacman.draw();
    red_ghost.draw();
    pink_ghost.draw();

    window.requestAnimationFrame(init);
};

init();

// move at a agnle
/* var xunits = Math.cos(radians) * speed;
var yunits = Math.sin(radians) * speed; */

/* ctx.translate(this.x, this.y);
ctx.rotate(this.move_angle * angle); */