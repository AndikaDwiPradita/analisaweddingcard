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
// ===== INTERSECTION OBSERVER UNTUK ANIMASI =====
function initScrollAnimation() {
  // Daftar elemen yang akan dianimasi (semua dengan class animate-*)
  const animatedElements = document.querySelectorAll('[class*="animate-"]');
  
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambah class 'show' saat elemen masuk viewport
        entry.target.classList.add('show');
      } else {
        // Hapus class 'show' saat elemen keluar (agar animasi muncul lagi saat scroll balik)
        entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.2, // 20% elemen terlihat baru dianggap masuk
    rootMargin: '0px'
  });

  // Observasi semua elemen
  animatedElements.forEach(el => observer.observe(el));
}

document.getElementById('open-invitation').addEventListener('click', function() {
  document.getElementById('cover').style.display = 'none';          // <-- ubah ini
  document.getElementById('main-content').style.display = 'block';
  playMusic();
  setTimeout(initScrollAnimation, 500);
});


// Jika belum, pastikan untuk menambahkan baris di atas di tempat yang sesuai.


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


// Countdown
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