console.log("Bloom Festival script loaded");

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track) return;

    // Get original slides
    const originalSlides = Array.from(track.children);
    const originalCount = originalSlides.length;

    // Clone slides to ensure we have enough for scrolling
    // We'll triple the content to allow smooth infinite feeling
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    const allSlides = Array.from(track.children);
    let currentIndex = 0;

    // Configuration
    function getSlidesToShow() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    // Initial width adjustment is handled by CSS (w-full or w-1/3)
    // But we need to track index correctly.

    function updateCarousel(smooth = true) {
        const slidesToShow = getSlidesToShow();
        const slideWidthPercent = 100 / slidesToShow;

        if (smooth) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }

        const translateValue = -(currentIndex * slideWidthPercent);
        track.style.transform = `translateX(${translateValue}%)`;
    }

    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const slidesToShow = getSlidesToShow();
            currentIndex++;

            // Limit for simple demo logic: if we go past the second set, reset to first set
            // Total slides = 3 * originalCount.
            // If original is 3, total is 9.
            // We want to loop back seamlessly.

            // Seamless trick:
            // If we reach the end of the cloned set, jump back instantly.
            // This requires `transitionend` listener, but for simplicity:

            updateCarousel();

            if (currentIndex >= originalCount * 2) {
                 setTimeout(() => {
                    currentIndex = originalCount; // Jump back to middle set
                    updateCarousel(false); // No transition
                 }, 500); // Wait for transition to finish
            }
        });
    }

    // Prev Button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();

            if (currentIndex < 0) {
                 setTimeout(() => {
                    currentIndex = originalCount - 1; // Jump to end of first block?
                    // Better: current index becomes (originalCount) technically?
                    // Let's settle on: We start at 0 (first set).
                    // If we go < 0, we jump to end of middle set.
                    currentIndex = originalCount * 2 - 1;
                    updateCarousel(false);
                 }, 500);
            }
        });
    }

    // Mobile Swipe (Basic Touch)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe Left -> Next
            const slidesToShow = getSlidesToShow();
            currentIndex++;
            updateCarousel();
             if (currentIndex >= originalCount * 2) {
                 setTimeout(() => { currentIndex = originalCount; updateCarousel(false); }, 500);
            }
        }
        if (touchEndX > touchStartX + threshold) {
            // Swipe Right -> Prev
            currentIndex--;
            updateCarousel();
             if (currentIndex < 0) {
                 setTimeout(() => { currentIndex = originalCount * 2 - 1; updateCarousel(false); }, 500);
            }
        }
    }

    // Reset on resize
    window.addEventListener('resize', () => {
        updateCarousel(false);
    });

    // Auto Play (Optional but good for infinite loop feel)
    setInterval(() => {
        // Only autoplay if user isn't hovering?
        // For MVP, basic logic:
        if (window.innerWidth >= 768) { // Only desktop usually requests infinite loop
             const slides = getSlidesToShow();
             currentIndex++;
             updateCarousel();
             if (currentIndex >= originalCount * 2) {
                 setTimeout(() => { currentIndex = originalCount; updateCarousel(false); }, 500);
            }
        }
    }, 4000); // 4 seconds
}

