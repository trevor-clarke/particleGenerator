window.onload = setup;
var particles = [], canvas, c, height = window.innerHeight, width = window.innerWidth, circleColour,
    colours = ["red", "green", "blue", "orange", "purple", "yellow", "pink"],
    startNum = 40,
    startSize = 15;

function setup() {
    canvas = document.getElementById("c");
    c = canvas.getContext("2d");
    canvas.height = height;
    canvas.width = width;
    createParticle(20);
    window.setInterval(animate, 10);
}

window.onresize = function(){
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
};

function animate() {
    c.clearRect(0, 0, width, height);
    updateParticles();

    c.lineWidth = 3;
    c.strokeStyle = circleColour;
    c.beginPath();
    c.arc((width / 2) - (startSize / 2), (height / 2) - (startSize / 2), startSize, 0, 2 * Math.PI);
    c.stroke();

    for (i = 0; i < particles.length; i++) {
        c.beginPath();
        c.fillStyle = particles[i].c;
        c.arc(particles[i].x, particles[i].y, particleSize(particles[i].z), 0, 2 * Math.PI);
        c.fill();
    }
}

function createParticle(num) {
    if (num == null)
        num = 1;
    for (i = 0; i < num; i++) {
        var colour = randomColour();
        particles.push({
             x: (width / 2) - (startSize / 2),
             y: (height / 2) - (startSize / 2),
             z: 1,
            vX:	(Math.random() * 1.5 - .75),
            vY: Math.random() * 2 -1,
            vZ: Math.random() * .02 - .01,
            c: colour
        });
        circleColour = colour;
    }
}

function updateParticles() {
    for (i = 0; i < particles.length; i++) {
        var vX = particles[i].vX;
        var vY = particles[i].vY;
        var vZ = particles[i].vZ;

        particles[i].vX *= Math.abs(vZ) + 1;
        particles[i].vY *= Math.abs(vZ) + 1;

        particles[i].x += vX;
        particles[i].y += vY;
        particles[i].z += vZ;

        var pad = particleSize(particles[i].z);

        if (!(particles[i].z > 0 && particles[i].y > 0-pad && particles[i].y < height +pad && particles[i].x > 0-pad && particles[i].x < width+pad)) {
            removeParticle(i);
            createParticle();
        }
    }
    sortParticles();
}

function sortParticles() {
    particles.sort(
        function(a, b) {
            return a.z - b.z;
        });
}

function removeParticle(i) {
    particles.splice(i, 1);
}

function randomColour() {
    var r = Math.floor(Math.random() * 150) + 105;
    var g = Math.floor(Math.random() * 150) + 105;
    var b = Math.floor(Math.random() * 150) + 105;
    return "rgb(" + r + "," + g + "," + b + ")";
}

function particleSize(a) {
        return startSize * (Math.pow(a, 1.5));
}
