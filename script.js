/* =====================================================================
   Nurulhaqq Quranic & Arabic School — shared vanilla JS
   Handles: nav toggle, sticky header, reveal-on-scroll, lightbox,
            contact form, admissions form, footer year.
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    function closeNav() {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ---------- Lightbox (school life + facilities) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightbox-content');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(item) {
    var title = item.dataset.title || '';
    var src = item.dataset.img || '';
    if (!lightbox || !lightboxContent) return;

    lightboxContent.innerHTML =
      (src
        ? '<img src="' + src + '" alt="' + title + '" loading="lazy" />'
        : '') +
      (title ? '<p class="lightbox__title">' + title + '</p>' : '') +
      '<p class="lightbox__hint">Click outside or press Esc to close</p>';

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxContent) return;
    lightbox.classList.remove('is-open');
    lightboxContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (lightbox && lightboxClose) {
    document.querySelectorAll('.gallery-item, .facility').forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(item);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Contact form (UI only) ---------- */
  var contactForm = document.getElementById('contact-form');
  var formNote = document.getElementById('form-note');
  if (contactForm && formNote) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      formNote.hidden = false;
      contactForm.reset();
    });
  }

  /* ---------- Admissions form (mailto) ---------- */
  var admissionForm = document.getElementById('admission-form');
  var formStatus = document.getElementById('form-status');

  if (admissionForm && formStatus) {
    admissionForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(admissionForm);
      var childName = formData.get('childName') ? formData.get('childName').trim() : '';
      var parentName = formData.get('parentName') ? formData.get('parentName').trim() : '';
      var email = formData.get('email') ? formData.get('email').trim() : '';
      var grade = formData.get('grade') ? formData.get('grade').trim() : '';
      var program = formData.get('program') ? formData.get('program').trim() : '';

      if (!childName || !parentName || !email || !grade || !program) {
        formStatus.textContent = 'Please complete all required fields before submitting.';
        formStatus.style.color = '#a13d38';
        return;
      }

      var subject = encodeURIComponent('Admissions Inquiry - ' + childName);
      var body = encodeURIComponent(
        'Child Name: ' + childName + '\n' +
        'Date of Birth: ' + (formData.get('dob') || 'Not provided') + '\n' +
        'Grade Level: ' + grade + '\n' +
        'Program Interest: ' + program + '\n\n' +
        'Parent/Guardian Name: ' + parentName + '\n' +
        'Phone: ' + (formData.get('phone') || 'Not provided') + '\n' +
        'Email: ' + email + '\n\n' +
        'Additional Notes:\n' + (formData.get('message') || 'No additional notes.')
      );

      window.location.href = 'mailto:admissions@nurulhaqqschool.com?subject=' + subject + '&body=' + body;
      formStatus.textContent = 'Your inquiry is ready to send via email. Please review and send the message in your mail app.';
      formStatus.style.color = '#0F6B4F';
      admissionForm.reset();
    });
  }

  /* ---------- Application form (frontend demo only) ---------- */
  var applyForm = document.getElementById('apply-form');
  var applyStatus = document.getElementById('apply-status');

  if (applyForm && applyStatus) {
    applyForm.addEventListener('submit', function (event) {
      event.preventDefault();
      applyStatus.hidden = false;
      applyStatus.classList.add('is-visible');
      applyStatus.textContent =
        'Thank you! This is a demo application form — nothing has been submitted to any database. ' +
        'Please call the school on 07033193237 to complete your child\u2019s application.';
      applyForm.reset();
    });
  }
})();