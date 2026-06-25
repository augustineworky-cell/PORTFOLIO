// ============================================
// CONTACT.JS — Contact Form Logic
// ============================================
function sendMessage() {
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  if (!name || !email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  // Opens email client with pre-filled message
  const mailto = `mailto:augustine.worky@gmail.com?subject=Portfolio Enquiry from ${name}&body=${message}%0A%0AFrom: ${name}%0AEmail: ${email}`;
  window.location.href = mailto;
}
