/**
 * ====================================
 * WALTOP CATERING SERVICES
 * Main JavaScript File
 * ====================================
 * 
 * Table of Contents:
 * 1. DOM Elements
 * 2. Mobile Navigation
 * 3. Header Scroll Effect
 * 4. Dark/Light Theme Toggle
 * 5. Smooth Scroll Navigation
 * 6. Scroll Animations (Fade In)
 * 7. Back to Top Button
 * 8. Testimonials Carousel
 * 9. Menu Category Filter
 * 10. Contact Form Validation
 * 11. Stats Counter Animation
 * 12. Parallax Effect
 * 13. Initialize
 */

'use strict';

// ====================================
// 1. DOM Elements
// ====================================

// Navigation Elements
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

// Testimonials Carousel
const testimonialTrack = document.getElementById('testimonials-track');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialDots = document.getElementById('testimonial-dots');

// Menu Filter
const menuNavBtns = document.querySelectorAll('.menu-nav__btn');
const menuGrid = document.getElementById('menu-grid');

// Contact Form
const contactForm = document.getElementById('contact-form');

// Fade In Elements
const fadeElements = document.querySelectorAll('.fade-in');

// Stats Numbers
const statsNumbers = document.querySelectorAll('.stats__number');

// ====================================
// 2. Mobile Navigation
// ====================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    if (navMenu) {
        navMenu.classList.toggle('show');
        
        // Update ARIA attribute
        const isOpen = navMenu.classList.contains('show');
        navToggle?.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
}

/**
 * Close mobile navigation menu
 */
function closeMobileMenu() {
    if (navMenu) {
        navMenu.classList.remove('show');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Event Listeners for mobile menu
navToggle?.addEventListener('click', toggleMobileMenu);
navClose?.addEventListener('click', closeMobileMenu);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('show') && 
        !navMenu.contains(e.target) && 
        !navToggle?.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('show')) {
        closeMobileMenu();
    }
});

// ====================================
// 3. Header Scroll Effect
// ====================================

/**
 * Add/remove scrolled class based on scroll position
 */
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ====================================
// 4. Dark/Light Theme Toggle
// ====================================

/**
 * Get saved theme from localStorage or system preference
 * @returns {string} Theme name ('dark' or 'light')
 */
function getSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

/**
 * Apply theme to document
 * @param {string} theme - Theme name ('dark' or 'light')
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme
applyTheme(getSavedTheme());

// Event listener for theme toggle
themeToggle?.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// ====================================
// 5. Smooth Scroll Navigation
// ====================================

/**
 * Smooth scroll to section when clicking anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only handle actual hash links
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// 6. Scroll Animations (Fade In)
// ====================================

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Percentage of element that must be visible (0-1)
 * @returns {boolean} Whether element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * (1 - threshold) &&
        rect.bottom >= 0
    );
}

/**
 * Handle scroll animations for fade-in elements
 */
function handleScrollAnimations() {
    fadeElements.forEach(element => {
        if (isInViewport(element, 0.15)) {
            element.classList.add('visible');
        }
    });
}

// Initial check and scroll listener
handleScrollAnimations();
window.addEventListener('scroll', handleScrollAnimations, { passive: true });

// ====================================
// 7. Back to Top Button
// ====================================

/**
 * Show/hide back to top button based on scroll position
 */
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners
window.addEventListener('scroll', handleBackToTop, { passive: true });
backToTop?.addEventListener('click', scrollToTop);

// ====================================
// 8. Testimonials Carousel
// ====================================

let testimonialIndex = 0;
let testimonialCount = 0;
let autoPlayInterval = null;

/**
 * Initialize testimonials carousel
 */
