// canvas er breyta sem geymir vísun á <canvas> í html skrá.
let canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');

// rauður fylltur litur
ctx.fillStyle = 'rgb(200, 0, 0)';

// rétthyrningur með rauðum fylltum lit
ctx.fillRect(10, 10, 50, 50);