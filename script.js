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
