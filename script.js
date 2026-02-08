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
    "nav.buy_ticket": "BELI TIKET",
    "hero.next_show": "PERTUNJUKAN BERIKUTNYA!!",
    "hero.date.day": "JUMAT",
    "hero.date.month": "14 FEBRUARI",
    "hero.desc": "Bergabunglah dalam malam eksklusif musik dan sesi kesehatan mental.",
    "hero.get_tickets": "DAPATKAN TIKET",
    "about.tag": "APA ITU Bloom",
    "about.title": "Oase untuk <span class=\"text-bloom-orange\">Pertumbuhan yang Menginspirasi, Mekar di Setiap Tikungan</span>",
    "about.desc": "Di mana musik dan kesehatan mental bertemu. Lebih dari sekadar tren, ini adalah ruang untuk penyembuhan, koneksi, dan merasa baik luar dalam.",
    "feature.concert.tag": "PENGALAMAN",
    "feature.concert.title": "BUKAN SEKADAR <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-orange to-red-500\">KONSER</span>",
    "feature.concert.desc": "Bloom lebih dari sekadar cahaya dan dentuman keras, ini adalah ruang aman untuk menari, melepaskan penat, dan menjadi diri sendiri.",
    "feature.energy.tag": "KESEHATAN",
    "feature.energy.title": "ENERGI <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-blue to-purple-500\">POSITIF + KEJERNIHAN MENTAL</span>",
    "feature.energy.desc": "Utamakan kesehatan, Bloom hadir untuk mengingatkan \"tidak apa-apa untuk melambat dan memeriksa diri sendiri.\"",
    "mental.insight": "WAWASAN",
    "mental.culture.title": "BUDAYA <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-bloom-cream to-white\">KREATIF</span>",
    "mental.culture.desc1": "Dalam ekosistem sosial yang didasari kreativitas, kita sering mengungkap masalah kesehatan mental saat menggali kedalaman artistik kita. Terkadang, kita digiring ke budaya ini karena kebutuhan.",
    "mental.culture.quote": "\"Secara pribadi saya merasa terkucilkan, kurang relevan di lingkungan terdekat saya. Mencari validasi dengan cara yang unik karena suara saya tidak terwakili oleh kelompok sosial yang dominan.\"",
    "mental.culture.desc2": "Kreativitas memungkinkan kita memvalidasi suara kita sendiri ketika lingkungan gagal melakukannya. Ini membuka dialog untuk menemukan \"keterbukaan\" dan koneksi.",
    "mental.origin.title": "ASAL USUL <span class=\"text-bloom-blue\">DIDEFINISIKAN ULANG</span>",
    "mental.origin.desc": "Apakah pergulatan mental melahirkan kreativitas, atau apakah pikiran kreatif menjadi tempat berkembang biak bagi pergulatan mental?",
    "mental.question": "PERTANYAAN",
    "mental.answer": "JAWABAN",
    "mental.egg_quote": "\"Telur <span class=\"text-bloom-orange\">tidak mendefinisikan</span> ayam\"",
    "mental.egg_desc": "Asal usulmu tidak menentukan siapa dirimu kelak. Kamu tidak didefinisikan oleh trauma atau \"cangkang\" tempatmu berasal.",
    "mental.excerpt": "Kutipan dari \"Kesehatan Mental & Budaya Kreatif\"",
    "mental.card1.title": "Kesabaran",
    "mental.card1.desc": "Kreativitas membantu kita bertahan dan \"menebak\" hasil peristiwa, membuat penantian akan realitas sehari-hari tertahankan.",
    "mental.card2.title": "Mengekspresikan Perasaan",
    "mental.card2.desc": "Alat untuk mempermudah segalanya. Menyalurkan emosi melalui film, game, musik, dan media yang berbeda.",
    "mental.card3.title": "Melawan Depresi",
    "mental.card3.desc": "Depresi adalah ekspresi yang dibungkam. Kreativitas adalah tindakan belajar melawan keheningan itu dan memvalidasi suaramu sendiri.",
    "mental.card4.title": "Merancang Karya",
    "mental.card4.desc": "Ini tentang mengetahui apa yang ingin kamu sampaikan dan menemukan referensi yang tepat untuk menyampaikan pesan itu secara efektif.",
    "mental.card5.title": "Membuat Karya Besar",
    "mental.card5.desc": "Menjadi \"Suara Raksasa\" yang mewakili mereka yang tidak terwakili, menciptakan keterbukaan dan dialog.",
    "mental.card6.title": "Tanggung Jawab Moral",
    "mental.card6.desc": "Dengan \"suara raksasa\" muncullah tanggung jawab untuk menjunjung tinggi moral yang baik. Ketidakbertanggungjawaban mengarah pada kekacauan.",
    "gallery.title": "Bloom <span class=\"text-bloom-blue\">DALAM GERAKAN</span>",
    "gallery.slide1": "Panggung Utama",
    "gallery.slide2": "Energi Penonton",
    "gallery.slide3": "Lokakarya"
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
