// script.js
// Theme Management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'dark';

function initTheme() {
    body.setAttribute('data-theme', currentTheme);
    themeToggle.querySelector('i').className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    themeToggle.querySelector('i').className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .department-card, .stat-card, .rank-group').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000;
    const step = 50;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / (duration / step);

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, step);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats-section'));

// Daily Stats Update
function updateDailyStats() {
    const now = new Date();
    const lastUpdate = localStorage.getItem('lastStatsUpdate');
    
    if (!lastUpdate || now.getDate() !== new Date(lastUpdate).getDate()) {
        let missions = parseInt(localStorage.getItem('missions') || '0') + 30;
        let lives = parseInt(localStorage.getItem('lives') || '0') + 20;
        
        localStorage.setItem('missions', missions);
        localStorage.setItem('lives', lives);
        localStorage.setItem('lastStatsUpdate', now.toDateString());
        
        document.querySelector('.stat-number:nth-child(2)').setAttribute('data-target', missions);
        document.querySelector('.stat-number:nth-child(3)').setAttribute('data-target', lives);
    }
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);
    
    initTheme();
    updateDailyStats();
});

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
