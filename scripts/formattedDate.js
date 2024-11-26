let hasShownNewsletterPopup = false; // Flag to track if the popup has been shown by scrolling
let Textsizeison = 0; // Initialize the state variable
//const mainContent = document.getElementById('main_content');
//const article_btns = document.querySelector('.article_btns');
const popup = document.querySelector('.popup'); // Select your popup element

// TAGLINE ACTUAL DATE

const weekdays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]; // Array van nederlandse weeknamen
const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]; // Arrays van nederlandse maandnamen
const today = new Date(); // dagnummer
const formattedDate = `${weekdays[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`; // Het haalt de huidige dag van de week op via today.getDay() (0 = Zondag, 1 = Maandag, enz.). Hiermee wordt uit de array weekdays de juiste dagnaam gepakt in het nederlands. Het haalt de huidige dag van de maand op via today.getDate(). Het haalt de huidige maand op via today.getMonth() (0 = januari, 1 = februari, enz.). Hiermee wordt uit de array months de juiste maandnaam gepakt in het nederlands

document.getElementById("formattedDate").textContent = formattedDate; // set text in div ecual to made current date in Dutch