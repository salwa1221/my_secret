document.addEventListener('DOMContentLoaded', () => {
    // === Variabel Elemen HTML ===
    const curhatInput = document.getElementById('curhatInput');
    const postCurhatButton = document.getElementById('postCurhat');
    const daftarCurhatan = document.getElementById('daftarCurhatan');

    // Tombol Navigasi Slide
    const goToSlide1From4 = document.getElementById('goToSlide1From4');
    const goToSlide2 = document.getElementById('goToSlide2');
    const goToSlide2From3 = document.getElementById('goToSlide2From3');
    const goToSlide3 = document.getElementById('goToSlide3');
    const goToSlide4From3 = document.getElementById('goToSlide4From3');

    const slides = document.querySelectorAll('.slide'); // Mendapatkan semua elemen dengan class 'slide'

    let currentSlide = 1; // Mulai dari slide pertama (index 1)

    // === Fungsi Navigasi Slide ===
    function showSlide(slideNumber) {
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        // Tampilkan slide yang diminta
        document.getElementById(`slide${slideNumber}`).classList.add('active');
        currentSlide = slideNumber;

        // Jika pindah ke slide 3 (daftar curhatan), muat ulang daftar curhatan
        if (slideNumber === 3) {
            tampilkanCurhatan();
        }
    }

    // === Fungsi untuk Mengambil dan Memformat Tanggal & Waktu ===
    function getFormattedDateTime(timestamp) {
        const date = new Date(timestamp);
        const options = {
            weekday: 'long', // Hari (e.g., Senin)
            year: 'numeric',
            month: 'long', // Bulan (e.g., Januari)
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Format 24 jam
        };
        // Menggunakan 'id-ID' untuk format bahasa Indonesia
        return date.toLocaleDateString('id-ID', options) + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }

    // === Fungsi untuk Menyimpan Curhatan ke Local Storage ===
    function simpanCurhatan(curhatanText) {
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        const timestamp = Date.now(); // Ambil timestamp saat ini (dalam milidetik)
        
        // Simpan curhatan sebagai objek { text, timestamp }
        semuaCurhatan.push({ text: curhatanText, timestamp: timestamp });
        localStorage.setItem('curhatan', JSON.stringify(semuaCurhatan));
    }

    // === Fungsi untuk Menampilkan Semua Curhatan dari Local Storage ===
    function tampilkanCurhatan() {
        daftarCurhatan.innerHTML = ''; // Kosongkan tampilan sebelumnya
        const semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        
        if (semuaCurhatan.length === 0) {
            daftarCurhatan.innerHTML = '<p style="text-align: center; color: #777;">Belum ada rahasia yang kamu tulis.</p>';
            return;
        }

        // Tampilkan curhatan dari yang terbaru
        semuaCurhatan.reverse().forEach(item => { // Membalik urutan agar yang terbaru di atas
            const curhatItem = document.createElement('div');
            curhatItem.classList.add('curhat-item');
            
            const formattedDate = getFormattedDateTime(item.timestamp);
            
            curhatItem.innerHTML = `
                <p>${item.text}</p>
                <span class="timestamp">${formattedDate}</span>
            `;
            daftarCurhatan.appendChild(curhatItem);
        });
    }

    // === Event Listeners untuk Tombol dan Fungsionalitas ===

    // Tombol untuk mengirim curhatan
    postCurhatButton.addEventListener('click', () => {
        const textCurhat = curhatInput.value.trim();
        if (textCurhat) {
            simpanCurhatan(textCurhat);
            curhatInput.value = ''; // Bersihkan textarea
            alert('Rahasia Anda telah tersimpan!'); // Notifikasi
            tampilkanCurhatan(); // Perbarui daftar di slide 3
            showSlide(3); // Langsung pindah ke slide 3 setelah kirim
        } else {
            alert('Silakan tulis rahasia Anda terlebih dahulu.');
        }
    });

    // Navigasi Tombol
    goToSlide2.addEventListener('click', () => showSlide(2));
    goToSlide3.addEventListener('click', () => showSlide(3)); // Dari slide 2 ke slide 3
    goToSlide2From3.addEventListener('click', () => showSlide(2)); // Dari slide 3 ke slide 2
    goToSlide4From3.addEventListener('click', () => showSlide(4)); // Dari slide 3 ke slide 4
    goToSlide1From4.addEventListener('click', () => showSlide(1)); // Dari slide 4 ke slide 1

    // Tampilkan slide pertama saat aplikasi dimuat
    showSlide(1);
});