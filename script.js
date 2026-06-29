document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Scroll-Driven Luxury Revelation Engine
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    // Execute initial check on runtime render and bind to viewport events
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Micro-interaction Engine: Video Hover Control Playback
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const video = card.querySelector('video');

        card.addEventListener('mouseenter', () => {
            if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // Suppress browser initialization blocks gracefully
                        console.debug("Playback engine paused by user gesture policy.", error);
                    });
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0; // Hard reset to timeline start
            }
        });
    });
});
