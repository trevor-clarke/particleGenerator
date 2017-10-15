window.onload = setup;
var particles = [],
    canvas, c, height = window.innerHeight,
    width = window.innerWidth,
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

function animate() {
    clearCanvas();
    updateParticles();
    c.lineWidth = 3;
    c.strokeStyle = lastColour();
    centerCircle();
    for (i = 0; i < particles.length; i++) {
        drawParticle(particles[i]);
    }
}

function createParticle(num) {
    if (num == null) num = 1;
    for (i = 0; i < num; i++) {
        particles.push({
            x: (width / 2) - (startSize / 2),
            y: (height / 2) - (startSize / 2),
            z: 1,
            vX: (Math.random() * 1.5 - .75),
            vY: Math.random() * 2 - 1,
            vZ: Math.random() * .02 - .01,
            c: randomColour()
        });
    }
}

function updateParticles() {
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        particles[i].vX *= Math.abs(p.vZ) + 1;
        particles[i].vY *= Math.abs(p.vZ) + 1;
        particles[i].x += p.vX;
        particles[i].y += p.vY;
        particles[i].z += p.vZ;
        if (offscreen(particles[i])) {
            removeParticle(i);
            createParticle();
        }
    }
    sortParticles();
}

function sortParticles() {
    particles.sort(function(a, b) {
        return a.z - b.z;
    });
}

function lastColour() {
    return particles[particles.length - 1].c;
}

function offscreen(a) {
    var pad = particleSize(a.z);
    if (!(a.z > 0 && a.y > 0 - pad && a.y < height + pad && a.x > 0 - pad && a.x < width + pad)) {
        return true;
    } else {
        return false;
    }
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

function centerCircle() {
    c.beginPath();
    c.arc((width / 2) - (startSize / 2), (height / 2) - (startSize / 2), startSize, 0, 2 * Math.PI);
    c.stroke();
}

function drawParticle(p) {
    c.beginPath();
    c.fillStyle = p.c;
    c.arc(p.x, p.y, particleSize(p.z), 0, 2 * Math.PI);
    c.fill();
}

function clearCanvas() {
    c.clearRect(0, 0, width, height);
}
window.onresize = function() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
};
