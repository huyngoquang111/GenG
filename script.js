// Play music
function playMusic() {
  const audio = document.getElementById("themeAudio");
  if (audio.paused) audio.play();
  else audio.pause();
}

// Fireworks effect
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Firework() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height;
  this.radius = 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.vx = (Math.random() - 0.5) * 6;
  this.vy = -Math.random() * 8 - 4;
  this.alpha = 1;
  this.gravity = 0.05;

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= 0.01;
  };

  this.draw = function () {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  };
}

let fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.2) {
    for (let i = 0; i < 5; i++) fireworks.push(new Firework());
  }
  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.alpha <= 0) fireworks.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();
