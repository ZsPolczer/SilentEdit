// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Basic form submission handler for contact form (client-side only)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a backend server.
            // For now, we'll just log it and give a simple message.
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Contact Form Submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            // Simple user feedback (replace with a proper modal/message box in a real app)
            alert('Thank you for your message! We will get back to you soon.');

            // Optionally clear the form
            contactForm.reset();
        });
    }

    // Admin login form handler (client-side only, for demonstration)
    const adminLoginForm = document.querySelector('#admin-login form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;

            console.log('Admin Login Attempt:');
            console.log('Username:', username);
            console.log('Password:', password);

            // In a real application, you would send these credentials to a secure backend for authentication.
            // For now, we'll just log and provide a placeholder message.
            alert('Admin login functionality requires a secure backend. This is a placeholder.');

            // Optionally clear the form
            adminLoginForm.reset();
        });
    }
});