// Ambil parameter URL untuk nama tamu (contoh: ?to=Budi)
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to') || 'Tamu Undangan';
document.getElementById('guest-name').textContent = guest;

// Elemen audio dan tombol
const audio = document.getElementById('backsound');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

// Fungsi untuk memulai musik (dipanggil setelah cover dibuka)
function playMusic() {
  if (audio) {
    audio.play()
      .then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊'; // ikon nyala
        musicToggle.classList.add('playing');
      })
      .catch(error => {
        console.log('Gagal memutar musik:', error);
        // Mungkin browser blokir, tapi tombol tetap bisa dipakai
        musicToggle.textContent = '🔈';
      });
  }
}
// Intersection Observer untuk animasi scroll
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show'); // kalau mau hilang saat scroll ke atas
      }
    });
  }, {
    threshold: 0.2, // 20% elemen terlihat baru muncul
    rootMargin: '0px'
  });

  // Ambil semua elemen yang mau dianimasi
  const animatedElements = document.querySelectorAll('.fade-up, .zoom-in, .slide-left');
  animatedElements.forEach(el => observer.observe(el));
}

// Panggil setelah cover dibuka
document.getElementById('open-invitation').addEventListener('click', function() {
  document.getElementById('cover').classList.add('hidden');
  document.getElementById('main-content').style.display = 'block';
  
  // Mulai musik
  playMusic();
  
  // Inisialisasi animasi
  setTimeout(initScrollAnimation, 500); // kasih jeda
});


// Tombol toggle play/pause
musicToggle.addEventListener('click', function() {
  if (isPlaying) {
    audio.pause();
    musicToggle.textContent = '🔈'; // mati
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


// Countdown menuju 19 Februari 2026
function updateCountdown() {
  const eventDate = new Date('February 19, 2027 08:00:00').getTime(); // sesuaikan jam jika perlu
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

// Jalankan countdown jika elemen tersedia
if (document.getElementById('days')) {
  setInterval(updateCountdown, 1000);
  updateCountdown();
}