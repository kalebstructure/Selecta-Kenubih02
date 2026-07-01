// ========================================
// Selecta one Ethiopia - Complete JavaScript
// ========================================

// ========== HERO SLIDER ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const slidesContainer = document.getElementById('slidesContainer');

if (dotsContainer && slides.length) {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(i) {
  currentSlide = i;
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  document.querySelectorAll('.dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === currentSlide);
  });
}

const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  });
}

setInterval(() => {
  if (slides.length) {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }
}, 5000);

// ========== BURGER MENU TOGGLE ==========
const burgerMenu = document.getElementById('burgerMenu');
const burgerDropdown = document.getElementById('burgerDropdown');

if (burgerMenu && burgerDropdown) {
  burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
    burgerMenu.setAttribute('aria-expanded', !isExpanded);
    burgerDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !burgerDropdown.contains(e.target)) {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    }
  });

  const allBurgerLinks = document.querySelectorAll('.burger-dropdown-container a, .burger-dropdown-submenu a');
  allBurgerLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// ========== SMOOTH SCROLL FOR ALL LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== PHASE IMAGES ==========
const basePath = "C:/Users/KALEB/Desktop/Selecta Kenubih/";

const phaseTitles = [
  { num: 1, name: "Phase I: Land Preparation", desc: "Clearing brush, controlled firing, mechanized leveling using tractors to soften and prepare soil for planting." },
  { num: 2, name: "Phase II: Advanced Irrigation Infrastructure", desc: "Deep borehole drilling, gravity-fed tankers, sprinkler and drip system installation for water efficiency." },
  { num: 3, name: "Phase III: Seeding & Replantation", desc: "High-quality improved seeds: Kekeba wheat and Russet F1 onion. Current: Wheat at 2 months, Onion at 15 days after replantation." },
  { num: 4, name: "Phase IV: Crop Management", desc: "Continuous disease monitoring, visual inspection of wheat grain development, and assessment of crop greenness (vegetative vigor)" },
  { num: 5, name: "Phase V: Harvest & Seed Certification", desc: "Elite seed stock collection, quality certification, and distribution to local farmers for national food security." }
];

const imageExtensions = ['avif', 'webm', 'png', 'jpg', 'jpeg', 'webp'];

function createComingSoonBox() {
  const box = document.createElement('div');
  box.className = 'coming-soon-box';
  const icon = document.createElement('i');
  icon.className = 'fas fa-image';
  const text = document.createElement('span');
  text.textContent = 'Coming Soon';
  box.appendChild(icon);
  box.appendChild(text);
  return box;
}

