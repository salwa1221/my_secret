document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen HTML berdasarkan ID-nya
    const curhatInput = document.getElementById('curhatInput');
    const postCurhatButton = document.getElementById('postCurhat');
    const daftarCurhatan = document.getElementById('daftarCurhatan');

    // Fungsi untuk menyimpan curhatan ke Local Storage browser
    // Local Storage adalah tempat di browser untuk menyimpan data kecil
    function simpanCurhatan(curhatan) {
        // Mengambil semua curhatan yang sudah ada (jika ada) atau membuat array kosong
        let semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        // Menambahkan curhatan baru ke daftar
        semuaCurhatan.push(curhatan);
        // Menyimpan kembali daftar curhatan yang sudah diperbarui ke Local Storage
        localStorage.setItem('curhatan', JSON.stringify(semuaCurhatan));
    }

    // Fungsi untuk menampilkan semua curhatan dari Local Storage ke halaman web
    function tampilkanCurhatan() {
        daftarCurhatan.innerHTML = ''; // Mengosongkan daftar tampilan sebelum mengisi ulang
        // Mengambil semua curhatan dari Local Storage
        const semuaCurhatan = localStorage.getItem('curhatan') ? JSON.parse(localStorage.getItem('curhatan')) : [];
        // Memutar setiap curhatan dan menambahkannya ke tampilan
        semuaCurhatan.forEach((curhat, index) => {
            const curhatItem = document.createElement('div'); // Membuat elemen div baru
            curhatItem.classList.add('curhat-item'); // Menambahkan kelas CSS
            curhatItem.innerHTML = `<p>${curhat}</p>`; // Mengisi dengan teks curhatan
            daftarCurhatan.appendChild(curhatItem); // Menambahkan ke dalam daftar curhatan di HTML
        });
    }

    // Menambahkan "pendengar kejadian" (event listener) saat tombol "Kirim" diklik
    postCurhatButton.addEventListener('click', () => {
        const textCurhat = curhatInput.value.trim(); // Mengambil teks dari input dan menghapus spasi di awal/akhir
        if (textCurhat) { // Jika ada teks yang ditulis
            simpanCurhatan(textCurhat); // Simpan curhatan
            curhatInput.value = ''; // Mengosongkan kolom input
            tampilkanCurhatan(); // Memperbarui tampilan curhatan
        } else {
            alert('Silakan tulis curhatan Anda terlebih dahulu.'); // Memberi peringatan jika kolom kosong
        }
    });

    // Panggil fungsi tampilkanCurhatan saat halaman web pertama kali dimuat
    tampilkanCurhatan();
});