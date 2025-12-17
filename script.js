// ===========================
// GLOBAL STATE
// ===========================

let currentTheme = 'tech';
let particles = [];
const particleCount = 50;

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollAnimations();
    initParticles();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initThemeToggle();
    initSmoothScroll();
    initCarousel();
    initMiniWebsite();
    initGame();
    initAutomation();
});

// ===========================
// THEME MANAGEMENT
// ===========================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'tech';
    setTheme(savedTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active state of theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });
    
    // Regenerate particles with new theme colors
    clearParticles();
    initParticles();
}

function initThemeToggle() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setTheme(theme);
            
            // Add click animation
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 200);
        });
    });
}

// ===========================
// NAVIGATION
// ===========================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// PARTICLES SYSTEM
// ===========================

function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particles.push(particle);
        particlesContainer.appendChild(particle.element);
    }
    
    // Animate particles
    animateParticles();
}

function createParticle() {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.width = `${Math.random() * 4 + 2}px`;
    element.style.height = element.style.width;
    element.style.borderRadius = '50%';
    element.style.pointerEvents = 'none';
    
    const colors = getThemeColors();
    element.style.background = colors[Math.floor(Math.random() * colors.length)];
    element.style.boxShadow = `0 0 10px ${element.style.background}`;
    
    return {
        element,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100
    };
}

function getThemeColors() {
    const theme = document.body.getAttribute('data-theme');
    
    const themeColors = {
        'tech': ['#00ffff', '#ff00ff', '#00ff88'],
        'night-sky': ['#ffd700', '#9370db', '#4169e1'],
        'water': ['#00bfff', '#1e90ff', '#48d1cc'],
        'pastel': ['#ffb3ba', '#bae1ff', '#ffffba']
    };
    
    return themeColors[theme] || themeColors.tech;
}

function animateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.5;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Update position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Pulsing opacity
        const opacity = (Math.sin(particle.life * 0.05) + 1) / 2 * 0.6;
        particle.element.style.opacity = opacity;
    });
    
    requestAnimationFrame(animateParticles);
}

function clearParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
    particles = [];
}

// ===========================
// TYPING EFFECT
// ===========================

function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) return;
    
    const phrases = [
        'Network Administrator',
        'Cybersecurity Expert',
        'Full Stack Developer',
        'Ethical Hacker',
        'AI Automation Specialist',
        'DevOps Engineer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===========================
// COUNTER ANIMATIONS
// ===========================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + (target === 99 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
        }
    }, 16);
}

// ===========================
// SKILL BARS ANIMATION
// ===========================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===========================
// SCROLL ANIMATIONS (AOS)
// ===========================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
}

// ===========================
// TERMINAL ANIMATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const terminalWindow = document.querySelector('.terminal-window');
    
    if (terminalWindow) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTerminal();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(terminalWindow);
    }
});

function animateTerminal() {
    const typingElements = document.querySelectorAll('.terminal-body .typing-effect');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
        }, index * 1000);
    });
}

// ===========================
// PARALLAX EFFECT
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for hero section - faster scroll away
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
        // Fade out as user scrolls
        const opacity = Math.max(0, 1 - (scrolled / 600));
        heroSection.style.opacity = opacity;
    }
    
    // Parallax for animated background
    const circuitLines = document.querySelector('.circuit-lines');
    if (circuitLines) {
        circuitLines.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    }
});

// ===========================
// CURSOR GLOW EFFECT
// ===========================

document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.width = '5px';
    glow.style.height = '5px';
    glow.style.borderRadius = '50%';
    glow.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    glow.style.pointerEvents = 'none';
    glow.style.opacity = '0.5';
    glow.style.zIndex = '9999';
    glow.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        glow.style.transform = 'scale(3)';
        glow.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        glow.remove();
    }, 300);
});

// ===========================
// WINDOW RESIZE HANDLER
// ===========================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        clearParticles();
        initParticles();
    }, 250);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Reduce animations on low-power devices
if (navigator.userAgent.includes('Mobile')) {
    document.body.classList.add('reduce-motion');
}

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// ===========================
// INTERSECTION OBSERVER POLYFILL CHECK
// ===========================

if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
    });
}

// ===========================
// CONSOLE EASTER EGG
// ===========================