// Language Handling
const translations = {
  id: {
    "nav.buy_ticket": "AMBIL TIKET",
    "hero.next_show": "SHOW SELANJUTNYA!!",
    "hero.date.day": "JUMAT",
    "hero.date.month": "14 FEBRUARI",
    "hero.desc": "Gabung di malam penuh musik dan sesi <i>mental wellness</i> yang eksklusif.",
    "hero.get_tickets": "AMBIL TIKET",
    "about.tag": "APA SIH Bloom?",
    "about.title": "Oase buat <span class=\"text-bloom-orange\">Tumbuh Bareng, Mekar di Tiap Langkah</span>",
    "about.desc": "Titik temu musik dan <i>mental health</i>. Bukan cuma tren, ini ruang buat <i>healing</i>, koneksi, dan ngerasa <i>good vibes</i> luar dalem.",
    "feature.concert.tag": "EXPERIENCE",
    "feature.concert.title": "BUKAN CUMA <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-orange to-red-500\">KONSER</span>",
    "feature.concert.desc": "Bloom itu lebih dari sekadar lampu sorot dan bass kenceng. Ini <i>safe space</i> buat lo joget, lepas penat, dan jadi diri sendiri.",
    "feature.energy.tag": "WELLNESS",
    "feature.energy.title": "ENERGI <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-blue to-purple-500\">POSITIF + PIKIRAN JERNIH</span>",
    "feature.energy.desc": "<i>Wellness</i> itu prioritas. Bloom hadir buat ngingetin kalau \"gapapa banget buat pelan-pelan dan cek kondisi diri sendiri.\"",
    "mental.insight": "INSIGHT",
    "mental.culture.title": "KULTUR <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-cream to-white\">KREATIF</span>",
    "mental.culture.desc1": "Di dunia kreatif, seringkali isu <i>mental health</i> muncul pas kita lagi dalemin seni. Kadang, kita terjebak di situasi ini karena keadaan.",
    "mental.culture.quote": "\"Jujur gue ngerasa tersisih, kurang relevan di lingkungan sekitar. Nyari validasi dengan cara unik karena suara gue gak terwakili sama kelompok mayoritas.\"",
    "mental.culture.desc2": "Lewat karya, kita bisa validasi suara kita sendiri pas lingkungan gagal ngelakuin itu. Ini buka jalan buat 'keterbukaan' dan koneksi baru.",
    "mental.origin.title": "ASAL-USUL <span class=\"text-bloom-blue\">DIDEFINISIKAN ULANG</span>",
    "mental.origin.desc": "Apa masalah mental yang ngelahirin kreativitas, atau pikiran kreatif emang tempat subur buat masalah mental?",
    "mental.question": "PERTANYAANNYA",
    "mental.answer": "JAWABANNYA",
    "mental.egg_quote": "\"Telur <span class=\"text-bloom-orange\">gak nentuin</span> ayamnya\"",
    "mental.egg_desc": "Asal-usul lo gak nentuin masa depan lo. Lo gak didefinisiin sama trauma atau \"cangkang\" masa lalu lo.",
    "mental.excerpt": "Kutipan dari \"Mental Health & Creative Culture\"",
    "mental.card1.title": "Sabar Aja",
    "mental.card1.desc": "Kreativitas bantu kita bertahan dan \"nebak\" hasil akhir, bikin penantian sehari-hari jadi lebih ringan.",
    "mental.card2.title": "Luapin Perasaan",
    "mental.card2.desc": "Alat biar lega. Salurin emosi lewat film, game, musik, dan media beda lainnya.",
    "mental.card3.title": "Lawan Depresi",
    "mental.card3.desc": "Depresi itu ekspresi yang diredam. Berkarya adalah cara belajar ngelawan keheningan itu dan validasi suara lo sendiri.",
    "mental.card4.title": "Rancang Karyamu",
    "mental.card4.desc": "Paham apa yang mau lo sampein dan cari referensi yang pas biar pesannya nyampe dengan efektif.",
    "mental.card5.title": "Bikin Karya Gede",
    "mental.card5.desc": "Jadi \"Suara Raksasa\" yang mewakili mereka yang gak didenger, ciptain keterbukaan dan obrolan.",
    "mental.card6.title": "Tanggung Jawab Moral",
    "mental.card6.desc": "Punya \"suara gede\" berarti harus punya moral yang bener juga. Kalau asal-asalan, malah jadi kacau.",
    "gallery.title": "Bloom <span class=\"text-bloom-blue\">IN MOTION</span>",
    "gallery.slide1": "Main Stage",
    "gallery.slide2": "Crowd Energy",
    "gallery.slide3": "Workshop"
  },
  en: {
    "nav.buy_ticket": "BUY TICKET",
    "hero.next_show": "NEXT SHOW!!",
    "hero.date.day": "FRIDAY",
    "hero.date.month": "FEBRUARY 14",
    "hero.desc": "Join us for an exclusive evening of music and mental wellness sessions.",
    "hero.get_tickets": "GET TICKETS",
    "about.tag": "WHAT IS Bloom",
    "about.title": "An Oasis for <span class=\"text-bloom-orange\">Inspiring Growth, Blossom at Every Turn</span>",
    "about.desc": "Where music and mental wellness meet. More than just hype, it’s a space to heal, connect, and feel good inside out.",
    "feature.concert.tag": "EXPERIENCE",
    "feature.concert.title": "NOT JUST A <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-orange to-red-500\">CONCERT</span>",
    "feature.concert.desc": "Bloom is more than lights and loud beats it’s a safe space to dance, let go, and just be yourself.",
    "feature.energy.tag": "Wellness",
    "feature.energy.title": "FEEL-GOOD <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-blue to-purple-500\">ENERGY + MENTAL CLARITY</span>",
    "feature.energy.desc": "Well-being first, Bloom is here to remind you “it’s okay to slow down and check in with yourself.”",
    "mental.insight": "INSIGHT",
    "mental.culture.title": "CREATIVE <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-cream to-white\">CULTURE</span>",
    "mental.culture.desc1": "In a social ecosystem founded on creativity, we often uncover mental health issues as we explore our artistic depths. Sometimes, we are herded into this culture by necessity.",
    "mental.culture.quote": "\"I often feel isolated, lacking relevance in my immediate environment. Searching for validation in a unique way because my voice isn't represented by the dominant social groups.\"",
    "mental.culture.desc2": "Creativity allows us to validate our own voice when the environment fails to do so. It opens a dialogue to find \"openness\" and connection.",
    "mental.origin.title": "ORIGIN <span class=\"text-bloom-blue\">REDEFINED</span>",
    "mental.origin.desc": "Does mental struggle birth creativity, or does the creative mind serve as a breeding ground for mental struggle?",
    "mental.question": "THE QUESTION",
    "mental.answer": "THE ANSWER",
    "mental.egg_quote": "\"The egg <span class=\"text-bloom-orange\">didn't define</span> the chicken\"",
    "mental.egg_desc": "Your origins do not dictate who you become. You are not defined by your trauma or the \"shell\" you came from.",
    "mental.excerpt": "Excerpt from \"Mental Health & Creative Culture\"",
    "mental.card1.title": "Patience",
    "mental.card1.desc": "Creativity helps us endure and \"guess\" the outcome of events, making the wait for daily realities bearable.",
    "mental.card2.title": "Expressing Feelings",
    "mental.card2.desc": "A tool to make things easier. Channeling emotions through film, games, music, and distinct mediums.",
    "mental.card3.title": "Fighting Depression",
    "mental.card3.desc": "Depression is silenced expression. Creativity is the act of learning to fight that silence and validate your own voice.",
    "mental.card4.title": "Designing a Work",
    "mental.card4.desc": "It's about knowing what you want to say and finding the right references to convey that message effectively.",
    "mental.card5.title": "Making Great Work",
    "mental.card5.desc": "Becoming a \"Giant Voice\" that represents the unrepresented, creating openness and dialogue.",
    "mental.card6.title": "Moral Responsibility",
    "mental.card6.desc": "With a \"giant voice\" comes the responsibility to uphold good morals. Irresponsibility leads to chaos.",
    "gallery.title": "Bloom <span class=\"text-bloom-blue\">IN MOTION</span>",
    "gallery.slide1": "Main Stage",
    "gallery.slide2": "Crowd Energy",
    "gallery.slide3": "Workshops"
  }
};

let currentLang = 'id'; // Default

document.addEventListener('DOMContentLoaded', () => {
    // ... previous initCarousel logic is already running from line 4 ...

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
             currentLang = currentLang === 'id' ? 'en' : 'id';
             updateLanguage();
        });
    }
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
             el.innerHTML = translations[currentLang][key]; // Use innerHTML to allow spans/HTML in translations
        }
    });

    // Update Toggle Text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        // Option 1: Show current -> target. E.g. if ID, show "Switch to EN"?
        // Option 2: Static "ID | EN" with active state?
        // Let's keep it simple: "ID | EN" but maybe highlight?
        // Or just toggle text:
        langToggle.textContent = currentLang === 'id' ? "ID | EN" : "EN | ID";
    }
}
