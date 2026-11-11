/* Lightbox for the 2026 season page.
   Every photo on the page is a <button> carrying the full-size original in
   data-full, so the page itself only ever loads the small copies. */
(function () {
    'use strict';

    var shots = Array.prototype.slice.call(
        document.querySelectorAll('.s-shot, .s-tile'));
    if (!shots.length) { return; }

    var box = document.getElementById('lightbox');
    var img = document.getElementById('lbImg');
    var cap = document.getElementById('lbCap');
    var at = 0;
    var lastFocus = null;

    function show(i) {
        at = (i + shots.length) % shots.length;
        var b = shots[at];
        img.src = b.getAttribute('data-full');
        img.alt = b.querySelector('img') ? b.querySelector('img').alt : '';
        cap.textContent = b.getAttribute('data-cap') || '';
        if (box.hidden) {
            lastFocus = document.activeElement;
            box.hidden = false;
            document.body.style.overflow = 'hidden';
        }
        // pre-load the neighbours so paging feels instant
        [at - 1, at + 1].forEach(function (n) {
            var s = shots[(n + shots.length) % shots.length];
            new Image().src = s.getAttribute('data-full');
        });
    }

    function close() {
        box.hidden = true;
        img.removeAttribute('src');   // src="" would re-request the page itself
        document.body.style.overflow = '';
        if (lastFocus) { lastFocus.focus(); }
    }

    shots.forEach(function (b, i) {
        b.addEventListener('click', function () { show(i); });
    });

    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(at - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(at + 1); });

    box.addEventListener('click', function (e) {
        if (e.target === box) { close(); }        // tap the backdrop
    });

    document.addEventListener('keydown', function (e) {
        if (box.hidden) { return; }
        if (e.key === 'Escape') { close(); }
        else if (e.key === 'ArrowLeft') { show(at - 1); }
        else if (e.key === 'ArrowRight') { show(at + 1); }
    });

    // swipe on a phone
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
        if (x0 === null) { return; }
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 48) { show(dx < 0 ? at + 1 : at - 1); }
        x0 = null;
    }, { passive: true });
}());