console.log('%c👨‍💻 Welcome to Anthony Terrano\'s Portfolio!', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%c🔒 Network Security | 💻 Full Stack Dev | 🛡️ Cybersecurity', 'color: #ff00ff; font-size: 14px;');
console.log('%cInterested in the code? Check out the repository!', 'color: #00ff88; font-size: 12px;');

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

document.addEventListener('keydown', (e) => {
    // Theme switching with number keys
    if (e.key === '1') setTheme('tech');
    if (e.key === '2') setTheme('night-sky');
    if (e.key === '3') setTheme('water');
    if (e.key === '4') setTheme('pastel');
    
    // Scroll to top with Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Scroll to bottom with End key
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ===========================
// GLITCH TEXT EFFECT ON HOVER
// ===========================

document.querySelectorAll('.glitch').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitchTitle 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitchTitle 5s infinite';
    });
});

// ===========================
// SECTION TRANSITIONS
// ===========================

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ===========================
// TECH ICON ANIMATIONS
// ===========================

document.querySelectorAll('.tech-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===========================
// LOADING ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// PROGRESSIVE ENHANCEMENT
// ===========================

// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
    // Disable complex animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================

let currentSlide = 0;
const totalSlides = 3;

function initCarousel() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!prevBtn || !nextBtn) return;
    
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const track = document.querySelector('.carousel-track');
    
    if (!track) return;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// ===========================
// MINI WEBSITE DEMO
// ===========================

function initMiniWebsite() {
    const miniLinks = document.querySelectorAll('.mini-link');
    const miniPages = document.querySelectorAll('.mini-page');
    
    if (!miniLinks.length) return;
    
    miniLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            
            // Update active link
            miniLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active page
            miniPages.forEach(page => {
                page.classList.remove('active');
                if (page.getAttribute('data-page') === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });
}

// Notification function for mini website
window.showNotification = function() {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    notification.style.color = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '10px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideInRight 0.3s ease';
    notification.textContent = '✨ Interactive element clicked!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
};

// ===========================
// GAME DEMO
// ===========================

function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const startBtn = document.getElementById('startGame');
    const scoreElement = document.getElementById('gameScore');
    
    if (!canvas || !startBtn) return;
    
    const ctx = canvas.getContext('2d');
    let gameRunning = false;
    let score = 0;
    let player = {
        x: 50,
        y: canvas.height - 60,
        width: 30,
        height: 30,
        velocityY: 0,
        jumping: false
    };
    let obstacles = [];
    let obstacleTimer = 0;
    let gameLoop;
    
    const keys = {};
    
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if ((e.key === 'j' || e.key === 'J') && !player.jumping && gameRunning) {
            player.velocityY = -12;
            player.jumping = true;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    startBtn.addEventListener('click', startGame);
    
    function startGame() {
        gameRunning = true;
        score = 0;
        obstacles = [];
        player.y = canvas.height - 60;
        player.velocityY = 0;
        player.jumping = false;
        startBtn.textContent = 'Game Running...';
        startBtn.disabled = true;
        
        gameLoop = setInterval(updateGame, 1000 / 60);
    }
    
    function updateGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update player
        if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += 5;
        
        // Gravity
        player.velocityY += 0.5;
        player.y += player.velocityY;
        
        // Ground collision
        if (player.y >= canvas.height - player.height - 30) {
            player.y = canvas.height - player.height - 30;
            player.velocityY = 0;
            player.jumping = false;
        }
        
        // Draw ground
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        
        // Draw player
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Create obstacles
        obstacleTimer++;
        if (obstacleTimer > 90) {
            obstacles.push({
                x: canvas.width,
                y: canvas.height - 60,
                width: 30,
                height: 30
            });
            obstacleTimer = 0;
        }
        
        // Update and draw obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].x -= 5;
            
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
            
            // Check collision
            if (checkCollision(player, obstacles[i])) {
                endGame();
                return;
            }
            
            // Remove off-screen obstacles and increment score
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
                score++;
                scoreElement.textContent = score;
            }
        }
    }
    
    function checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    function endGame() {
        gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Play Again';
        startBtn.disabled = false;
        
        // Game over text
        ctx.fillStyle = '#ff00ff';
        ctx.font = '48px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Rajdhani';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    }
}

// ===========================
// AUTOMATION BUILDER DEMO
// ===========================

