document.addEventListener('DOMContentLoaded', () => {
  const totalImages = 33;
  const imagePath = '../assets/images/galleryImg';
  
  const carouselContainer = document.querySelector('.carousel-container');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  let currentSlide = 0;
  const MAX_INDICATORS_PER_ROW = 15;
  
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
  
  // Initialize carousel
  createSlides();
  
  // Optional: Auto-advance slides
  let autoSlideInterval = setInterval(() => {
    nextButton.click();
  }, 5000);
  
  // Pause auto-advance when hovering over carousel
  document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      nextButton.click();
    }, 5000);
  });
});
