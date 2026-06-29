/**
 * Glow Beauty Lounge & Spa - Core Interaction Architecture
 * Engineered for high-performance fluid rendering across mobile and desktop.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Desktop High-Inertia Lerped Canvas Cursor Framework
    // ==========================================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const interactiveTargets = document.querySelectorAll('.magnetic-target, .service-card, .team-card, .nav-links a');

    let mouseX = 0, mouseY = 0; // Absolute target coordinates
    let ringX = 0, ringY = 0;   // Interpolated ring coordinates

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate processing vector for central dot aperture
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }, { passive: true });

        // Continuous linear interpolation render loop (Lerping)
        const renderLoop = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderLoop);
        };
        requestAnimationFrame(renderLoop);

        // Bind polymorphic focus triggers to interactive targets
        interactiveTargets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }

    // ==========================================================================
    // 2. High-Inertia Scroll Visibility & Intersection Engine
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealStaggerGrids = document.querySelectorAll('.services-grid, .team-grid');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    // Standard Independent Reveal Handling
    const standardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => standardObserver.observe(el));

    // Automated Sequential Cascading Stagger Matrix Controller
    const gridObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const childCards = entry.target.querySelectorAll('.reveal-stagger');
                childCards.forEach((card, index) => {
                    // Inject staggered execution parameters algorithmically
                    card.style.transitionDelay = `${index * 0.15}s`;
                    card.classList.add('active');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealStaggerGrids.forEach(grid => gridObserver.observe(grid));

    // ==========================================================================
    // 3. Omni-Channel Video Playback Matrix (Touch vs. Pointer States)
    // ==========================================================================
    const serviceCards = document.querySelectorAll('.service-card');

    if (isTouchDevice) {
        // Mobile Viewport Logic: Relies on screen real-estate dominance markers
        const mobileVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;

                if (entry.isIntersecting) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
                    entry.target.classList.add('video-playing');
                } else {
                    video.pause();
                    video.currentTime = 0;
                    entry.target.classList.remove('video-playing');
                }
            });
        }, { root: null, threshold: 0.6 });

        serviceCards.forEach(card => mobileVideoObserver.observe(card));

    } else {
        // Desktop Viewport Logic: Enforces rigid pointer state containment handlers
        serviceCards.forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;

            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
    }
});
