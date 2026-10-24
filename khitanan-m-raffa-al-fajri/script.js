// ===== AUDIO BACKSOUND =====
const audio = document.getElementById('backsound');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

function playMusic() {
  if (audio) {
    audio.play()
      .then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
      })
      .catch(error => {
        console.log('Gagal memutar musik:', error);
        musicToggle.textContent = '🔈';
      });
  }
}

musicToggle.addEventListener('click', function() {
  if (isPlaying) {
    audio.pause();
    musicToggle.textContent = '🔈';
    isPlaying = false;
  } else {
    audio.play()
      .then(() => {
        musicToggle.textContent = '🔊';
        isPlaying = true;
      })
      .catch(e => console.log('Gagal memutar:', e));
  }
});

// ===== COUNTDOWN =====
function updateCountdown() {
  const eventDate = new Date('November 4, 2026 08:00:00').getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

if (document.getElementById('days')) {
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// ===== ANIMASI SCROLL =====
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (animatedElements.length === 0) return;

  animatedElements.forEach(el => {
    const type = el.dataset.animate;
    setInitialStyle(el, type);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const type = el.dataset.animate;

      if (entry.isIntersecting) {
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        el.style.transition = `opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`;
        el.style.opacity = '1';
        el.style.transform = 'none';
      } else {
        el.style.transition = 'none';
        setInitialStyle(el, type);
        void el.offsetHeight;
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

function setInitialStyle(el, type) {
  el.style.opacity = '0';
  switch (type) {
    case 'fade-up':     el.style.transform = 'translateY(30px)'; break;
    case 'fade-down':   el.style.transform = 'translateY(-30px)'; break;
    case 'fade-left':   el.style.transform = 'translateX(-30px)'; break;
    case 'fade-right':  el.style.transform = 'translateX(30px)'; break;
    case 'zoom-in':     el.style.transform = 'scale(0.9)'; break;
    case 'zoom-out':    el.style.transform = 'scale(1.1)'; break;
    case 'slide-up':    el.style.transform = 'translateY(80%)'; break;
    case 'slide-down':  el.style.transform = 'translateY(-80%)'; break;
    case 'slide-left':  el.style.transform = 'translateX(-80%)'; break;
    case 'slide-right': el.style.transform = 'translateX(80%)'; break;
    case 'flip-left':   el.style.transform = 'perspective(400px) rotateY(70deg)'; break;
    case 'flip-right':  el.style.transform = 'perspective(400px) rotateY(-70deg)'; break;
    default:            el.style.transform = 'translateY(20px)'; break;
  }
}

// ===== COVER: BUKA UNDANGAN =====
document.getElementById('open-invitation').addEventListener('click', function() {
  document.getElementById('cover').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  playMusic();
  setTimeout(initScrollAnimation, 500);
});