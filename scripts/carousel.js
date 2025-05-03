document.addEventListener('DOMContentLoaded', () => {
  const totalImages = 28;
  const imagePath = '../assets/images/galleryImg';
  
  const carouselContainer = document.querySelector('.carousel-container');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  let currentSlide = 0;
  const isMobile = window.innerWidth <= 950;
  
  function createSlides() {
    // Clear any existing indicators
    indicatorsContainer.innerHTML = '';
    
    if (isMobile) {
      // Create two rows for mobile view
      const row1 = document.createElement('div');
      row1.className = 'indicator-row';
      const row2 = document.createElement('div');
      row2.className = 'indicator-row';
      
      indicatorsContainer.appendChild(row1);
      indicatorsContainer.appendChild(row2);
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
      
      // Add to appropriate row on mobile or directly to container on desktop
      if (isMobile) {
        // First 14 indicators go to row 1, rest to row 2
        if (i <= 14) {
          indicatorsContainer.querySelector('.indicator-row:first-child').appendChild(indicator);
        } else {
          indicatorsContainer.querySelector('.indicator-row:last-child').appendChild(indicator);
        }
      } else {
        indicatorsContainer.appendChild(indicator);
      }
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
