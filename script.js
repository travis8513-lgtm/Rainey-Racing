/* ===== Rainey Racing — interactivity ===== */

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    // close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// --- Navbar shadow on scroll + back-to-top visibility ---
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
});
if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Animated stat counters ---
function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out
        const value = Math.floor(eased * target);
        el.textContent = prefix + value.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toLocaleString() + suffix;
    }
    requestAnimationFrame(tick);
}

// --- Scroll reveal + trigger counters ---
const revealEls = document.querySelectorAll(
    '.about-card, .benefit-item, .driver-card, .video-card, .gallery-item, .package-card, .support-card, .section-head'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));

// --- Lightbox for gallery ---
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
        } else {
            const label = item.getAttribute('data-label') || 'Photo';
            lightboxContent.innerHTML = `<div class="lightbox-placeholder">📷 ${label}<br><small>Add your photo here — see the README</small></div>`;
        }
        lightbox.classList.add('open');
    });
});
function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// --- Driver bio pop-up ---
const bioModal = document.getElementById('bioModal');
const bioName = document.getElementById('bioName');
const bioSub = document.getElementById('bioSub');
const bioBody = document.getElementById('bioBody');
const bioClose = document.getElementById('bioClose');
document.querySelectorAll('.bio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const src = document.getElementById(btn.dataset.bio);
        if (!src) return;
        bioName.textContent = src.dataset.name || '';
        bioSub.textContent = src.dataset.sub || '';
        bioBody.innerHTML = src.innerHTML;
        bioModal.classList.add('open');
        if (bioModal.querySelector('.bio-panel')) bioModal.querySelector('.bio-panel').scrollTop = 0;
    });
});
function closeBio() { if (bioModal) bioModal.classList.remove('open'); }
if (bioClose) bioClose.addEventListener('click', closeBio);
if (bioModal) bioModal.addEventListener('click', (e) => { if (e.target === bioModal) closeBio(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBio(); });

// --- Forms (delivered via Formspree) ---
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFormMsg(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = 'form-message ' + type;
    el.style.display = 'block';
}

async function submitFormspree(form, msgEl, btn, successText) {
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    try {
        const resp = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
            showFormMsg(msgEl, successText, 'success');
            form.reset();
            setTimeout(() => { if (msgEl) msgEl.style.display = 'none'; }, 9000);
        } else {
            const j = await resp.json().catch(() => ({}));
            const err = (j.errors && j.errors.map(e => e.message).join(', ')) ||
                'Sorry, something went wrong. Please try again, or email us directly.';
            showFormMsg(msgEl, err, 'error');
        }
    } catch (e) {
        showFormMsg(msgEl, 'Network error — please check your connection and try again.', 'error');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = original; }
    }
}

// Sponsor inquiry form
const sponsorshipForm = document.getElementById('sponsorshipForm');
const formMessage = document.getElementById('form-message');
if (sponsorshipForm) {
    sponsorshipForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(sponsorshipForm));
        if (!data.name || !data.email || !data['contact-person'] || !data['sponsorship-type'] || !data.message) {
            showFormMsg(formMessage, 'Please fill in all required fields.', 'error'); return;
        }
        if (!emailRegex.test(data.email)) {
            showFormMsg(formMessage, 'Please enter a valid email address.', 'error'); return;
        }
        submitFormspree(sponsorshipForm, formMessage, sponsorshipForm.querySelector('button[type="submit"]'),
            '🏁 Thank you! Your inquiry is in — we\'ll be in touch soon to talk partnership.');
    });
}

// Merch order form
const orderForm = document.getElementById('orderForm');
const orderMessage = document.getElementById('order-message');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(orderForm));
        if (!data.name || !data.email || !data.item || !data.size || !data.quantity) {
            showFormMsg(orderMessage, 'Please fill in all required fields.', 'error'); return;
        }
        if (!emailRegex.test(data.email)) {
            showFormMsg(orderMessage, 'Please enter a valid email address.', 'error'); return;
        }
        submitFormspree(orderForm, orderMessage, orderForm.querySelector('button[type="submit"]'),
            '🏁 Order received! We\'ll get it made and reach out about payment & pickup or shipping.');
    });
}

