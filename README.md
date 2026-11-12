# ✦ A Little Universe For You

Website ulang tahun interaktif yang personal dan elegan.

---

## 🚀 Cara Menjalankan

**Wajib pakai server lokal** (jangan double-click `index.html` langsung):

```bash
# Kalau pakai Python (sudah terinstall):
cd birthday-website
python -m http.server 3000

# Lalu buka browser ke:
# http://localhost:3000
```

Atau pakai **VS Code → Live Server** (klik kanan `index.html` → Open with Live Server).

---

## ✏️ Cara Personalisasi

**Semua data ada di satu file:** `js/data.js`

Buka file itu dan ganti setiap `[PLACEHOLDER]` dengan isi yang sebenarnya.

### Yang perlu diisi:

| Field | Lokasi di data.js | Keterangan |
|-------|-------------------|------------|
| Nama pacar | `person.name` | Nama lengkap |
| Panggilan | `person.nickname` | Panggilan sayang |
| Tanggal lahir | `person.birthday` | Format: `"2003-01-15"` |
| Umur | `person.age` | Angka saja: `21` |
| 6 alasan spesial | `reasons[0..5].message` | Isi pesan tiap card |
| Foto (8+) | `memories[0..7]` | Isi `src`, `date`, `caption` |
| Timeline | `story[0..4]` | 5 momen penting |
| 5 amplop | `envelopes[0..4].message` | Isi pesan tiap amplop |
| Surat | `letter.body` | Isi surat panjang |
| Pesan terakhir | `finalWish` | Muncul saat bintang diklik |
| Lagu | `music.file` | Path ke file MP3 |

---

## 📸 Cara Memasukkan Foto

1. Taruh foto di folder `images/`
2. Beri nama: `photo1.jpg`, `photo2.jpg`, dst.
3. Di `data.js`, ganti field `src` di setiap item `memories`:

```js
memories: [
  {
    src:     "images/photo1.jpg",   // ← nama file foto
    date:    "12 / 03 / 2024",
    caption: "Our first dinner together."
  },
  // ...
]
```

---

## 🎵 Cara Menambahkan Lagu

1. Taruh file MP3 di folder `music/`
2. Di `data.js`, edit bagian `music`:

```js
music: {
  file:   "music/nama-lagu.mp3",
  title:  "Judul Lagu",
  artist: "Nama Artis"
}
```

---

## 📁 Struktur Project

```
birthday-website/
├── index.html          ← halaman utama (jangan diubah strukturnya)
├── README.md
│
├── css/
│   ├── style.css       ← semua styling
│   └── animations.css  ← animasi tambahan
│
├── js/
│   ├── data.js         ← ← ← EDIT FILE INI untuk personalisasi
│   └── script.js       ← logika interaktif (jangan diubah)
│
├── images/
│   ├── photo1.jpg      ← taruh foto di sini
│   ├── photo2.jpg
│   └── ...
│
└── music/
    └── birthday-song.mp3   ← taruh lagu di sini
```

---

## 🌐 Sections Website

| # | Section | Keterangan |
|---|---------|------------|
| 1 | Landing | Halaman pembuka dengan bulan & bintang |
| 2 | Introduction | Tampilan usia + pesan pembuka |
| 3 | Little Things | 6 card alasan yang bisa di-flip |
| 4 | Memories | Gallery foto polaroid interaktif |
| 5 | Our Story | Timeline momen penting |
| 6 | Open When | 5 amplop dengan pesan tersembunyi |
| 7 | Letter | Surat ulang tahun dengan amplop |
| 8 | Make a Wish | Bintang interaktif + konfeti |

---

Made with love ✦
