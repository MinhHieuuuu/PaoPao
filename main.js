/* ==========================================================================
   DEV BIO - DISCORD BOT SERVICES
   JAVASCRIPT LOGIC & INTERACTION MODULES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year Update
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Initialize Canvas Particle Background
    initParticleBackground();
});

/* --------------------------------------------------------------------------
   1. DISCORD USERNAME CLIPBOARD COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function handleDiscordClick(discordId) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(discordId).then(() => {
            showToast(`Đã sao chép: ${discordId}`);
        }).catch(() => {
            showToast(`Discord Tag: ${discordId}`);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = discordId;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Đã sao chép: ${discordId}`);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast-notif');
    const toastText = document.getElementById('toast-text');
    
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* --------------------------------------------------------------------------
   2. PRICING MODAL POPUP LOGIC
   -------------------------------------------------------------------------- */
function openPricingModal() {
    const modal = document.getElementById('pricing-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
}

function closePricingModal() {
    const modal = document.getElementById('pricing-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scrolling
    }
}

function closePricingModalOnOutside(e) {
    if (e.target && e.target.classList.contains('modal-overlay')) {
        closePricingModal();
    }
}

function selectPackage(packageName) {
    closePricingModal();
    window.open('https://discord.com/users/354094724916707328', '_blank');
}

/* --------------------------------------------------------------------------
   3. BACKGROUND PARTICLE NETWORK ANIMATION (CYBER CANVAS)
   -------------------------------------------------------------------------- */
function initParticleBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ';
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color + '0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Connect nearby particles with subtle glowing lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateBackground);
    }

    animateBackground();
}
