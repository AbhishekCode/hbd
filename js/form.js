/*
  If you decide to switch from Google Forms embed to a native form,
  you can hook your form submission logic here. For Google Forms embed,
  this file is not required but kept for future enhancements.
*/

document.addEventListener('DOMContentLoaded', function() {
  var nativeForm = document.querySelector('form[data-native-rsvp]');
  if (!nativeForm) return;

  nativeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement custom submission (Formspree/FormSubmit/your backend) here if desired.
    alert('Thanks for your RSVP!');
  });
});


