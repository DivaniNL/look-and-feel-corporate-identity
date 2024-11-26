document.addEventListener("DOMContentLoaded", function () {
 const form = document.querySelector("form");
 const nameInput = document.getElementById("name");
 const emailInput = document.getElementById("email");
 const subjectInput = document.getElementById("subject");
 const messageInput = document.getElementById("message");

 // Function to handle custom error messages
 function handleError(inputElement, errorElement, emptyMessage, formatMessage) {
  inputElement.addEventListener("invalid", function (event) {
   event.preventDefault(); // Prevent the default validation message from appearing

   // Clear any previous custom validity message
   inputElement.setCustomValidity("");

   if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(emptyMessage); /* Required field not filled */
   } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(formatMessage); /* Input does not match regex (example: wrong email) */
   }

   // Show custom error message and make it visible
   errorElement.textContent = inputElement.validationMessage;
   errorElement.style.display = "block"; // Show the error message

   // Add the invalid class to trigger the outline
   inputElement.classList.add("invalid");
  });

  inputElement.addEventListener("input", function () {
   inputElement.setCustomValidity(""); // Reset when user starts typing
   errorElement.textContent = ""; // Clear the error message

   // If there's no error, hide the error message and remove the invalid class
   if (inputElement.checkValidity()) {
    errorElement.style.display = "none";
    inputElement.classList.remove("invalid");
   }
  });
 }

 // Set error messages for all fields
 handleError(nameInput, document.getElementById("nameError"), "Naam is verplicht.", "");
 handleError(emailInput, document.getElementById("emailError"), "Email-adres is verplicht.", "Vul een geldig email-adres in.");
 handleError(subjectInput, document.getElementById("subjectError"), "Onderwerp is verplicht.", "");
 handleError(messageInput, document.getElementById("messageError"), "Bericht is verplicht.", "");

 // Prevent form submission if there are validation errors
 form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form submission
  if (form.checkValidity()) { // If the form is valid
   form.submit(); // Proceed with the form submission
  }
 });
});
