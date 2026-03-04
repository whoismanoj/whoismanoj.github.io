/**
 * Navigation Script for Manoj Shakya Website
 * Handles mobile menu toggle, active link highlighting, and component loading
 */

// ===== LOAD COMPONENTS ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  loadNavigation();
  loadProfileHeader();
  initSocialLinks();
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
      placeholder.classList.add('loaded');
      initNavigation(); // Initialize nav scripts after injection
    })
    .catch(error => {
      console.error('Navigation load error:', error);
      // Fallback: minimal nav if component fails
      placeholder.innerHTML = `
        <header class="top-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <a href="index.html">Manoj Shakya</a>
            </div>
          </div>
        </header>`;
    });
}

// Load profile header component (only if placeholder exists)
function loadProfileHeader() {
  const placeholder = document.getElementById('profile-placeholder');
  if (!placeholder) return;
  
  fetch('profile-header-component.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load profile header');
      return response.text();
    })
    .then(data => {
      placeholder.innerHTML = data;
      placeholder.classList.add('loaded');
      initSocialLinks(); // Initialize social link interactions
    })
    .catch(error => {
      console.error('Profile header load error:', error);
      placeholder.style.display = 'none';
    });
}

// Initialize navigation toggle + active page highlighting
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Toggle menu
      navMenu.classList.toggle('active');
      
      // Toggle hamburger animation
      this.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      
      // Subtle haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize social link click effects
function initSocialLinks() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { 
        this.style.transform = ''; 
      }, 150);
    });
  });
}