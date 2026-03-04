/**
 * Navigation Script for Manoj Shakya Website
 * Handles mobile menu toggle and active link highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      // Toggle button icon
      this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.textContent = '☰';
      }
    });
    
    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          navMenu.classList.remove('active');
          navToggle.textContent = '☰';
        }
      });
    });
  }
  
  // Handle active link highlighting based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});


// Subtle click feedback for social icons
document.addEventListener('DOMContentLoaded', function() {
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});


// ===== LOAD COMPONENTS ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  loadNavigation();
  loadProfileHeader(); // Only runs if placeholder exists
});

// Load navigation component
function loadNavigation() {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;
  
  fetch('nav-component.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navigation');
      return response.text();
    })
    .then(data => {
      placeholder.innerHTML = data;
      initNavigation(); // Initialize nav scripts after injection
    })
    .catch(error => {
      console.error('Navigation load error:', error);
      // Fallback: minimal nav if component fails
      placeholder.innerHTML = `
        <header class="top-nav">
          <div class="nav-container">
            <div class="nav-brand"><a href="index.html">Manoj Shakya</a></div>
          </div>
        </header>`;
    });
}

// Load profile header component (only if placeholder exists)
function loadProfileHeader() {
  const placeholder = document.getElementById('profile-placeholder');
  if (!placeholder) return; // Skip if page doesn't need profile header
  
  fetch('profile-header-component.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load profile header');
      return response.text();
    })
    .then(data => {
      placeholder.innerHTML = data;
      initSocialLinks(); // Initialize social link interactions
    })
    .catch(error => {
      console.error('Profile header load error:', error);
      // Optional: fallback content or hide placeholder
      placeholder.style.display = 'none';
    });
}

// Initialize navigation toggle + active page highlighting
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Initialize social link click effects
function initSocialLinks() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });
}