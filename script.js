/**
 * Glow Beauty Lounge & Spa - Core Interaction Architecture
 * Engineered for high-performance fluid rendering across mobile and desktop.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Scroll-Driven Luxury Revelation Engine
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        // Establishes target operational threshold at 80% viewport depth
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    // Execute baseline view evaluation and register window listeners
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // ==========================================================================
    // 2. Omni-Channel Video Playback Matrix (Touch vs. Pointer States)
    // ==========================================================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Hardware capability check for touch-interface environments
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Mobile Implementation: Deploys IntersectionObserver to manage viewport focus
        const observerOptions = {
            root: null,
            threshold: 0.6 // Execute target state when element fills 60% of viewport
        };

        const mobileVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;

                if (entry.isIntersecting) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // Mitigates programmatic autoplay blocks safely
                        });
                    }
                    entry.target.classList.add('video-playing');
                } else {
                    video.pause();
                    video.currentTime = 0; // Hardware layer resource reset
                    entry.target.classList.remove('video-playing');
                }
            });
        }, observerOptions);

        serviceCards.forEach(card => mobileVideoObserver.observe(card));

    } else {
        // Desktop Implementation: Retains continuous hardware pointer listeners
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
