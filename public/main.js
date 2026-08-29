/* ==========================================================================
   OMENDRA BHADA PORTFOLIO — INTERACTIVE FUNCTIONALITY & LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBrandRefresh();
  initStickyHeader();
  initMobileDrawer();
  initSmoothScroll();
  initInsightFilters();
  initEnquiryForm();
  initModals();
});

/* Load the restrained Radhvan Origins-inspired secondary accent system. */
function initBrandRefresh() {
  const existing = document.querySelector('link[data-brand-refresh]');
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/brand-refresh.css';
  link.dataset.brandRefresh = 'true';
  document.head.appendChild(link);
}

/* Sticky Header Logic */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Mobile Navigation Drawer */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* Smooth Scrolling for Navigation Links */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Insight Article Category Filter */
function initInsightFilters() {
  const filterBtns = document.querySelectorAll('.category-btn');
  const articles = document.querySelectorAll('.article-card');

  if (!filterBtns.length || !articles.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      articles.forEach(article => {
        const articleCat = article.getAttribute('data-category');
        if (category === 'all' || articleCat === category) {
          article.style.display = 'flex';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });
}

/* Project Enquiry Form Handling */
function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  const responseMsg = document.getElementById('formResponse');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Enquiry...';

    // Simulate direct secure form dispatch
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (responseMsg) {
        responseMsg.style.display = 'block';
        responseMsg.style.color = '#10B981';
        responseMsg.style.padding = '12px';
        responseMsg.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        responseMsg.style.borderRadius = '8px';
        responseMsg.style.marginTop = '16px';
        responseMsg.innerHTML = '✓ Thank you! Your enquiry has been received. Omendra Bhada will respond to your consultation request shortly.';
        
        setTimeout(() => {
          responseMsg.style.display = 'none';
        }, 8000);
      }
    }, 1200);
  });
}

/* Modals for Services & Article Preview */
function initModals() {
  // Service explore handlers
  const serviceExploreBtns = document.querySelectorAll('.explore-service-btn');
  serviceExploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      alert(`Exploring details for ${serviceName}. You can submit a project enquiry directly below to get started!`);
    });
  });
}
