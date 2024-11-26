function showPopUp(popupname) {
 if (popupname) {
  let selectedPopUp = document.querySelector("[data-popup='" + popupname + "']"); // Find the popup that matches with the parameter of the funtion.
  if (selectedPopUp) {
   selectedPopUp.style.display = 'block'; // Show the popup
  }
 }
 document.body.classList.add('has-popup'); // Add class to body
 // Find all visible 'select', 'input', 'textarea', 'button', and 'a' elements
 var inputs = Array.from(document.querySelectorAll('select, input, textarea, button, a')).filter(function (el) {
  return el.offsetParent !== null;  // Check if the element is visible
 });
 // Iterate through each visible element
 inputs.forEach(function (el) {
  var tbindex = el.getAttribute("tabindex");  // Get the current tabindex
  el.setAttribute("data-index", tbindex);  // Store the tabindex in a data-index attribute
  el.setAttribute("tabindex", -1);  // Set tabindex to -1
 });

 // Find all elements inside a div with the class 'popup' and set tabindex to 2
 var popupElements = document.querySelectorAll('.popup select, .popup input, .popup textarea, .popup button, .popup a');

 // Iterate through each element inside the popup
 popupElements.forEach(function (el) {
  el.setAttribute("tabindex", 2);  // Set tabindex to 2
 });
}

const ScrollActions = () => {
 const pos = document.documentElement.scrollTop;
 const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 const scrollValue = Math.round(pos * 100 / calcHeight);

 // Check if newsletter popup needs to be shown
 if (scrollValue > 50 && !hasShownNewsletterPopup) { // Check if popup has not been shown yet
  showPopUp("popup_nieuwsbrief");
  hasShownNewsletterPopup = true; // Set the flag to true
 }

 // // Disable utility buttons
 // const mainContentRect = mainContent.getBoundingClientRect();
 // if (mainContentRect.bottom < 0) {
 //  // If scrolled past, add the class
 //  article_btns.classList.add('doneReading');
 // } else {
 //  // If not scrolled past, remove the class
 //  article_btns.classList.remove('doneReading');
 // }
}

// Function to close all popups
function closeAllPopups() {
 let allPopups = document.querySelectorAll('.popup'); // Select all popup elements
 allPopups.forEach(popup => {
  popup.style.display = 'none'; // Hide each popup
 });
 document.body.classList.remove('has-popup'); // Remove popup-related class from body
 // Find all visible 'select', 'input', 'textarea', 'button', and 'a' elements
 var inputs = Array.from(document.querySelectorAll('select, input, textarea, button, a')).filter(function (el) {
  return el.offsetParent !== null;  // Check if the element is visible
 });

 // Iterate through each visible element
 inputs.forEach(function (el) {
  var tbindex = el.getAttribute("data-index");  // Get the value of data-index attribute
  if (tbindex) {  // If data-index exists, set it as the tabindex
   el.setAttribute("tabindex", tbindex);
  }
 });

 // Find all elements inside a div with the class 'popup' and set tabindex to -1
 var popupElements = document.querySelectorAll('.popup select, .popup input, .popup textarea, .popup button, .popup a');

 // Iterate through each element inside the popup
 popupElements.forEach(function (el) {
  el.setAttribute("tabindex", -1);  // Set tabindex to -1 for popup elements
 });

}

// Event listener for closing popups
document.querySelectorAll('.closePopUp').forEach(button => {
 button.addEventListener('click', closeAllPopups);
});

// Allow reopening the newsletter popup on button click
document.querySelectorAll('.openNewsletterPopupButton').forEach(button => {
 button.addEventListener('click', () => {
  showPopUp("popup_nieuwsbrief"); // Open the popup
 });
});

// Allow reopening the search popup on button click
document.querySelectorAll('.openSearchPopupButton').forEach(button => {
 button.addEventListener('click', () => {
  showPopUp("popup_search"); // Open the popup
 });
});


// Close popup when Escape key is pressed
document.addEventListener('keydown', function (e) {
 if (e.key === 'Escape') { // Check if the pressed key is "Escape"
  closeAllPopups();
 }
});

// Event listener to detect clicks outside the popup and close it
document.addEventListener('click', function (event) {
 // Find the active popup, assuming only one popup is visible at a time
 const activePopup = document.querySelector('.popup[style*="display: block"]');

 // Proceed only if an active popup exists
 if (activePopup) {
  // Check if the click target is outside the popup and not one of the buttons that opens the popup
  if (!activePopup.contains(event.target) &&
   !event.target.closest('.openNewsletterPopupButton') &&
   !event.target.closest('.openSearchPopupButton')) {
   closeAllPopups(); // Hide the popup if the click is outside of it
  }
 }
});

// Prevent clicks on the popup itself from closing it
popup.addEventListener('click', function (event) {
 event.stopPropagation(); // Prevent the click event from bubbling up to the document
});

// Scroll actions listener
window.onscroll = ScrollActions;

// HIDE TAGLINE AFTER SCROLL MOBILE
// Select the elements
var tagline = document.querySelector('.tagline');
var topnav = document.querySelector('.topnav');
var primaryNav = document.querySelector('.primary-navigation');
var header = document.querySelector('header');

// State variables to track visibility
let isTaglineHidden = false;
let isTopNavHidden = false;
let lastScrollY = 0; // Track the last scroll position

// Function to handle show/hide logic
function handleScroll() {
 const currentScrollY = window.scrollY;
 if (window.innerWidth < 860) { // Mobile view
  if (currentScrollY > 100 && !isTaglineHidden) {
   tagline.classList.add('hidden'); // Hide tagline
   isTaglineHidden = true; // Update state
  } else if (currentScrollY <= 100 && isTaglineHidden) {
   tagline.classList.remove('hidden'); // Show tagline
   isTaglineHidden = false; // Update state
  }
 } else { // Desktop view
  // I have added a difference of 47px between the open threshold and the close threshold, otherwise the header will stutter between an open and closed phase. This happens because the padding in the header gets increased. Then it triggers it back because it reaches the scroll limit again. This is an infinite loop.
  if (currentScrollY > 136 && !isTopNavHidden && !header.classList.contains('small')) {
   topnav.classList.add('hidden'); // Hide topnav
   primaryNav.classList.add('hidden'); // Hide primary navigation
   header.classList.add('small'); // Smaller header padding
   isTopNavHidden = true; // Update state
  } else if (currentScrollY < 89 && isTopNavHidden && header.classList.contains('small')) {
   topnav.classList.remove('hidden'); // Show topnav
   primaryNav.classList.remove('hidden'); // Show primary navigation
   header.classList.remove('small'); // Restore header padding
   isTopNavHidden = false; // Update state
  }
  // Ensure tagline is always visible if the viewport is wider than 860px
  tagline.classList.remove('hidden');
  isTaglineHidden = false; // Reset tagline visibility for desktop
 }

 lastScrollY = currentScrollY; // Update last scroll position
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);
// Attach the resize event listener to handle changes in viewport
window.addEventListener('resize', handleScroll);

// Initial call to handle display on page load
handleScroll();