document.addEventListener('DOMContentLoaded', () => {
  const totalImages = 33;
  const imagePath = 'assets/images/galleryImg';
  
  const carouselContainer = document.querySelector('.carousel-container');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  let currentSlide = 0;
  const MAX_INDICATORS_PER_ROW = 15;
  
  // Touch variables for swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  function createSlides() {
    // Clear any existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Calculate how many rows we need
    const totalRows = Math.ceil(totalImages / MAX_INDICATORS_PER_ROW);
    
    // Create rows for indicators
    for (let r = 0; r < totalRows; r++) {
      const row = document.createElement('div');
      row.className = 'indicator-row';
      indicatorsContainer.appendChild(row);
    }
    
    for (let i = 1; i <= totalImages; i++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      const img = document.createElement('img');
      img.src = `${imagePath}${i}.jpg`;
      img.alt = `Gallery Image ${i}`;
      img.loading = 'lazy';
      
      slide.appendChild(img);
      carouselContainer.appendChild(slide);
      
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.dataset.index = i - 1;
      indicator.addEventListener('click', () => goToSlide(i - 1));
      
      // Determine which row this indicator belongs to
      const rowIndex = Math.floor((i - 1) / MAX_INDICATORS_PER_ROW);
      const rows = document.querySelectorAll('.indicator-row');
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
    document.querySelectorAll('.indicator').forEach((ind, i) => {
      ind.classList.toggle('active', i === currentSlide);
    });
  }
  
  // Event listeners for navigation
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalImages) % totalImages;
    updateSlidePosition();
    updateActiveIndicator();
  });
  
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalImages;
    updateSlidePosition();
    updateActiveIndicator();
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      nextButton.click();
    }
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
});
