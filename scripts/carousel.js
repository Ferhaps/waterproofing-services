document.addEventListener('DOMContentLoaded', () => {
  // Configuration for the two carousels
  const carousels = [
    {
      id: 'firstRow',
      totalImages: 12,
      imagePath: 'assets/images/firstRow',
      containerSelector: '.carousel-container-first',
      indicatorsSelector: '.carousel-indicators-first',
      prevButtonSelector: '.carousel-button.prev-first',
      nextButtonSelector: '.carousel-button.next-first',
    },
    {
      id: 'secondRow',
      totalImages: 13,
      imagePath: 'assets/images/secondRow',
      containerSelector: '.carousel-container-second',
      indicatorsSelector: '.carousel-indicators-second',
      prevButtonSelector: '.carousel-button.prev-second',
      nextButtonSelector: '.carousel-button.next-second',
    }
  ];
  
  // Initialize each carousel
  carousels.forEach(carousel => initCarousel(carousel));
  
  function initCarousel(config) {
    const carouselContainer = document.querySelector(config.containerSelector);
    const indicatorsContainer = document.querySelector(config.indicatorsSelector);
    const prevButton = document.querySelector(config.prevButtonSelector);
    const nextButton = document.querySelector(config.nextButtonSelector);
    
    let currentSlide = 0;
    const MAX_INDICATORS_PER_ROW = 15;
    
    // Touch variables for swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    function createSlides() {
      // Clear any existing indicators
      indicatorsContainer.innerHTML = '';
      
      // Calculate how many rows we need for indicators
      const totalRows = Math.ceil(config.totalImages / MAX_INDICATORS_PER_ROW);
      
      // Create rows for indicators
      for (let r = 0; r < totalRows; r++) {
        const row = document.createElement('div');
        row.className = 'indicator-row';
        indicatorsContainer.appendChild(row);
      }
      
      for (let i = 1; i <= config.totalImages; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = `${config.imagePath}${i}.jpg`;
        img.alt = `Gallery Image ${config.id} ${i}`;
        img.loading = 'lazy';
        
        slide.appendChild(img);
        carouselContainer.appendChild(slide);
        
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.dataset.index = i - 1;
        indicator.addEventListener('click', () => goToSlide(i - 1));
        
        // Determine which row this indicator belongs to
        const rowIndex = Math.floor((i - 1) / MAX_INDICATORS_PER_ROW);
        const rows = indicatorsContainer.querySelectorAll('.indicator-row');
        rows[rowIndex].appendChild(indicator);
      }
      
      updateActiveIndicator();
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateSlidePosition();
      updateActiveIndicator();
    }
    
    // Update carousel position
    function updateSlidePosition() {
      carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update active indicator
    function updateActiveIndicator() {
      indicatorsContainer.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
      });
    }
    
    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + config.totalImages) % config.totalImages;
      updateSlidePosition();
      updateActiveIndicator();
    });
    
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % config.totalImages;
      updateSlidePosition();
      updateActiveIndicator();
    });
    
    // Add touch event listeners for mobile swipe functionality
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    // Handle the swipe direction
    function handleSwipe() {
      // Calculate swipe distance
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50; // Minimum distance to register as a swipe
      
      if (swipeDistance > minSwipeDistance) {
        // Swipe from left to right - show previous image
        prevButton.click();
      } else if (swipeDistance < -minSwipeDistance) {
        // Swipe from right to left - show next image
        nextButton.click();
      }
    }
    
    // Initialize carousel
    createSlides();
  }

  // Add keyboard navigation for the visible carousel
  document.addEventListener('keydown', (e) => {
    // Determine which carousel is in the viewport
    const firstCarouselRect = document.querySelector('.carousel-first').getBoundingClientRect();
    const secondCarouselRect = document.querySelector('.carousel-second').getBoundingClientRect();
    
    const windowHeight = window.innerHeight;
    const isFirstVisible = firstCarouselRect.top < windowHeight && firstCarouselRect.bottom > 0;
    const isSecondVisible = secondCarouselRect.top < windowHeight && secondCarouselRect.bottom > 0;
    
    if (e.key === 'ArrowLeft') {
      if (isFirstVisible && !isSecondVisible) {
        document.querySelector('.carousel-button.prev-first').click();
      } else if (isSecondVisible) {
        document.querySelector('.carousel-button.prev-second').click();
      }
    } else if (e.key === 'ArrowRight') {
      if (isFirstVisible && !isSecondVisible) {
        document.querySelector('.carousel-button.next-first').click();
      } else if (isSecondVisible) {
        document.querySelector('.carousel-button.next-second').click();
      }
    }
  });
});
