/**
 * LayComplain Pitch Deck - Navigation & Interactions
 * Handles keyboard navigation, touch gestures, and progress tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const progressFill = document.getElementById('progressFill');
    
    // State
    let currentSlide = 1;
    const totalSlides = slides.length;
    
    // Initialize
    function init() {
        totalSlidesEl.textContent = totalSlides;
        updateSlide();
        setupEventListeners();
    }
    
    // Update the current slide display
    function updateSlide() {
        slides.forEach((slide, index) => {
            const slideNumber = index + 1;
            slide.classList.remove('active', 'exit');
            
            if (slideNumber === currentSlide) {
                slide.classList.add('active');
            } else if (slideNumber < currentSlide) {
                slide.classList.add('exit');
            }
        });
        
        // Update counter
        currentSlideEl.textContent = currentSlide;
        
        // Update progress bar
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Update button states
        prevBtn.disabled = currentSlide === 1;
        nextBtn.disabled = currentSlide === totalSlides;
    }
    
    // Navigate to next slide
    function nextSlide() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateSlide();
        }
    }
    
    // Navigate to previous slide
    function prevSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlide();
        }
    }
    
    // Go to specific slide
    function goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            currentSlide = slideNumber;
            updateSlide();
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Button clicks
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides);
                    break;
            }
            
            // Number keys to jump to specific slides
            if (e.key >= '1' && e.key <= '9') {
                const slideNum = parseInt(e.key);
                if (slideNum <= totalSlides) {
                    goToSlide(slideNum);
                }
            }
            if (e.key === '0') {
                goToSlide(10);
            }
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
        
        // Mouse wheel navigation (optional, commented out by default)
        // Uncomment if you want scroll-based navigation
        /*
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }, 50);
        }, { passive: true });
        */
    }
    
    // Initialize the presentation
    init();
    
    // Console help message
    console.log(`
    📊 LayComplain Pitch Deck Navigation
    =====================================
    → Arrow keys / Space / Enter: Next slide
    ← Arrow keys: Previous slide
    1-9, 0: Jump to specific slide
    Home: First slide
    End: Last slide
    Touch: Swipe left/right
    `);
});