function initTestimonialsCarousel() {
    if (!testimonialTrack) return;
    
    const testimonials = testimonialTrack.querySelectorAll('.testimonial__card');
    testimonialCount = testimonials.length;
    
    if (testimonialCount === 0) return;
    
    // Create dots
    if (testimonialDots) {
        testimonialDots.innerHTML = '';
        for (let i = 0; i < testimonialCount; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => goToTestimonial(i));
            testimonialDots.appendChild(dot);
        }
    }
    
    // Start autoplay
    startAutoPlay();
    
    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', stopAutoPlay);
    testimonialTrack.addEventListener('mouseleave', startAutoPlay);
}

/**
 * Update carousel position
 */
function updateCarousel() {
    if (!testimonialTrack) return;
    
    const testimonials = testimonialTrack.querySelectorAll('.testimonial__card');
    if (testimonials.length === 0) return;
    
    // Get card width including gap
    const cardWidth = testimonials[0].offsetWidth;
    const gap = 32; // var(--space-8) = 2rem = 32px
    
    // Calculate items visible based on screen width
    let itemsVisible = 1;
    if (window.innerWidth >= 992) {
        itemsVisible = 3;
    } else if (window.innerWidth >= 768) {
        itemsVisible = 2;
    }
    
    // Adjust max index based on visible items
    const maxIndex = Math.max(0, testimonialCount - itemsVisible);
    testimonialIndex = Math.min(testimonialIndex, maxIndex);
    
    const offset = testimonialIndex * (cardWidth + gap);
    testimonialTrack.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    const dots = testimonialDots?.querySelectorAll('.carousel__dot');
    dots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === testimonialIndex);
    });
}

/**
 * Go to specific testimonial
 * @param {number} index - Index of testimonial to show
 */
function goToTestimonial(index) {
    testimonialIndex = index;
    updateCarousel();
}

/**
 * Go to next testimonial
 */
function nextTestimonial() {
    let itemsVisible = 1;
    if (window.innerWidth >= 992) {
        itemsVisible = 3;
    } else if (window.innerWidth >= 768) {
        itemsVisible = 2;
    }
    
    const maxIndex = Math.max(0, testimonialCount - itemsVisible);
    testimonialIndex = testimonialIndex >= maxIndex ? 0 : testimonialIndex + 1;
    updateCarousel();
}

/**
 * Go to previous testimonial
 */
function prevTestimonial() {
    let itemsVisible = 1;
    if (window.innerWidth >= 992) {
        itemsVisible = 3;
    } else if (window.innerWidth >= 768) {
        itemsVisible = 2;
    }
    
    const maxIndex = Math.max(0, testimonialCount - itemsVisible);
    testimonialIndex = testimonialIndex <= 0 ? maxIndex : testimonialIndex - 1;
    updateCarousel();
}

/**
 * Start carousel autoplay
 */
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextTestimonial, 5000);
}

/**
 * Stop carousel autoplay
 */
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Event listeners for carousel controls
testimonialPrev?.addEventListener('click', () => {
    prevTestimonial();
    stopAutoPlay();
    startAutoPlay();
});

testimonialNext?.addEventListener('click', () => {
    nextTestimonial();
    stopAutoPlay();
    startAutoPlay();
});

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);

// ====================================
// 9. Menu Category Filter
// ====================================

/**
 * Filter menu items by category
 * @param {string} category - Category to filter by ('all' for all items)
 */
function filterMenuItems(category) {
    if (!menuGrid) return;
    
    const menuItems = menuGrid.querySelectorAll('.menu__card');
    
    menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            item.style.display = '';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
}

// Event listeners for menu filter buttons
menuNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        menuNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        const category = btn.getAttribute('data-category');
        filterMenuItems(category);
    });
});

// ====================================
// 10. Contact Form Validation
// ====================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for form field
 * @param {string} fieldId - ID of the field
 * @param {string} message - Error message to show
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear error message for form field
 * @param {string} fieldId - ID of the field
 */
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Validate contact form
 * @returns {boolean} Whether form is valid
 */
