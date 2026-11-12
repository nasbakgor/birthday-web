/* ============================================================
   DATA.JS — CENTRALIZED CONFIGURATION
   "A Little Universe for You"

   EDIT FILE INI UNTUK PERSONALISASI WEBSITE.
   Jangan ubah nama variabelnya, hanya isi nilainya.
   ============================================================ */

const universeData = {

  /* ── INFORMASI UTAMA ──────────────────────────────────────
     Ganti dengan informasi pacarmu.                         */
  person: {
    name:      "Keanu Azzriel Nouvaldy",          // nama lengkap
    nickname:  "Keanu",           // panggilan sayang
    birthday:  "13-11-2026",          // format: 2003-01-15
    age:       "17",                // angka saja, contoh: 21
  },

  /* ── SECTION 2: INTRODUCTION ──────────────────────────────
     Pesan pembuka yang hangat.                              */
  intro: {
    headline:  "Today Is All About You.",
    message:   "Out of all the days in the year, today is one of my favorites — because it's the day you came into this world, and I'm so glad you did.",
    // Ganti dengan pesan personalmu di atas ↑
  },

  /* ── SECTION 3: REASONS / LITTLE THINGS ──────────────────
     6 alasan kenapa dia spesial.
     Ganti title dan message masing-masing card.             */
  reasons: [
    {
      icon: "✦",
      title: "Your Smile",
      message: "Senyum kamu tuh selalu bikin aku ikut senyum juga. Gatau kenapa, tiap ngeliat kamu senyum rasanya jadi ikut seneng aja. Sesimpel itu, tapi emang senyum kamu salah satu hal yang aku suka dari kamu."
    },
    {
      icon: "✧",
      title: "Your Kindness",
      message: "Aku suka cara kamu memperlakukan orang lain, cara kamu peduli, dan hal-hal kecil yang kadang mungkin ga kamu sadari. Kamu punya sisi baik yang bikin aku nyaman dan bersyukur bisa kenal sama kamu."
    },
    {
      icon: "◈",
      title: "Your Silly Side",
      message: "Banyak banget hal random yang kalau diinget suka bikin aku ketawa sendiri. Dari obrolan gajelas, bercanda hal receh, sampai hal kecil yang sebenarnya biasa aja tapi jadi seru kalau dilakuin bareng kamu. Kadang hal sederhana kayak gitu justru jadi kenangan yang paling aku inget."
    },
    {
      icon: "✦",
      title: "Your Patience",
      message: "Makasih udah sabar ngadepin aku, apalagi kalau aku lagi banyak maunya atau kadang susah dimengerti. Aku tahu aku juga ga selalu gampang buat dihadapin, tapi kamu tetap berusaha ngerti aku. Itu salah satu hal yang bikin aku makin menghargai kamu."
    },
    {
      icon: "✧",
      title: "Your Dreams",
      message: "Aku suka lihat kamu punya banyak hal yang pengen kamu capai. Aku kagum sama usaha dan semangat kamu buat masa depan. Aku harap semua yang lagi kamu perjuangin bisa tercapai satu per satu. Aku bakal selalu dukung hal-hal baik yang kamu usahain."
    },
    {
      icon: "◈",
      title: "Simply Being You",
      message: "Aku suka kamu bukan karena kamu harus selalu jadi sempurna. Aku suka kamu dengan segala sifat, kebiasaan, kelebihan, bahkan kekurangan kamu. Kamu ga perlu jadi orang lain buat bikin aku nyaman, karena jadi diri sendiri aja udah cukup."
    }
  ],

  /* ── SECTION 4: MEMORIES / PHOTO GALLERY ─────────────────
     Taruh foto di folder images/ lalu isi src-nya.
     Minimal 8 foto, maksimal tidak terbatas.                */
  memories: [
    {
      src:     "images/photo1.jpg.jpeg",   // ← ganti nama file foto
      date:    "[1 / 11 / 2025]",
      caption: "Tiap liat foto ini kaya langsung keputer lagu Home-Edith Whiskers ><"
    },
    {
      src:     "images/photo2.jpg.jpeg",
      date:    "[26 / 06 / 2026]",
      caption: "Ini pertama kali kita main bareng sampe SEMALEM itu!"
    },
    {
      src:     "images/photo3.jpg.jpeg",
      date:    "[19 / 12 / 2025]",
      caption: "kalo kata kamu 'kita harus fotbar tiap ada event!' HAHA, tapi aku seneng banget bisa foto bareng kamu di event ini"
    },
    {
      src:     "images/photo4.jpg.jpeg",
      date:    "[25 / 11 / 2025]",
      caption: "First time banget kita photobox berdua di koat, BINGUNG gaya nya sih tapi lucu banget HAHA"
    },
    {
      src:     "images/photo5.jpg.jpeg",
      date:    "[19 / 07 / 2025]",
      caption: "Jujur ini seru banget, teriak teriak pas perunggu joget joget pas wali HAHA everything so fun kalo sama kamu"
    },
    {
      src:     "images/photo6.jpg.jpeg",
      date:    "[06 / 10 / 2026]",
      caption: "muka muka cape abis dikejar kejar praktek, tapi semua nya jadi gampang karena pasti ada kamu yang semangatin n nungguin aku xixii "
    },
    {
      src:     "images/photo9.jpg.jpeg",
      date:    "[30 / 11 / 2025]",
      caption: "WOW masih ga nyangka kita pernah jalan sejauh ini, aku tau ini rencana mama n bunda. - Banten, Anyer"
    },
    {
      src:     "images/photo10.jpg.jpeg",
      date:    "[21 / 12 / 2025]",
      caption: "First flower dari kamu.. tiba-tiba bawa bunga ke kamar, sampe aku jadi PATUNG karena aku ga tau harus bilang apa HAHA tapi aku seneng banget, terima kasih yaaa"
    }
  ],

  /* ── SECTION 5: OUR STORY / TIMELINE ─────────────────────
     Momen-momen penting dalam hubungan kalian.              */
  story: [
    {
      date:    "",
      title:   "The Day We Met",
      text:    "First time kita ketemu pasti nya waktu Pra-MPLS jujur aja disitu aku belum notice kamu, tapi mpls day 1 kita kebagian 1 job jadi team 'daily vlog' bareng, dari situ aku mulai notice kamu dan kita jadi kenal. Aku seneng banget bisa kenal sama kamu.",
      photo:   null    // ← isi dengan "images/fotoX.jpg" jika ada foto untuk momen ini
    },
    {
      date:    "",
      title:   "When We Started Getting Closer",
      text:    "After 'daily vlog', kita mulai sering ngobrol dan kamu jadi suka chat aku nanyain hal hal random aku inget banget waktu itu kamu nanya 'enakan bakso aci atau mie kuah ya?' HAHA, darisitu lah kita mulai deket dan jadi 'bray' ",
      photo:   null
    },
    {
      date:    "",
      title:   "Our First Special Memory",
      text:    "First time kita jalan berdua tuh waktu kita OSIS dan disuruh beli styrofoam..?, SUMPAH itu lucu banget karena pas dimotor aku bener bener kaya mau terbang.. KARENA styrofoam nya gede banget HAHA, tapi itu jadi salah satu momen yang aku inget banget dan suka bikin ketawa sendiri kalo inget.",
      photo:   null
    },
    {
      date:    "",
      title:   "The Moments That Made Us Smile",
      text:    "WAH klo ini sih banyak ya.. pokonya apapun yang kita lakuin bareng pasti nya selalu bikin aku ketawa, dari bercanda random, becanda gajelas, sampe hal hal kecil yang mungkin keliatannya biasa aja tapi ternyata jadi kenangan yang aku suka..",
      photo:   null
    },
    {
      date:    "Today",
      title:   "Your Birthday ✦",
      text:    "Kadang aku suka mikir, ternyata kita udah sejauh ini ya. Banyak hal yang udah kita lewatin, mulai dari cerita-cerita kecil, ketawa bareng, beda pendapat, sampai momen yang mungkin ga selalu berjalan sesuai keinginan kita. Tapi dari semua itu, aku bersyukur masih bisa jalanin semuanya sama kamu. Aku tau hubungan kita juga ga selalu sempurna, masih banyak hal yang perlu kita pelajari dan perbaiki bareng-bareng. Tapi aku harap kita bisa terus saling ngerti, saling dukung, dan ga gampang nyerah satu sama lain. Makasih udah jadi bagian dari hidup aku. Semoga masih banyak cerita dan hal seru yang bisa kita lewatin bareng ke depannya.",
      photo:   null
    }
  ],

  /* ── SECTION 6: OPEN WHEN ENVELOPES ──────────────────────
     5 amplop dengan pesan tersembunyi.
     Ganti isi message setiap amplop.                       */
  envelopes: [
    {
      label:   "Open When You Miss Me",
      message: "Kalau kamu lagi kangen aku, coba inget lagi hal-hal kecil yang pernah kita lakuin bareng. Obrolan random kita, becanda gajelas, atau momen sederhana yang selalu berhasil bikin kita ketawa. Walaupun sekarang kita lagi ga bareng, bukan berarti aku lupa sama semua itu. Aku juga pasti kangen kamu. Jadi, jangan terlalu lama dipendem ya kalau kangen, bilang aja. Semoga kamu selalu inget kalau ada aku yang juga pengen terus bikin banyak kenangan bareng kamu."
    },
    {
      label:   "Open When You're Tired",
      message: "Kalau kamu lagi capek, jangan terlalu maksain diri buat terus ngelakuin semuanya. Istirahat dulu kalau memang butuh. Ngga harus semua hal selesai hari ini. Kamu juga perlu waktu buat diri sendiri. Kalau ada yang mau diceritain atau cuma mau ngeluh, cerita aja ke aku. Ngga harus selalu keliatan baik-baik aja."
    },
    {
      label:   "Open When You Need Encouragement",
      message: "Jangan lupa sama semua hal yang udah berhasil kamu lewatin sampai sekarang. Aku tau ga semuanya gampang, tapi kamu udah berusaha sejauh ini dan itu patut dihargai. Kalau sekarang ada sesuatu yang belum berhasil, bukan berarti kamu gagal. Pelan-pelan aja, ga perlu buru-buru. Aku percaya kamu bisa ngusahain apa yang kamu mau."
    },
    {
      label:   "Open When You Doubt Yourself",
      message: "Jangan terlalu sering ngeraguin diri sendiri, ya. Aku tau kamu punya banyak kemampuan dan aku juga tau kamu udah berusaha sejauh ini. gapapa kalau sesekali kamu ngerasa kurang atau belum yakin sama diri sendiri. Tapi jangan sampe lupa kalau kamu punya banyak hal baik yang mungkin belum kamu sadari. Buat aku, kamu tetap seseorang yang berharga, terlepas dari apa yang berhasil atau belum berhasil kamu capai."
    },
    {
      label:   "Open When You Need a Smile",
      message: "Aku sebenernya nggak tau harus nulis apa di bagian ini, tapi aku cuma mau bilang kalau aku seneng bisa punya kamu. Kadang ada aja hal kecil dari kamu yang bikin aku ketawa atau tiba-tiba senyum sendiri. Semoga di tengah hari-hari kamu yang mungkin ga selalu menyenangkan, selalu ada hal yang bisa bikin kamu ketawa. Dan kalau suatu saat kamu lupa caranya senyum, semoga aku masih jadi salah satu alasan kecilnya."
    }
  ],

  /* ── SECTION 7: BIRTHDAY LETTER ──────────────────────────
     Surat ulang tahun yang personal.
     Gunakan \n untuk baris baru.                           */
  letter: {
    salutation: "Hey, sayangg,",

    // Tulis suratmu di bawah ini ↓
    // Ganti setiap baris [PLACEHOLDER] dengan isi yang personal.
    body: `Happy birthday yaa! Akhirnya hari yang kamu tunggu-tunggu dateng juga, semoga hari ini jadi salah satu hari yang menyenangkan buat kamu.

ga kerasa ya kita udah lewatin banyak hal bareng, dari cerita random, bercanda gajelas, sampai hal-hal kecil yang mungkin kelihatannya biasa aja tapi ternyata jadi kenangan yang aku suka. Aku seneng bisa kenal dan jadi bagian dari hari-hari kamu.

Aku suka banyak hal dari kamu, dari cara kamu bercanda, sifat kamu, cara kamu cerita, sampai hal-hal kecil yang mungkin nggak kamu sadari. Aku juga suka kamu yang apa adanya, nggak harus selalu sempurna buat jadi seseorang yang berarti.

Semoga di umur yang baru ini kamu dikelilingi sama orang-orang baik, makin bahagia, sehat terus, semua yang kamu pengenin bisa tercapai, dan segala hal yang lagi kamu usahain bisa dapet hasil yang baik. Semoga ke depannya banyak hal baik yang dateng ke hidup kamu.

Sekali lagi, happy birthday! Makasih udah jadi diri kamu sendiri dan udah hadir di hidup aku. Jangan lupa bahagia, jangan terlalu keras sama diri sendiri, dan semoga aku masih bisa nemenin kamu di banyak ulang tahun berikutnya.`,

    closing:    "With all my love,",
    signature:  "Hana"
  },

  /* ── SECTION 8: MAKE A WISH ───────────────────────────────
     Pesan terakhir yang muncul saat bintang diklik.        */
  finalWish: "I hope life gives you countless reasons to smile. Keep growing, keep dreaming, and never forget how special you are.",

};
