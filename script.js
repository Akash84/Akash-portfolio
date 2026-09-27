/**
 * AKASH KUMAR — PORTFOLIO INTERACTIVITY & SCRIPTS
 * Features: Dark/Light Mode, Mobile Navigation, Interactive Terminal Runner,
 * Skill Filter Tabs, Copy-to-Clipboard, Smooth Scroll & Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark & Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('akash_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('akash_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });

    // Back to Top visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };
  window.addEventListener('scroll', handleScrollSpy);

  // 4. Back to Top Click
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4b. Hero View Switcher (Portrait vs Terminal)
  const heroTabBtns = document.querySelectorAll('.hero-tab-btn');
  const heroTabContents = document.querySelectorAll('.hero-tab-content');

  heroTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      heroTabBtns.forEach(b => b.classList.remove('active'));
      heroTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTabId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 5. Interactive Terminal Runner in Hero Section
  const runCodeBtn = document.getElementById('run-code-btn');
  const terminalOutput = document.getElementById('terminal-output');

  if (runCodeBtn && terminalOutput) {
    runCodeBtn.addEventListener('click', () => {
      runCodeBtn.disabled = true;
      runCodeBtn.innerHTML = `
        <svg class="spin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg> Compiling...
      `;

      setTimeout(() => {
        runCodeBtn.disabled = false;
        runCodeBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg> Run Code
        `;
        terminalOutput.classList.add('show');
        terminalOutput.innerHTML = `
          <span style="color:#22c55e;">[SUCCESS]</span> Compilation finished with 0 errors.<br>
          <span style="color:#38bdf8;">[EXECUTION]</span> ./developer<br>
          <span style="color:#f8fafc;">&gt;&gt; Candidate: Akash Kumar</span><br>
          <span style="color:#f8fafc;">&gt;&gt; Status: Open for Software Engineering Internships &amp; Roles</span><br>
          <span style="color:#34d399;">&gt;&gt; Ready to build robust, high-performance systems!</span>
        `;
        showToast('Code executed successfully!');
      }, 700);
    });
  }

  // 6. Skills Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('.contact-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied to clipboard!`);
        });
      }
    });
  });

  // 8. Contact Form Handling
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Pre-compose mailto
      const mailtoLink = `mailto:akash.1532@outlook.in?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent(message + '\n\n---\nSender Email: ' + email)}`;
      window.location.href = mailtoLink;

      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }

  // 9. Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      container.innerHTML = `
        <div id="toast-notification" class="toast">
          <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span id="toast-text">${message}</span>
        </div>
      `;
      document.body.appendChild(container);
      toast = document.getElementById('toast-notification');
    } else {
      document.getElementById('toast-text').textContent = message;
    }

    toast.classList.add('show');
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 10. Dynamic Current Year
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Expose print function
  window.triggerPrintResume = () => {
    window.print();
  };
});