function validateContactForm() {
    let isValid = true;
    
    // First Name
    const firstName = document.getElementById('firstName');
    if (!firstName?.value.trim()) {
        showError('firstName', 'First name is required');
        isValid = false;
    } else {
        clearError('firstName');
    }
    
    // Last Name
    const lastName = document.getElementById('lastName');
    if (!lastName?.value.trim()) {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else {
        clearError('lastName');
    }
    
    // Email
    const email = document.getElementById('email');
    if (!email?.value.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Subject
    const subject = document.getElementById('subject');
    if (!subject?.value) {
        showError('subject', 'Please select a subject');
        isValid = false;
    } else {
        clearError('subject');
    }
    
    // Message
    const message = document.getElementById('message');
    if (!message?.value.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }
    
    return isValid;
}

/**
 * Handle contact form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit() {
    
    if (!validateContactForm()) {
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    
    // Show loading state
    submitBtn?.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn?.classList.remove('loading');
        
        // Show success message
        successMessage?.classList.add('show');
        
        // Reset form
        contactForm?.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage?.classList.remove('show');
        }, 5000);
    }, 1500);
}

// Event listener for form submission
contactForm?.addEventListener('submit', handleFormSubmit);

// Clear errors on input
document.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
    field.addEventListener('input', () => {
        clearError(field.id);
    });
    
    field.addEventListener('change', () => {
        clearError(field.id);
    });
});

// ====================================
// 11. Stats Counter Animation
// ====================================

/**
 * Animate number counting up
 * @param {Element} element - Element containing the number
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Check if stats section is in view and animate counters
 */
let statsAnimated = false;

function checkStatsAnimation() {
    if (statsAnimated) return;
    
    statsNumbers.forEach(stat => {
        if (isInViewport(stat, 0.5)) {
            statsAnimated = true;
            
            statsNumbers.forEach(s => {
                const target = parseInt(s.getAttribute('data-target'), 10);
                if (!isNaN(target)) {
                    animateCounter(s, target);
                }
            });
        }
    });
}

window.addEventListener('scroll', checkStatsAnimation, { passive: true });

// ====================================
// 12. Parallax Effect
// ====================================

/**
 * Apply parallax effect to elements
 */
function handleParallax() {
    const parallaxElements = document.querySelectorAll('.hero__parallax, .page-hero__parallax, .cta__parallax, .stats__parallax');
    
    parallaxElements.forEach(element => {
        const scrolled = window.scrollY;
        const rect = element.getBoundingClientRect();
        const parentTop = rect.top + scrolled;
        
        // Only apply parallax when element is in view
        if (scrolled + window.innerHeight > parentTop && scrolled < parentTop + rect.height) {
            const speed = 0.3;
            const offset = (scrolled - parentTop) * speed;
            element.style.transform = `translateY(${offset}px)`;
        }
    });
}

window.addEventListener('scroll', handleParallax, { passive: true });

// ====================================
// 13. Initialize
// ====================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    // Initial checks
    handleHeaderScroll();
    handleScrollAnimations();
    handleBackToTop();
    checkStatsAnimation();
    
    // Initialize components
    initTestimonialsCarousel();
    
    // Log initialization
    console.log('Waltop Catering Services - Website Initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ====================================
// Keyboard Navigation Support
// ====================================

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    // Only if testimonial carousel is focused or its parent
    const carouselContainer = document.querySelector('.testimonials__carousel');
    if (!carouselContainer) return;
    
    const isCarouselFocused = carouselContainer.contains(document.activeElement);
    
    if (isCarouselFocused) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    }
});

// ====================================
// Performance Optimization
// ====================================

// Debounce function for resize events
function debounce(func, wait = 100) {
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

// Debounced resize handler
const handleResize = debounce(() => {
    updateCarousel();
    handleScrollAnimations();
}, 150);

window.addEventListener('resize', handleResize);

//terms modal
function openModal(id) {
    document.getElementById(id).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  window.addEventListener('click', function (event) {
    const modals = document.querySelectorAll('.legal-modal');

    modals.forEach(function (modal) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  document.getElementById("currentYear").textContent = new Date().getFullYear();