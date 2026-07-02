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
    '.about-card, .benefit-item, .driver-card, .video-card, .gallery-item, .package-card, .support-card, .sponsor-logo-slot, .section-head'
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

// --- Contact form ---
const sponsorshipForm = document.getElementById('sponsorshipForm');
const formMessage = document.getElementById('form-message');
if (sponsorshipForm) {
    sponsorshipForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(sponsorshipForm));
        if (!data.name || !data.email || !data['contact-person'] || !data['sponsorship-type'] || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        console.log('Sponsorship Inquiry:', data);
        showMessage('🏁 Thank you! Your inquiry is in. We\'ll be in touch soon to talk partnership.', 'success');
        sponsorshipForm.reset();
        setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
    });
}
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}
