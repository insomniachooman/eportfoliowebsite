// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');
const scrollTop = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('section');
const skillLevels = document.querySelectorAll('.skill-level');
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

// Scroll Event Listener
window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Scroll Top Button
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
    
    // Reveal Elements
    revealAnimation();
    
    // Active Nav Item
    updateActiveNavItem();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll to top
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    if (isElementInViewport(document.querySelector('.skills-content'))) {
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = width;
        });
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Reveal animations on scroll
function revealAnimation() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('active');
        }
    });
}

// Update active navigation item based on scroll position
function updateActiveNavItem() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksLi.forEach(li => {
        li.querySelector('a').classList.remove('active');
        if (li.querySelector(`a[href="#${current}"]`)) {
            li.querySelector(`a[href="#${current}"]`).classList.add('active');
        }
    });
}

// Initialize animations and effects on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    setTimeout(revealAnimation, 100);
    
    // Set a fixed height for timeline items to make them uniform
    const timelineContents = document.querySelectorAll('.timeline-content');
    let maxHeight = 0;
    
    timelineContents.forEach(content => {
        if (content.offsetHeight > maxHeight) {
            maxHeight = content.offsetHeight;
        }
    });
    
    timelineContents.forEach(content => {
        content.style.minHeight = `${maxHeight}px`;
    });
    
    // Initialize skill bars
    animateSkillBars();
    
    // Update active nav item on page load
    updateActiveNavItem();
    
    // Form submission handling (if needed)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic would go here
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});
