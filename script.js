console.log("Bloom Festival script loaded");

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track) return;

    // Get original slides
    const originalSlides = Array.from(track.children);
    const originalCount = originalSlides.length;

    // Clone slides to ensure we have enough for scrolling
    // We'll triple the content to allow smooth infinite feeling
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    const allSlides = Array.from(track.children);
    let currentIndex = 0;

    // Configuration
    function getSlidesToShow() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    // Initial width adjustment is handled by CSS (w-full or w-1/3)
    // But we need to track index correctly.

    function updateCarousel(smooth = true) {
        const slidesToShow = getSlidesToShow();
        const slideWidthPercent = 100 / slidesToShow;

        if (smooth) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }

        const translateValue = -(currentIndex * slideWidthPercent);
        track.style.transform = `translateX(${translateValue}%)`;
    }

    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const slidesToShow = getSlidesToShow();
            currentIndex++;

            // Limit for simple demo logic: if we go past the second set, reset to first set
            // Total slides = 3 * originalCount.
            // If original is 3, total is 9.
            // We want to loop back seamlessly.

            // Seamless trick:
            // If we reach the end of the cloned set, jump back instantly.
            // This requires `transitionend` listener, but for simplicity:

            updateCarousel();

            if (currentIndex >= originalCount * 2) {
                 setTimeout(() => {
                    currentIndex = originalCount; // Jump back to middle set
                    updateCarousel(false); // No transition
                 }, 500); // Wait for transition to finish
            }
        });
    }

    // Prev Button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();

            if (currentIndex < 0) {
                 setTimeout(() => {
                    currentIndex = originalCount - 1; // Jump to end of first block?
                    // Better: current index becomes (originalCount) technically?
                    // Let's settle on: We start at 0 (first set).
                    // If we go < 0, we jump to end of middle set.
                    currentIndex = originalCount * 2 - 1;
                    updateCarousel(false);
                 }, 500);
            }
        });
    }

    // Mobile Swipe (Basic Touch)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe Left -> Next
            const slidesToShow = getSlidesToShow();
            currentIndex++;
            updateCarousel();
             if (currentIndex >= originalCount * 2) {
                 setTimeout(() => { currentIndex = originalCount; updateCarousel(false); }, 500);
            }
        }
        if (touchEndX > touchStartX + threshold) {
            // Swipe Right -> Prev
            currentIndex--;
            updateCarousel();
             if (currentIndex < 0) {
                 setTimeout(() => { currentIndex = originalCount * 2 - 1; updateCarousel(false); }, 500);
            }
        }
    }

    // Reset on resize
    window.addEventListener('resize', () => {
        updateCarousel(false);
    });

    // Auto Play (Optional but good for infinite loop feel)
    setInterval(() => {
        // Only autoplay if user isn't hovering?
        // For MVP, basic logic:
        if (window.innerWidth >= 768) { // Only desktop usually requests infinite loop
             const slides = getSlidesToShow();
             currentIndex++;
             updateCarousel();
             if (currentIndex >= originalCount * 2) {
                 setTimeout(() => { currentIndex = originalCount; updateCarousel(false); }, 500);
            }
        }
    }, 4000); // 4 seconds
}