// --- Next race countdown ---
// 2026 race Sundays at Camden Speedway (month is 1-based here, converted below)
const RACE_DATES = [
    [4, 12, 'Opening Day'], [4, 26, 'Race Day'], [5, 10, 'Race Day'], [5, 24, 'Race Day'],
    [5, 31, 'Race Day'], [6, 14, 'Race Day'], [6, 28, 'Race Day'], [7, 12, 'Race Day'],
    [7, 26, 'Race Day'], [8, 9, 'Race Day'], [8, 23, 'Race Day'], [9, 13, 'Race Day'],
    [9, 27, 'Race Day'], [10, 11, 'Last Points Night'], [10, 25, 'Season Finale']
];
const GREEN_FLAG_HOUR = 14; // racing starts around 2:00 PM
const cdTitle = document.getElementById('cdTitle');
const cdWhen = document.getElementById('cdWhen');
const cdClock = document.getElementById('cdClock');

function nextRace(now) {
    for (const [m, d, label] of RACE_DATES) {
        const green = new Date(2026, m - 1, d, GREEN_FLAG_HOUR, 0, 0);
        const dayEnd = new Date(2026, m - 1, d, 20, 0, 0); // race day lasts until ~8 PM
        if (now <= dayEnd) return { green, dayEnd, label };
    }
    return null;
}

function updateCountdown() {
    if (!cdClock) return;
    const now = new Date();
    const race = nextRace(now);
    const box = document.querySelector('.countdown');
    if (!race) {
        cdTitle.textContent = "That's a wrap on 2026!";
        cdWhen.textContent = 'See you next season at Camden Speedway 🏁';
        cdClock.style.display = 'none';
        return;
    }
    const opts = { weekday: 'short', month: 'short', day: 'numeric' };
    if (now >= new Date(race.green.getFullYear(), race.green.getMonth(), race.green.getDate(), 10, 0, 0) && now <= race.dayEnd) {
        cdTitle.textContent = "It's Race Day!";
        cdWhen.textContent = '🏁 Come see us at Camden Speedway — gates at noon, racing around 2 PM';
        cdClock.style.display = 'none';
        if (box) box.classList.add('raceday');
        return;
    }
    cdTitle.textContent = 'Next Race — ' + race.label;
    cdWhen.textContent = race.green.toLocaleDateString('en-US', opts) + ' · green flag ~2:00 PM · Camden Speedway';
    let secs = Math.max(0, Math.floor((race.green - now) / 1000));
    const days = Math.floor(secs / 86400); secs -= days * 86400;
    const hours = Math.floor(secs / 3600); secs -= hours * 3600;
    const mins = Math.floor(secs / 60); secs -= mins * 60;
    document.getElementById('cdDays').textContent = days;
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// --- Order form: size/option choices depend on the item picked ---
const ITEM_OPTIONS = {
    'Team T-Shirt': ['Small - $25', 'Medium - $25', 'Large - $25', 'X-Large - $25', '2X-Large - $35', '3X-Large - $35'],
    'Team Hoodie': ['Small - $55', 'Medium - $55', 'Large - $55', 'X-Large - $55', '2X-Large - $55', '3X-Large - $55'],
    'Team Hat': ['One Size Fits Most - $35'],
    'Drink Koozie': ['Black - $8 (2 for $15)', 'Purple - $8 (2 for $15)'],
    'Team Decal': ['6 inch - $10', '8 inch - $15']
};
const orderItemSel = document.getElementById('order-item');
const orderSizeSel = document.getElementById('order-size');
if (orderItemSel && orderSizeSel) {
    orderItemSel.addEventListener('change', () => {
        const opts = ITEM_OPTIONS[orderItemSel.value] || [];
        orderSizeSel.innerHTML = '';
        const first = document.createElement('option');
        first.value = '';
        first.textContent = opts.length ? 'Select size / option' : 'Select an item first';
        orderSizeSel.appendChild(first);
        opts.forEach(o => {
            const el = document.createElement('option');
            el.value = o;
            el.textContent = o;
            orderSizeSel.appendChild(el);
        });
    });
}
