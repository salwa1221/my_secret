document.addEventListener('DOMContentLoaded', () => {
    // === Variabel Elemen HTML ===
    // const passwordInput = document.getElementById('passwordInput'); // Hapus ini
    // const enterAppButton = document.getElementById('enterAppButton'); // Hapus ini
    const curhatInput = document.getElementById('curhatInput');
    const postCurhatButton = document.getElementById('postCurhat');
    const daftarCurhatan = document.getElementById('daftarCurhatan');
    const detailCurhatText = document.getElementById('detailCurhatText');
    const detailCurhatTimestamp = document.getElementById('detailCurhatTimestamp');

    // Tombol Navigasi Slide
    const goToSlide1From4 = document.getElementById('goToSlide1From4');
    const goToSlide2 = document.getElementById('goToSlide2'); // Pastikan ini ada
    const goToSlide2From3 = document.getElementById('goToSlide2From3');
    const goToSlide3 = document.getElementById('goToSlide3');
    const goToSlide4From3 = document.getElementById('goToSlide4From3');
    const goToSlide3From5 = document.getElementById('goToSlide3From5');

    const slides = document.querySelectorAll('.slide');

    let currentSlide = 1;

    // === HAPUS BAGIAN PASSWORD INI ===
    // const CORRECT_PASSWORD = "rahasia";
    // === AKHIR BAGIAN PASSWORD YANG DIHAPUS ===

    // === Fungsi Navigasi Slide ===
    function showSlide(slideNumber) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        document.getElementById(`slide${slideNumber}`).classList.add('active');
        currentSlide = slideNumber;

        if (slideNumber === 3) {
            tampilkanCurhatan();
        }
    }

    // === Fungsi untuk Mengambil dan Memformat Tanggal & Waktu ===
    function getFormattedDateTime(timestamp) {
        if (!timestamp || isNaN(new Date(timestamp).getTime())) {
            return "Tanggal tidak tersedia";
        }
        const date = new Date(timestamp);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleString('id-ID', options);
    }

    // === Fungsi untuk Menyimpan Curhatan ke Local Storage ===
    function simpanCurhatan(curhatanText) {
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        const timestamp = Date.now();

        semuaCurhatan.push({ text: curhatanText, timestamp: timestamp });
        localStorage.setItem('curhatan', JSON.stringify(semuaCurhatan));
    }

    // === Fungsi untuk Menghapus Curhatan ===
    function deleteCurhat(timestampToDelete) {
        if (confirm('Apakah Anda yakin ingin menghapus rahasia ini?')) {
            let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
            
            semuaCurhatan = semuaCurhatan.filter(item => {
                if (typeof item === 'string') {
                    return true;
                }
                return item.timestamp !== timestampToDelete;
            });

            localStorage.setItem('curhatan', JSON.stringify(semuaCurhatan));
            tampilkanCurhatan();
        }
    }

    // === Fungsi untuk Menampilkan Detail Curhatan di Slide 5 ===
    function showCurhatDetail(curhatObj) {
        detailCurhatText.textContent = curhatObj.text;
        detailCurhatTimestamp.textContent = getFormattedDateTime(curhatObj.timestamp);
        showSlide(5);
    }

    // === Fungsi untuk Menampilkan Semua Curhatan dari Local Storage ===
    function tampilkanCurhatan() {
        daftarCurhatan.innerHTML = '';
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];

        if (semuaCurhatan.length === 0) {
            daftarCurhatan.innerHTML = '<p style="text-align: center; color: #777;">Belum ada rahasia yang kamu tulis.</p>';
            return;
        }

        [...semuaCurhatan].reverse().forEach((item) => {
            if (typeof item === 'string') {
                item = {
                    text: item,
                    timestamp: new Date('2024-07-15T00:00:00Z').getTime()
                };
            }

            const curhatItem = document.createElement('div');
            curhatItem.classList.add('curhat-item');

            const formattedDate = getFormattedDateTime(item.timestamp);

            curhatItem.innerHTML = `
                <p>${item.text}</p>
                <span class="timestamp">${formattedDate}</span>
                <button class="delete-button">X</button>
            `;

            const curhatTextElement = curhatItem.querySelector('p');
            if (curhatTextElement) {
                curhatTextElement.style.cursor = 'pointer';
                curhatTextElement.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('delete-button')) {
                        showCurhatDetail(item);
                    }
                });
            }

            const deleteBtn = curhatItem.querySelector('.delete-button');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deleteCurhat(item.timestamp);
                });
            }

            daftarCurhatan.appendChild(curhatItem);
        });
    }

    // === Event Listeners untuk Tombol dan Fungsionalitas Utama ===

    // HAPUS BAGIAN INI (logika password)
    // enterAppButton.addEventListener('click', () => {
    //     const enteredPassword = passwordInput.value;
    //     if (enteredPassword === CORRECT_PASSWORD) {
    //         showSlide(2);
    //         passwordInput.value = '';
    //     } else {
    //         alert('Password salah. Silakan coba lagi.');
    //         passwordInput.value = '';
    //     }
    // });
    // AKHIR BAGIAN YANG DIHAPUS

    // Aktifkan kembali fungsi tombol "Mulai Curhat" di slide 1
    goToSlide2.addEventListener('click', () => showSlide(2));

    // Tombol untuk mengirim curhatan
    postCurhatButton.addEventListener('click', () => {
        const textCurhat = curhatInput.value.trim();
        if (textCurhat) {
            simpanCurhatan(textCurhat);
            curhatInput.value = '';
            alert('Rahasia Anda telah tersimpan!');
            showSlide(3);
        } else {
            alert('Silakan tulis rahasia Anda terlebih dahulu.');
        }
    });

    // Navigasi Tombol lainnya (tidak ada perubahan)
    goToSlide3.addEventListener('click', () => showSlide(3));
    goToSlide2From3.addEventListener('click', () => showSlide(2));
    goToSlide4From3.addEventListener('click', () => showSlide(4));
    goToSlide1From4.addEventListener('click', () => showSlide(1));
    goToSlide3From5.addEventListener('click', () => showSlide(3));

    // Tampilkan slide pertama saat aplikasi dimuat
    showSlide(1);
});