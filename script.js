const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

const admissionForm = document.getElementById('admission-form');
const formStatus = document.getElementById('form-status');

if (admissionForm) {
  admissionForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(admissionForm);
    const childName = formData.get('childName')?.toString().trim();
    const parentName = formData.get('parentName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const grade = formData.get('grade')?.toString().trim();
    const program = formData.get('program')?.toString().trim();

    if (!childName || !parentName || !email || !grade || !program) {
      formStatus.textContent = 'Please complete all required fields before submitting.';
      formStatus.style.color = '#a13d38';
      return;
    }

    const subject = encodeURIComponent(`Admissions Inquiry - ${childName}`);
    const body = encodeURIComponent(
      `Child Name: ${childName}\n` +
      `Date of Birth: ${formData.get('dob') || 'Not provided'}\n` +
      `Grade Level: ${grade}\n` +
      `Program Interest: ${program}\n\n` +
      `Parent/Guardian Name: ${parentName}\n` +
      `Phone: ${formData.get('phone') || 'Not provided'}\n` +
      `Email: ${email}\n\n` +
      `Additional Notes:\n${formData.get('message') || 'No additional notes.'}`
    );

    window.location.href = `mailto:admissions@nurulhaqqschool.com?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Your inquiry is ready to send via email. Please review and send the message in your mail app.';
    formStatus.style.color = '#163d2b';
    admissionForm.reset();
  });
}
