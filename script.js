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