function initPhases() {
  for (let p = 1; p <= 5; p++) {
    const container = document.getElementById(`phase${p}-container`);
    if (!container) continue;
    
    const folderPath = `${basePath}Phase ${p}/`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'phase-header';
    headerDiv.innerHTML = `
      <div class="step-number">${p}</div>
      <div class="phase-content">
        <h3>${phaseTitles[p-1].name}</h3>
        <p>${phaseTitles[p-1].desc}</p>
      </div>
    `;
    container.appendChild(headerDiv);
    
    const visibleGrid = document.createElement('div');
    visibleGrid.className = 'phase-visible-grid';
    
    for (let i = 1; i <= 4; i++) {
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.style.cursor = 'pointer';
      img.style.width = '100%';
      img.style.aspectRatio = '4/3';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '12px';
      
      let found = false;
      let extIndex = 0;
      
      function tryLoad() {
        if (extIndex >= imageExtensions.length) {
          img.src = `https://placehold.co/400x300/1a73b0/white?text=${encodeURIComponent(phaseTitles[p-1].name)}+${i}`;
          img.onclick = () => openLightbox(img.src);
          imageCard.appendChild(img);
          visibleGrid.appendChild(imageCard);
          return;
        }
        
        const ext = imageExtensions[extIndex];
        const imgPath = `${folderPath}${i}.${ext}`;
        const testImg = new Image();
        
        testImg.onload = () => {
          img.src = imgPath;
          img.onclick = () => openLightbox(imgPath);
          imageCard.appendChild(img);
          visibleGrid.appendChild(imageCard);
        };
        
        testImg.onerror = () => {
          extIndex++;
          tryLoad();
        };
        
        testImg.src = imgPath;
      }
      
      tryLoad();
    }
    
    container.appendChild(visibleGrid);
    
    const moreBtn = document.createElement('button');
    moreBtn.className = 'more-images-btn';
    moreBtn.setAttribute('aria-expanded', 'false');
    moreBtn.setAttribute('aria-controls', `phase${p}-more`);
    moreBtn.innerHTML = `<i class="fas fa-images"></i> More Images <span class="more-count">(additional images)</span> <i class="fas fa-chevron-down"></i>`;
    container.appendChild(moreBtn);
    
    const moreGrid = document.createElement('div');
    moreGrid.id = `phase${p}-more`;
    moreGrid.className = 'phase-more-grid';
    moreGrid.setAttribute('aria-hidden', 'true');
    moreGrid.style.display = 'none';
    container.appendChild(moreGrid);
    
    let totalImagesFound = 0;
    
    for (let i = 5; i <= 14; i++) {
      let extIndex = 0;
      let imageFound = false;
      
      function tryLoadMore() {
        if (extIndex >= imageExtensions.length) {
          if (!imageFound) {
            const comingSoonBox = createComingSoonBox();
            moreGrid.appendChild(comingSoonBox);
          }
          return;
        }
        
        const ext = imageExtensions[extIndex];
        const imgPath = `${folderPath}${i}.${ext}`;
        const testImg = new Image();
        
        testImg.onload = () => {
          imageFound = true;
          totalImagesFound++;
          const img = document.createElement('img');
          img.src = imgPath;
          img.alt = `${phaseTitles[p-1].name} image ${i}`;
          img.loading = 'lazy';
          img.style.cursor = 'pointer';
          img.style.width = '100%';
          img.style.aspectRatio = '4/3';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '12px';
          img.onclick = () => openLightbox(imgPath);
          moreGrid.appendChild(img);
        };
        
        testImg.onerror = () => {
          extIndex++;
          tryLoadMore();
        };
        
        testImg.src = imgPath;
      }
      
      tryLoadMore();
    }
    
    setTimeout(() => {
      if (totalImagesFound === 0) {
        moreBtn.style.display = 'none';
      }
    }, 1000);
    
    moreBtn.addEventListener('click', () => {
      const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
      const chevron = moreBtn.querySelector('.fa-chevron-down');
      
      if (isExpanded) {
        moreGrid.style.display = 'none';
        moreGrid.setAttribute('aria-hidden', 'true');
        moreBtn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        moreGrid.style.display = 'grid';
        moreGrid.setAttribute('aria-hidden', 'false');
        moreBtn.setAttribute('aria-expanded', 'true');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  }
}

initPhases();

// ========== VIDEO GALLERY ==========
const youtubeVideos = [
  { id: 1, url: "https://www.youtube.com/embed/uqYhwlAPCR4", title: "Field Preparation", isPlaceholder: false },
  { id: 2, url: "https://www.youtube.com/embed/fK2AtBMW-lo", title: "Irrigation System", isPlaceholder: false },
  { id: 3, url: "", title: "Seeding Process", isPlaceholder: true, placeholderText: "Coming Soon" },
  { id: 4, url: "", title: "Crop Growth", isPlaceholder: true, placeholderText: "Coming Soon" }
];

for (let i = 5; i <= 24; i++) {
  youtubeVideos.push({ id: i, url: "", title: `Video ${i}`, isPlaceholder: true, placeholderText: "Coming Soon" });
}

function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  
  if (video.isPlaceholder || !video.url) {
    const img = document.createElement('img');
    img.src = `https://placehold.co/640x360/0b3b5f/white?text=${encodeURIComponent(video.title)}`;
    img.alt = video.title;
    img.className = 'video-thumbnail';
    card.appendChild(img);
    
    const label = document.createElement('div');
    label.className = 'video-label';
    label.textContent = `📹 ${video.title} (${video.placeholderText})`;
    card.appendChild(label);
  } else {
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/watch?v=${video.url.split('/embed/')[1]}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    link.style.display = 'block';
    
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${video.url.split('/embed/')[1]}/mqdefault.jpg`;
    img.alt = video.title;
    img.className = 'video-thumbnail';
    img.onerror = function() {
      this.src = `https://placehold.co/640x360/1a73b0/white?text=${encodeURIComponent(video.title)}`;
    };
    link.appendChild(img);
    
    const label = document.createElement('div');
    label.className = 'video-label';
    label.innerHTML = `🎬 ${video.title} <i class="fas fa-external-link-alt"></i>`;
    link.appendChild(label);
    
    card.appendChild(link);
  }
  return card;
}

const visibleVideoContainer = document.getElementById('videoVisibleGrid');
if (visibleVideoContainer) {
  for (let i = 0; i < 4; i++) {
    visibleVideoContainer.appendChild(createVideoCard(youtubeVideos[i]));
  }
}

const moreVideoContainer = document.getElementById('videoMoreGrid');
if (moreVideoContainer) {
  for (let i = 4; i < 24; i++) {
    moreVideoContainer.appendChild(createVideoCard(youtubeVideos[i]));
  }
}

const moreVideosBtn = document.getElementById('moreVideosBtn');
const videoMoreGrid = document.getElementById('videoMoreGrid');

if (moreVideosBtn && videoMoreGrid) {
  videoMoreGrid.style.display = 'none';
  
  moreVideosBtn.addEventListener('click', () => {
    const isExpanded = moreVideosBtn.getAttribute('aria-expanded') === 'true';
    const chevron = moreVideosBtn.querySelector('.fa-chevron-down');
    
    if (isExpanded) {
      videoMoreGrid.style.display = 'none';
      videoMoreGrid.setAttribute('aria-hidden', 'true');
      moreVideosBtn.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
      videoMoreGrid.style.display = 'grid';
      videoMoreGrid.setAttribute('aria-hidden', 'false');
      moreVideosBtn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  });
}

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  if (!src) return;
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', lightboxKeyHandler);
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
    document.removeEventListener('keydown', lightboxKeyHandler);
  }
}

function lightboxKeyHandler(e) {
  if (e.key === 'Escape') closeLightbox();
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// ========== DARK MODE ==========
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
  const darkModeIcon = darkModeToggle.querySelector('i');
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (darkModeIcon) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
    }
  }
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      if (darkModeIcon) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
      }
    } else {
      localStorage.setItem('darkMode', 'disabled');
      if (darkModeIcon) {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
      }
    }
  });
}

// ========== ACTIVE NAV HIGHLIGHT ==========
const sections = document.querySelectorAll('#home, #overview, #process, #vision, #videos, #footer');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

console.log('Selecta one Ethiopia — Website Loaded with Horizontal Nav + Burger Menu');