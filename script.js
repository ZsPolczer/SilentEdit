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

    // Request Modal Logic
    const requestModal = document.getElementById('request-modal');
    const closeModalButton = document.getElementById('close-modal');
    const requestButtons = document.querySelectorAll('.request-button');
    const modalTierName = document.getElementById('modal-tier-name');
    const modalTierPrice = document.getElementById('modal-tier-price');
    const paypalItemName = document.getElementById('paypal-item-name');
    const paypalAmount = document.getElementById('paypal-amount');
    const paypalCustomData = document.getElementById('paypal-custom-data');
    const requestDetailsForm = document.getElementById('request-details-form');
    const paypalRedirectForm = document.getElementById('paypal-redirect-form'); // The form that actually submits to PayPal

    requestButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tierCard = button.closest('[data-tier]');
            const tierName = tierCard.dataset.tier;
            const tierPrice = tierCard.dataset.price;

            modalTierName.value = tierName;
            modalTierPrice.value = tierPrice;

            // Reset form fields when opening
            requestDetailsForm.reset();

            requestModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        });
    });

    closeModalButton.addEventListener('click', () => {
        requestModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal if clicking outside content
    requestModal.addEventListener('click', (e) => {
        if (e.target === requestModal) {
            requestModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle submission of the request details form (inside the modal)
    requestDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const tierName = modalTierName.value;
        const tierPrice = modalTierPrice.value;
        const editStyle = document.getElementById('edit-style').value;
        const songChoice = document.getElementById('song-choice').value;
        const additionalNotes = document.getElementById('additional-notes').value;

        // Construct custom data string for PayPal
        const customData = `Tier: ${tierName}, Style: ${editStyle}, Song: ${songChoice}, Notes: ${additionalNotes}`;

        // Populate PayPal form fields
        paypalItemName.value = `${tierName} Edit Request`;
        paypalAmount.value = tierPrice;
        paypalCustomData.value = customData;

        // Log data for client-side demonstration
        console.log('--- Order Details ---');
        console.log('Tier:', tierName);
        console.log('Price:', tierPrice);
        console.log('Edit Style:', editStyle);
        console.log('Song Choice:', songChoice);
        console.log('Additional Notes:', additionalNotes);
        console.log('PayPal Custom Data:', customData);
        console.log('---------------------');

        // Submit the PayPal form
        paypalRedirectForm.submit();

        // Close modal after submission
        requestModal.classList.remove('active');
        document.body.style.overflow = '';
    });


    // Review Form Logic
    const reviewForm = document.getElementById('review-form');
    const starRatingContainer = document.getElementById('star-rating');
    const reviewRatingValueInput = document.getElementById('review-rating-value');
    let currentRating = 0;

    starRatingContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('star')) {
            const value = parseInt(e.target.dataset.value);
            highlightStars(value);
        }
    });

    starRatingContainer.addEventListener('mouseout', () => {
        highlightStars(currentRating);
    });

    starRatingContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            currentRating = parseInt(e.target.dataset.value);
            reviewRatingValueInput.value = currentRating;
            highlightStars(currentRating);
        }
    });

    function highlightStars(rating) {
        starRatingContainer.querySelectorAll('.star').forEach(star => {
            if (parseInt(star.dataset.value) <= rating) {
                star.classList.add('text-yellow-400');
                star.classList.remove('text-gray-500');
            } else {
                star.classList.remove('text-yellow-400');
                star.classList.add('text-gray-500');
            }
        });
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;
        const reviewRating = reviewRatingValueInput.value;

        if (reviewRating === 0) {
            alert('Please select a star rating.');
            return;
        }

        console.log('--- New Review Submitted ---');
        console.log('Name:', reviewerName);
        console.log('Rating:', reviewRating);
        console.log('Review:', reviewText);
        console.log('---------------------------');

        // In a real application, you would send this data to a backend (e.g., Firestore)
        // for persistent storage and display on the website.
        alert('Thank you for your review! (Note: For persistent storage and public display, a backend system is required.)');

        reviewForm.reset();
        currentRating = 0; // Reset stars
        highlightStars(0);
    });


    // Basic form submission handler for contact form (client-side only)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Contact Form Submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message! We will get back to you soon.');
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

            alert('Admin login functionality requires a secure backend. This is a placeholder.');
            adminLoginForm.reset();
        });
    }
});
