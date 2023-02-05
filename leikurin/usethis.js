const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angle = Math.PI / 180;
const score_keeper = document.getElementById('player_score');
const life_maneger = document.getElementById('player_lives');
/* canvas.width  = window.innerWidth;
canvas.height = window.innerHeight; */


const pacman = {
    x: 400,
    y: 400,
    radius: 25,
    color: 'yellow',
    pacman_speed: 2,
    pacman_life: 3,
    angle_1: 30,
    angle_2: 330,
    can_kill_ghost: false,
    ghost_counter : 0,
    counter : 0,
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, 30, angle * this.angle_1, angle * this.angle_2, false);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    },
    pacman_power_pellet_effect() {
        this.counter += 6;
        this.can_kill_ghost = true;
        this.color = 'blue';

        let intervalId = setInterval(() => {
        if (this.counter === 0) {
            clearInterval(intervalId);
            this.can_kill_ghost = false;
            this.color = 'yellow';
            console.log("Countdown complete!");
        } else if(this.counter % 2 == 0) {
            console.log(this.counter+"slett");
            this.counter--;
        } else if (this.counter % 2 == 1) {
            console.log(this.counter+"odda");
            this.counter--;
        }
        }, 1000);
    },ghost_timer_for_touch() {
        this.ghost_counter = 0.5;
        pacman_touched_ghost = true;
        let intervalId = setInterval(() => {
            if (this.ghost_counter <= 0) {
                clearInterval(intervalId);
                console.log("Countdown complete!");
                pacman_touched_ghost = false;
            } else {
                console.log(this.ghost_counter);
                this.ghost_counter--;
            }
        }, 1000);
    }
};

const pellet = {
    id: 0,
    x: 1000,
    y: 1000,
    radius: 10,
    color: 'rgb(255,128,0)',
    angle_1: 0,
    angle_2: 360,
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, angle * this.angle_1, angle * this.angle_2, false);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    },
    tracker() {
        let dx = pacman.x - this.x;
        let dy = pacman.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let sumofradii = pacman.radius + pellet.radius;
        if (distance < sumofradii) {
            console.log('collision');
            this.x = 1000;
            this.y = 1000;
            player_score += 1;
            score_keeper.innerHTML = "score : "+player_score;
        }   
    }
}

const power_pellet = {
    id: 0,
    x: 100,
    y: 100,
    radius: 15,
    color: 'rgb(0,0,204)',
    angle_1: 0,
    angle_2: 360,
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, angle * this.angle_1, angle * this.angle_2, false);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    },
    tracker() {
        let dx = pacman.x - this.x;
        let dy = pacman.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let sumofradii = pacman.radius + pellet.radius;
        if (distance < sumofradii) {
            console.log('collision');
            pacman.pacman_power_pellet_effect();
            for (let i = 0; i < ghosts_list.length; i++) {
                ghosts_list[i].change_color();
            }
            this.x = 1000;
            this.y = 1000;
            player_score += 1;
            score_keeper.innerHTML = "score : "+player_score;
        }   
    }
}

pacman_touched_ghost = false;

const ghost = {
    x: 325,
    y: 200,
    radius: 25,
    color_main: 'red',
    color_main_copy: 'red',
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
    },
    tracker() {
        let dx = pacman.x - this.x;
        let dy = pacman.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let sumofradii = pacman.radius + this.radius;
        if (distance < sumofradii) {
            if(pacman.can_kill_ghost === true) {
                this.x = Math.floor(Math.random() * 750);
                this.y = Math.floor(Math.random() * 750);
                player_score += 1;
                score_keeper.innerHTML = "score : "+player_score;
                console.log('die');
            } else  {
                if (pacman_touched_ghost === false) {
                    pacman.ghost_timer_for_touch();
                    pacman.pacman_life -=1;
                    console.log('die pacman'+pacman.pacman_life);
                    life_maneger.innerHTML = "Lives : "+pacman.pacman_life;
                } else {
                    console.log('no lives lost pacman');
                }
            }
            //console.log('collision');
        }   
    },
    change_color() {
        this.color_main = 'rgb(0,102,204)';

        let intervalId = setInterval(() => {
        if (pacman.counter === 0) {
            clearInterval(intervalId);
            this.color_main = this.color_main_copy;
            console.log("Countdown complete!");
        } else if(pacman.counter % 2 == 0) {
            console.log(pacman.counter+"slett");
            this.color_main = this.color_main_copy;
        } else if (pacman.counter % 2 == 1) {
            console.log(pacman.counter+"odda");
            this.color_main = this.color_main_copy;
            this.color_main = 'rgb(0,102,204)';
        }
        }, 1000);
    } 
}

arrowdown = false;
arrowup = false;
arrowleft = false;
arrowright = false;

// checks for keydown for pacman
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        arrowright = true;
    }
    if (event.code === 'ArrowLeft') {
        arrowleft = true;
    }
    if (event.code === 'ArrowUp') {
        arrowup = true;
    }
    if (event.code === 'ArrowDown') {
        arrowdown = true;
    }
}, false);