function initAutomation() {
    const actionItems = document.querySelectorAll('.action-item');
    const canvas = document.getElementById('automationCanvas');
    const clearBtn = document.getElementById('clearAutomation');
    const runBtn = document.getElementById('runAutomation');
    
    if (!canvas || !clearBtn || !runBtn) return;
    
    let droppedActions = [];
    
    // Make action items draggable
    actionItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });
    
    // Canvas drop handlers
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    
    // Button handlers
    clearBtn.addEventListener('click', clearAllActions);
    runBtn.addEventListener('click', runAutomation);
    
    function handleDragStart(e) {
        e.dataTransfer.setData('action', e.target.getAttribute('data-action'));
        e.dataTransfer.setData('icon', e.target.querySelector('i').className);
        e.dataTransfer.setData('text', e.target.textContent.trim());
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        canvas.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        canvas.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        
        const action = e.dataTransfer.getData('action');
        const icon = e.dataTransfer.getData('icon');
        const text = e.dataTransfer.getData('text');
        
        addActionToCanvas(action, icon, text);
    }
    
    function addActionToCanvas(action, icon, text) {
        const actionElement = document.createElement('div');
        actionElement.className = 'dropped-action';
        actionElement.innerHTML = `
            <div class="action-content">
                <i class="${icon}"></i>
                <span>${text}</span>
            </div>
            <div class="remove-action">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        canvas.appendChild(actionElement);
        canvas.classList.add('has-items');
        droppedActions.push({ action, icon, text });
        
        // Add remove handler
        actionElement.querySelector('.remove-action').addEventListener('click', function() {
            actionElement.remove();
            const index = Array.from(canvas.children).indexOf(actionElement);
            droppedActions.splice(index, 1);
            if (droppedActions.length === 0) {
                canvas.classList.remove('has-items');
            }
        });
    }
    
    function clearAllActions() {
        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }
        
        // Re-add placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'canvas-placeholder';
        placeholder.innerHTML = `
            <i class="fas fa-hand-pointer"></i>
            <p>Drag and drop actions here to build your automation workflow</p>
        `;
        canvas.appendChild(placeholder);
        
        canvas.classList.remove('has-items');
        droppedActions = [];
    }
    
    function runAutomation() {
        if (droppedActions.length === 0) {
            showAutomationNotification('⚠️ No actions to run!', '#ff00ff');
            return;
        }
        
        showAutomationNotification('🚀 Automation running...', '#00ff88');
        
        // Define action descriptions
        const actionDescriptions = {
            trigger: [
                'User visits a URL',
                'Form submitted',
                'Button clicked',
                'Page loaded'
            ],
            webhook: [
                'URL sent to agent',
                'POST request sent',
                'API endpoint called',
                'Data transmitted'
            ],
            ai: [
                'AI input ingesting...',
                'Processing data...',
                'Output generated'
            ],
            database: [
                'Connecting to database...',
                'Query executed',
                'Data stored successfully'
            ],
            condition: [
                'Evaluating conditions...',
                'Checking parameters',
                'Condition met ✓'
            ],
            api: [
                'Calling external API...',
                'Response received',
                'Data parsed'
            ]
        };
        
        // Animate each action
        const actions = canvas.querySelectorAll('.dropped-action');
        actions.forEach((actionElement, index) => {
            setTimeout(() => {
                const actionType = droppedActions[index].action;
                const descriptions = actionDescriptions[actionType] || ['Processing...', 'Complete'];
                const content = actionElement.querySelector('.action-content span');
                const originalText = content.textContent;
                
                // Green background
                actionElement.style.background = 'rgba(0, 255, 136, 0.2)';
                actionElement.style.borderColor = '#00ff88';
                
                // Animate through descriptions
                let descIndex = 0;
                const descInterval = setInterval(() => {
                    if (descIndex < descriptions.length) {
                        content.textContent = descriptions[descIndex];
                        content.style.fontSize = '0.85rem';
                        descIndex++;
                    } else {
                        clearInterval(descInterval);
                        // Reset after completion
                        setTimeout(() => {
                            content.textContent = originalText;
                            content.style.fontSize = '';
                            actionElement.style.background = '';
                            actionElement.style.borderColor = '';
                        }, 800);
                    }
                }, 800);
                
            }, index * 2400); // Increased timing to accommodate multiple messages
        });
        
        setTimeout(() => {
            showAutomationNotification('✅ Automation completed successfully!', '#00ff88');
        }, droppedActions.length * 2400 + 1000);
    }
    
    function showAutomationNotification(message, color) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = color;
        notification.style.color = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '10px';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideInRight 0.3s ease';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for debugging (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioDebug = {
        setTheme,
        initParticles,
        clearParticles,
        currentTheme: () => currentTheme
    };
}
