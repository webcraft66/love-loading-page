// Love is Loading - Romantic Balloon Animation Script

const cuteMessages = [
    "You're my favorite notification 💕",
    "You make my heart skip beats ❤️",
    "My love for you is infinite ∞",
    "You're my sunshine on cloudy days ☀️",
    "Every moment with you is magic ✨",
    "You complete me perfectly 🧩",
    "My heart chose you forever 💖",
    "You're my happy place 🏠",
    "Love you more than coffee ☕💕",
    "You're my always & forever ♾️",
    "You make life beautiful 🌸",
    "My favorite hello, hardest goodbye 👋",
    "You're my person 💑",
    "Heart full of you always 💝",
    "You + Me = Perfect 🥰",
    "Love you to the moon 🌙",
    "You're my everything ✨",
    "Sweetest dreams of you 😍",
    "My heart smiles because of you 😊",
    "Forever yours 💍",
    "You make me better 💪"
];

let balloonsCreated = 0;
const maxBalloons = 25;

function createBalloons() {
    const container = document.getElementById('balloons-container');
    
    for (let i = 0; i < maxBalloons; i++) {
        setTimeout(() => {
            createSingleBalloon(container);
        }, i * 200); // Stagger creation
    }
}

function createSingleBalloon(container) {
    const balloon = document.createElement('div');
    balloon.className = `balloon ballon${Math.floor(Math.random() * 10) + 1}`;
    balloon.style.left = Math.random() * 90 + '%';
    
    const message = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    
    balloon.innerHTML = `
        <div class="balloon-string"></div>
        <div class="balloon-body"></div>
        <div class="balloon-message">${message}</div>
    `;
    
    // Balloon click to pop
    balloon.addEventListener('click', () => {
        balloon.classList.add('clicked');
        setTimeout(() => balloon.remove(), 600);
    });
    
    container.appendChild(balloon);
    balloonsCreated++;
    
    if (balloonsCreated >= maxBalloons) {
        setTimeout(showGiftReveal, 6000); // Show gift after balloons finish
    }
}

function showGiftReveal() {
    const loadingScreen = document.getElementById('loading-screen');
    const balloonsContainer = document.getElementById('balloons-container');
    const giftReveal = document.getElementById('gift-reveal');
    
    // Hide loading
    loadingScreen.style.display = 'none';
    
    // Fade out balloons
    balloonsContainer.style.opacity = '0';
    setTimeout(() => {
        balloonsContainer.style.display = 'none';
    }, 1000);
    
    // Show gift
    setTimeout(() => {
        giftReveal.style.display = 'flex';
    }, 1200);
    
    // Continuous balloon generation (gentle)
    setInterval(() => {
        createSingleBalloon(balloonsContainer);
    }, 3000);
}

function shareLove() {
    if (navigator.share) {
        navigator.share({
            title: 'Love is Loading 💕',
            text: 'Check out this beautiful love animation!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share the love 💕');
    }
}

function restartAnimation() {
    location.reload();
}

// Loading sequence
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading progress
    const progress = document.querySelector('.loading-progress');
    
    // Start balloon creation after 3s loading
    setTimeout(() => {
        createBalloons();
    }, 3000);
    
    // Mouse movement creates heart trail
    document.addEventListener('mousemove', (e) => {
        createHeartParticle(e.clientX, e.clientY);
    });
});

function createHeartParticle(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10000';
    heart.style.animation = 'heartFloat 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Add heart float animation (injected via JS)
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload fonts
document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
});
