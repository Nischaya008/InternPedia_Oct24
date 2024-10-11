// Change background on button click
const ctaBtn = document.getElementById('cta-btn');
const heroSection = document.querySelector('.hero');

ctaBtn.addEventListener('click', () => {
    heroSection.style.background = "url('https://shorturl.at/1XwVF') no-repeat center center/cover";
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission alert
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    alert("Thank you for reaching out! We will get back to you soon.");
    form.reset(); // Clear form fields after submission
});

// Animate welcome text
document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.getElementById('welcome-text');
    welcomeText.classList.add('fade-in');
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const hero = document.getElementById('hero');

// Add these variables at the top of your script
const lightModeBackground = 'https://shorturl.at/1XwVF';
const darkModeBackground = 'https://shorturl.at/23Pn7';

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Change icon based on mode
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
        hero.style.backgroundImage = `url('${darkModeBackground}')`;
    } else {
        darkModeToggle.textContent = '🌙';
        hero.style.backgroundImage = `url('${lightModeBackground}')`;
    }
});

// Set initial background
hero.style.backgroundImage = `url('${lightModeBackground}')`;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 60; // Adjust this value based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
