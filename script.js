document.addEventListener('DOMContentLoaded', () => {
  // Toggle the mobile navigation menu
  function toggleMenu() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('active');
  }

  // Add event listener for mobile menu toggle (if a menu button exists)
  const menuButton = document.querySelector('.menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }

  // Scroll reveal animation for sections with class .content
  function revealOnScroll() {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (scrollPosition > sectionTop + 50) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // Dark mode toggle with persistence
  const darkModeToggle = document.createElement('button');
  darkModeToggle.classList.add('dark-mode-toggle');
  document.body.appendChild(darkModeToggle);

  // Function to update button icon and aria-label based on theme
  function updateToggleButton(isDarkTheme) {
    darkModeToggle.innerHTML = isDarkTheme
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Apply saved theme on page load with a fallback
  try {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    updateToggleButton(savedTheme === 'dark');
  } catch (e) {
    console.warn('localStorage not available; defaulting to light theme:', e);
    document.body.classList.remove('dark-theme');
    updateToggleButton(false);
  }

  // Add event listener for theme toggle
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Update button state
    updateToggleButton(isDarkTheme);
    
    // Save theme preference with a fallback
    try {
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    } catch (e) {
      console.warn('Could not save theme preference to localStorage:', e);
    }
  });

  // Contact form validation (client-side only)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const formButton = contactForm.querySelector('button');
    formButton.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');

      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields.');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Form submitted successfully! (Note: This is a demo; no actual submission occurs.)');
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    });
  }

  // Progress bar animation on Skills page
  const progressBars = document.querySelectorAll('.progress');
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const barTop = bar.getBoundingClientRect().top + window.scrollY;

      if (scrollPosition > barTop + 50 && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1s ease-in-out';
          bar.style.width = width;
        }, 100);
      }
    });
  }

  window.addEventListener('scroll', animateProgressBars);
  window.addEventListener('load', animateProgressBars);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});