//move pacman
function move() {
    if ((arrowdown? 1:0) + (arrowup? 1:0) + (arrowleft? 1:0) + 
    (arrowright? 1:0) == 2) {
        if ( arrowright === true && arrowup === true) {
            pacman.x += pacman.pacman_speed;
            pacman.y -= pacman.pacman_speed;
            pacman.angle_1 = -15;
            pacman.angle_2 = 285;
        }
        if (arrowleft === true && arrowup === true) {
            pacman.x -= pacman.pacman_speed;
            pacman.y -= pacman.pacman_speed;
            pacman.angle_1 =  255;
            pacman.angle_2 = 555;
        }
        if (arrowright === true && arrowdown === true) {
            pacman.y += pacman.pacman_speed;
            pacman.x += pacman.pacman_speed;
            pacman.angle_1 =  75;
            pacman.angle_2 = 375;
        }
        if (arrowleft === true && arrowdown === true) {
            pacman.y += pacman.pacman_speed;
            pacman.x -= pacman.pacman_speed;
            pacman.angle_1 =  165;
            pacman.angle_2 = 465;
        }
    } else {
        if (arrowright === true) {
            pacman.x += pacman.pacman_speed;
            pacman.angle_1 =  30;
            pacman.angle_2 = 330;
        }
        if (arrowleft === true) {
            pacman.x -= pacman.pacman_speed;
            pacman.angle_1 =  210;
            pacman.angle_2 = 510;
        }
        if (arrowup === true) {
            pacman.y -= pacman.pacman_speed;
            pacman.angle_1 =  300;
            pacman.angle_2 = 600;
        }
        if (arrowdown === true) {
            pacman.y += pacman.pacman_speed ;
            pacman.angle_1 =  120;
            pacman.angle_2 = 420;
        }  
    } 
}

// check if key is released
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
        arrowright = false;
    }
    if (event.code === 'ArrowLeft') {
        arrowleft = false;
    }
    if (event.code === 'ArrowUp') {
        arrowup = false;
    }
    if (event.code === 'ArrowDown') {
        arrowdown = false;
    }
}, false);


// veit ekki hvort eg þarf þetta
function colision(){
    /* let dx = pacman.x - pellet.x;
    let dy = pacman.y - pellet.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    //console.log(distance);
    let sumofradii = pacman.radius + pellet.radius; */
    /* if (distance < sumofradii) {
        //console.log('collision');
        player_score += 1;
        score_keeper.innerHTML = "score : "+player_score;
    } else if (distance === sumofradii) {
        //console.log('touching');
    } else if (distance > sumofradii) {
        //console.log('not touching');
    } */
}
// veit ekki hvort eg þarf þetta end

player_score = 0;


// bua til shit 
const pellet1 = Object.create(pellet);
const pellet2 = Object.create(pellet);
const pellet3 = Object.create(pellet);
const pellet4 = Object.create(pellet);
const pellet5 = Object.create(pellet);
const pellet6 = Object.create(pellet);
const pellet7 = Object.create(pellet);
const pellet8 = Object.create(pellet);
const pellet9 = Object.create(pellet);
const pellet10 = Object.create(pellet);
const pellet11 = Object.create(pellet);
const pellet12 = Object.create(pellet);
pellets = [pellet1, pellet2, pellet3, pellet4, pellet5, pellet6, pellet7, pellet8, pellet9, pellet10, pellet11, pellet12];

for (let i = 0; i < pellets.length; i++) {
    pellets[i].x = Math.floor(Math.random() * 750);
    pellets[i].y = Math.floor(Math.random() * 750);
    pellets[i].id = i;
}

const power_pellet1 = Object.create(power_pellet);
const power_pellet2 = Object.create(power_pellet);
const power_pellet3 = Object.create(power_pellet);
const power_pellet4 = Object.create(power_pellet);
power_pellets = [power_pellet1, power_pellet2, power_pellet3, power_pellet4];

power_pellet1.x = 20;
power_pellet1.y = 20;

power_pellet2.x = 780;
power_pellet2.y = 780;

power_pellet3.x = 780;
power_pellet3.y = 20;

power_pellet4.x = 20;
power_pellet4.y = 780;
// bua til shit end


const red_ghost = Object.create(ghost);
const pink_ghost = Object.create(ghost);
const cyan_ghost = Object.create(ghost);
const orage_ghost = Object.create(ghost);
ghosts_list = [red_ghost,pink_ghost ,cyan_ghost ,orage_ghost ];

red_ghost.color_main = "red";
red_ghost.color_main_copy = "red";

pink_ghost.color_main = "pink";
pink_ghost.color_main_copy = "pink";

cyan_ghost.color_main = "cyan";
cyan_ghost.color_main_copy = "cyan";

orage_ghost.color_main = "orage";
orage_ghost.color_main_copy = "orage";

for (let i = 0; i < ghosts_list.length; i++) {
    ghosts_list[i].x = Math.floor(Math.random() * 750);
    ghosts_list[i].y = Math.floor(Math.random() * 750);
    ghosts_list[i].id = i;
}



function init(){
    if (pacman.pacman_life > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 200, 400);
        
        pacman.draw();

        for (let i = 0; i < ghosts_list.length; i++) {
            ghosts_list[i].draw();
            ghosts_list[i].tracker();
        }

        for (let i = 0; i < pellets.length; i++) {
            pellets[i].draw();
            pellets[i].tracker();
        }

        for (let i = 0; i < power_pellets.length; i++) {
            power_pellets[i].draw();
            power_pellets[i].tracker();
        }

        move();
        colision();
        window.requestAnimationFrame(init);
    }else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 200, 400);
    }
}
console.log(screen.width+" "+screen.height);
init();