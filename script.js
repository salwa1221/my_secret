document.addEventListener('DOMContentLoaded', () => {
    // === Variabel Elemen HTML ===
    const curhatInput = document.getElementById('curhatInput');
    const postCurhatButton = document.getElementById('postCurhat');
    const daftarCurhatan = document.getElementById('daftarCurhatan'); // Untuk daftar di slide 3
    const detailCurhatText = document.getElementById('detailCurhatText'); // Untuk teks detail di slide 5
    const detailCurhatTimestamp = document.getElementById('detailCurhatTimestamp'); // Untuk timestamp detail di slide 5

    // Tombol Navigasi Slide
    const goToSlide1From4 = document.getElementById('goToSlide1From4');
    const goToSlide2 = document.getElementById('goToSlide2');
    const goToSlide2From3 = document.getElementById('goToSlide2From3');
    const goToSlide3 = document.getElementById('goToSlide3');
    const goToSlide4From3 = document.getElementById('goToSlide4From3');
    const goToSlide3From5 = document.getElementById('goToSlide3From5'); // Tombol kembali dari slide 5

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
        // Cek apakah timestamp valid. Jika tidak, itu mungkin data lama.
        if (!timestamp || isNaN(new Date(timestamp).getTime())) {
            return "Tanggal tidak tersedia"; // Untuk curhatan yang tidak punya timestamp
        }
        const date = new Date(timestamp);
        const options = {
            weekday: 'long', // Hari (e.g., Senin)
            year: 'numeric',
            month: 'long', // Bulan (e.g., Juli)
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Format 24 jam
        };
        // Menggunakan 'id-ID' untuk format bahasa Indonesia
        return date.toLocaleString('id-ID', options);
    }

    // === Fungsi untuk Menyimpan Curhatan ke Local Storage ===
    function simpanCurhatan(curhatanText) {
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        const timestamp = Date.now(); // Ambil timestamp saat ini (dalam milidetik)

        // Simpan curhatan sebagai objek { text, timestamp }
        semuaCurhatan.push({ text: curhatanText, timestamp: timestamp });
        localStorage.setItem('curhatan', JSON.stringify(semuaCurhatan));
    }

    // === Fungsi untuk Menampilkan Detail Curhatan di Slide 5 ===
    function showCurhatDetail(curhatObj) {
        detailCurhatText.textContent = curhatObj.text;
        detailCurhatTimestamp.textContent = getFormattedDateTime(curhatObj.timestamp);
        showSlide(5); // Pindah ke slide detail
    }

    // === Fungsi untuk Menampilkan Semua Curhatan dari Local Storage ===
    function tampilkanCurhatan() {
        daftarCurhatan.innerHTML = ''; // Kosongkan tampilan sebelumnya
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];

        if (semuaCurhatan.length === 0) {
            daftarCurhatan.innerHTML = '<p style="text-align: center; color: #777;">Belum ada rahasia yang kamu tulis.</p>';
            return;
        }

        // Tampilkan curhatan dari yang terbaru
        // Kita membuat salinan array dan membaliknya agar yang terbaru di atas
        [...semuaCurhatan].reverse().forEach((item, index) => {
            // !!! PENTING: Menangani data lama yang hanya berupa string !!!
            // Jika item adalah string, ubah jadi objek dengan tanggal default
            if (typeof item === 'string') {
                item = {
                    text: item,
                    // Memberikan timestamp lama agar tidak semua 'Tanggal tidak tersedia'
                    // Bisa diubah ke Date.now() jika ingin otomatis diupdate
                    timestamp: new Date('2024-07-15T00:00:00Z').getTime() // Contoh tanggal default
                };
                // Opsional: Anda bisa memperbarui Local Storage di sini
                // Tapi untuk demo, biarkan saja agar tidak mengulang konversi
            }

            const curhatItem = document.createElement('div');
            curhatItem.classList.add('curhat-item');

            const formattedDate = getFormattedDateTime(item.timestamp);

            curhatItem.innerHTML = `
                <p>${item.text}</p>
                <span class="timestamp">${formattedDate}</span>
            `;

            // Membuat item curhatan bisa diklik
            curhatItem.style.cursor = 'pointer'; // Menunjukkan bahwa item bisa diklik
            curhatItem.addEventListener('click', () => {
                showCurhatDetail(item); // Tampilkan detail curhatan ini
            });

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
            // Tidak perlu tampilkanCurhatan() di sini karena akan dipanggil saat showSlide(3)
            showSlide(3); // Langsung pindah ke slide 3 setelah kirim
        } else {
            alert('Silakan tulis rahasia Anda terlebih dahulu.');
        }
    });

    // Navigasi Tombol
    goToSlide2.addEventListener('click', () => showSlide(2)); // Dari slide 1 ke slide 2
    goToSlide3.addEventListener('click', () => showSlide(3)); // Dari slide 2 ke slide 3 (Lihat Rahasia)
    goToSlide2From3.addEventListener('click', () => showSlide(2)); // Dari slide 3 ke slide 2 (Tulis Rahasia Baru)
    goToSlide4From3.addEventListener('click', () => showSlide(4)); // Dari slide 3 ke slide 4 (Halaman Inspirasi)
    goToSlide1From4.addEventListener('click', () => showSlide(1)); // Dari slide 4 ke slide 1 (Kembali ke Awal)
    goToSlide3From5.addEventListener('click', () => showSlide(3)); // Dari slide 5 ke slide 3 (Kembali ke Semua Rahasia)

    // Tampilkan slide pertama saat aplikasi dimuat
    showSlide(1);
});