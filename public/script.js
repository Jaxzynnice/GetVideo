document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const videoUrlInput = document.getElementById('videoUrl');
  const downloadBtn = document.getElementById('downloadBtn');
  const resultsSection = document.getElementById('resultsSection');
  const videoResult = document.getElementById('videoResult');
  const themeToggle = document.getElementById('themeToggle');
  const themeSwitch = document.getElementById('themeSwitch');
  const loadingScreen = document.getElementById('loadingScreen');
  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.querySelector('.side-nav');
  const mainWrapper = document.getElementById('mainWrapper');
  const navCollapseBtn = document.getElementById('navCollapseBtn');
  
  // Show loading screen initially
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
  
  // Theme Toggle
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Update switch
    themeSwitch.checked = isDarkMode;
  }
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      themeSwitch.checked = true;
      themeToggle.querySelector('i').className = 'fas fa-sun';
    }
  }
  
  themeToggle.addEventListener('click', toggleTheme);
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    sideNav.classList.toggle('active');
  });
  
  // Side Nav Collapse
  navCollapseBtn.addEventListener('click', () => {
    sideNav.classList.toggle('collapsed');
    mainWrapper.classList.toggle('nav-collapsed');
  });
  
  // Video Download Functionality
  downloadBtn.addEventListener('click', async function() {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
      showError('Please enter a video URL');
      return;
    }
    
    try {
      // Show loading state
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      
      // Determine the platform and call appropriate endpoint
      let endpoint = '/download/generic';
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        endpoint = '/download/youtube';
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl })
      });
      
      const data = await response.json();
      
      if (data.error) {
        showError(data.error);
        return;
      }
      
      // Display results
      displayVideoResults(data);
      resultsSection.style.display = 'block';
      
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth' });
      
    } catch (error) {
      console.error('Download error:', error);
      showError('Failed to process video. Please try again.');
    } finally {
      // Reset button state
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
    }
  });
  
  // Display Video Results
  function displayVideoResults(data) {
    let html = '';
    
    if (data.formats && data.formats.length > 0) {
      // YouTube results
      html = `
        <div class="video-thumbnail-container">
          <img src="${data.thumbnail}" alt="${data.title}" class="video-thumbnail">
        </div>
        <div class="video-info">
          <h3 class="video-title">${data.title}</h3>
          <div class="download-options">
            <h4>Available Formats:</h4>
      `;
      
      data.formats.forEach(format => {
        html += `
          <div class="quality-option">
            <div class="quality-info">
              <span class="quality-label">${format.quality || 'MP4'}</span>
              <span class="quality-size">${format.type.split(';')[0]}</span>
            </div>
            <a href="${format.url}" class="download-btn" download="${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${format.quality || 'video'}.mp4">
              <i class="fas fa-download"></i> Download
            </a>
          </div>
        `;
      });
      
      html += `</div></div>`;
      
    } else if (data.url) {
      // Generic video result
      html = `
        <div class="video-info">
          <h3 class="video-title">${data.title || 'Video Download'}</h3>
          <div class="download-options">
            <div class="quality-option">
              <div class="quality-info">
                <span class="quality-label">Video</span>
                <span class="quality-size">MP4</span>
              </div>
              <a href="${data.url}" class="download-btn" download="video_download.mp4">
                <i class="fas fa-download"></i> Download
              </a>
            </div>
          </div>
        </div>
      `;
    }
    
    videoResult.innerHTML = html;
  }
  
  // Show error message
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    downloadBtn.parentNode.insertBefore(errorElement, downloadBtn.nextSibling);
    
    // Shake animation
    videoUrlInput.classList.add('shake-animation');
    setTimeout(() => {
      videoUrlInput.classList.remove('shake-animation');
    }, 500);
  }
  
  // Clear input field
  const clearSearch = document.getElementById('clearSearch');
  videoUrlInput.addEventListener('input', function() {
    clearSearch.style.opacity = this.value ? '1' : '0';
    clearSearch.style.pointerEvents = this.value ? 'all' : 'none';
  });
  
  clearSearch.addEventListener('click', function() {
    videoUrlInput.value = '';
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
    videoUrlInput.focus();
  });
});