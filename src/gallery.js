import { animations, getCategories } from './registry.js';

const STORAGE_PREFIX = 'phong:custom:';
const gallery = document.getElementById('gallery');
const filtersEl = document.getElementById('filters');

// Hover animation for any element
function addBounceHover(el) {
  el.addEventListener('mouseenter', () => {
    el.classList.remove('hover-out');
    el.classList.add('hover-in');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('hover-in');
    el.classList.add('hover-out');
  });
}

// Build filter buttons
const categories = getCategories();
let activeFilter = null;

const allBtn = document.createElement('button');
allBtn.textContent = 'All';
allBtn.classList.add('active');
allBtn.addEventListener('click', () => {
  activeFilter = null;
  updateFilter();
});
addBounceHover(allBtn);
filtersEl.appendChild(allBtn);

for (const cat of categories) {
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.addEventListener('click', () => {
    activeFilter = cat;
    updateFilter();
  });
  addBounceHover(btn);
  filtersEl.appendChild(btn);
}

function updateFilter() {
  // Update button states
  for (const btn of filtersEl.children) {
    btn.classList.toggle('active',
      (!activeFilter && btn.textContent === 'All') ||
      (btn.textContent === activeFilter)
    );
  }
  // Persist active filter so we can restore it on back-navigation
  sessionStorage.setItem('gallery:filter', activeFilter ?? '');
  renderGallery();
}

// Skip entrance animation when returning from viewer (scroll restore)
const isBackNav = sessionStorage.getItem('gallery:scroll') != null;

function renderGallery() {
  gallery.innerHTML = '';
  const filtered = activeFilter
    ? animations.filter(a => a.category === activeFilter)
    : animations;

  for (let i = 0; i < filtered.length; i++) {
    const anim = filtered[i];

    // Check for a custom thumbnail saved from the viewer
    let thumbSrc = `${import.meta.env.BASE_URL}thumbnails/${anim.slug}.jpg`;
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + anim.slug);
      if (raw) {
        const custom = JSON.parse(raw);
        if (custom.thumbnail) thumbSrc = custom.thumbnail;
      }
    } catch { /* ignore parse errors */ }

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${thumbSrc}"
           alt="${anim.name}"
           loading="lazy"
           onerror="this.src='${import.meta.env.BASE_URL}thumbnails/${anim.slug}.jpg'; this.onerror=null;">
      <div class="meta">
        <span class="name">${anim.name}</span>
        <span class="category">${anim.category}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      sessionStorage.setItem('gallery:scroll', window.scrollY);
      window.location.href = `${import.meta.env.BASE_URL}viewer/?animation=${anim.slug}`;
    });

    // Hover animation management
    card.addEventListener('mouseenter', () => {
      card.classList.remove('enter', 'hover-out');
      card.classList.add('hover-in');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover-in');
      card.classList.add('hover-out');
    });

    gallery.appendChild(card);

    // Staggered entrance animation (skip on back-navigation)
    if (isBackNav) {
      card.style.opacity = '0.25';
      card.style.transform = 'scale(1)';
    } else {
      setTimeout(() => card.classList.add('enter'), i * 100);
    }
  }
}

// Restore filter from a previous visit (back-navigation)
const savedFilter = sessionStorage.getItem('gallery:filter');
if (savedFilter) {
  activeFilter = savedFilter;
  updateFilter(); // updates buttons + calls renderGallery
} else {
  renderGallery();
}

// Restore scroll position after the gallery has rendered
const savedScroll = sessionStorage.getItem('gallery:scroll');
if (savedScroll != null) {
  window.scrollTo(0, parseInt(savedScroll, 10));
  sessionStorage.removeItem('gallery:scroll');
}
