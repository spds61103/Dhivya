/**
 * Dhivya S P Portfolio JavaScript Logic
 * Interactive actions: light/dark toggle, sticky nav, mobile menu, scroll spying, and fade-in animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');
    const header = document.querySelector('.site-header');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const fadeElements = document.querySelectorAll('.fade-in');
    const sections = document.querySelectorAll('section[id]');

    // ==========================================
    // 1. Theme Management (Light / Dark Mode)
    // ==========================================
    const savedTheme = localStorage.getItem('theme');
    
    // Default setting: system preference or light
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.className = 'dark-mode';
        } else {
            body.className = 'light-mode';
        }
    }

    // Toggle theme callback
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // ==========================================
    // 2. Sticky Header scroll styling
    // ==========================================
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check in case of page refresh

    // ==========================================
    // 3. Mobile Navigation Hamburger Menu
    // ==========================================
    mobileNavToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            mobileNavToggle.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('open');
            mobileNavToggle.classList.add('open');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
        }
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileNavToggle.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile nav when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            mobileNavToggle.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ==========================================
    // 4. Fade-in on Scroll Animation (Intersection Observer)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const fadeObserverOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, fadeObserverOptions);

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(element => {
            element.classList.add('appear');
        });
    }

    // ==========================================
    // 5. ScrollSpy (Highlight active link in navbar)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const spyObserverOptions = {
            threshold: 0.25,
            rootMargin: '-20% 0px -60% 0px' // Adjust scroll zone for focus trigger
        };

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, spyObserverOptions);

        sections.forEach(section => {
            spyObserver.observe(section);
        });
    }
});
