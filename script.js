const slides = document.querySelectorAll(".slide");
let current = 0;
let locked = false;

function showSlide(i) {
  if (locked || i === current) return;

  locked = true;

  slides[current].classList.remove("active");
  slides[i].classList.add("active");

  current = i;
  updateProgress();

  setTimeout(() => locked = false, 800);
}

function next() {
  if (current < slides.length - 1) showSlide(current + 1);
}

function prev() {
  if (current > 0) showSlide(current - 1);
}

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") next();
  if (e.key === "ArrowUp") prev();
});

window.addEventListener("wheel", e => {
  if (locked) return;

  if (e.deltaY > 0) next();
  else prev();
});

// Progress bar
function updateProgress() {
  const progress = (current / (slides.length - 1)) * 100;
  document.getElementById("progress").style.width = progress + "%";
}

updateProgress();


// MATRIX EFFECT
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789ABCDEF";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00d4ff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);