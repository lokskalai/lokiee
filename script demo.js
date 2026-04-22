const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const messageInput = document.getElementById('messageInput');
const colorInput = document.getElementById('colorInput');

const nameDisplay = document.getElementById('nameDisplay');
const ageDisplay = document.getElementById('ageDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const ageBadge = document.getElementById('ageBadge');
const decorations = document.getElementById('decorations');

function updatePoster() {
    nameDisplay.textContent = nameInput.value || "Your Name";
    ageDisplay.textContent = ageInput.value || "0";
    messageDisplay.textContent = `"${messageInput.value || "Have a great day!"}"`;

    const color = colorInput.value;
    document.documentElement.style.setProperty('--primary', color);

    // Convert hex to rgb for opacity variants
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
}

[nameInput, ageInput, messageInput, colorInput].forEach(input => {
    input.addEventListener('input', updatePoster);
});

// Add balloons
function createBalloons() {
    decorations.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = (Math.random() * 80 + 10) + '%';
        balloon.style.top = (Math.random() * 20 + 5) + '%';
        balloon.style.animationDelay = (Math.random() * 2) + 's';
        balloon.style.transform = `scale(${0.8 + Math.random() * 0.5})`;
        balloon.style.opacity = 0.6 + Math.random() * 0.4;
        decorations.appendChild(balloon);
    }
}

// Simple Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 4;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.velocity = { x: (Math.random() - 0.5) * 2, y: Math.random() * 2 + 1 };
        this.rotation = Math.random() * 360;
    }
    update() {
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.rotation += 2;
        if (this.y > canvas.height) this.y = -10;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function initConfetti() {
    particles = Array.from({ length: 60 }, () => new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
initConfetti();
animate();
createBalloons();
updatePoster();
