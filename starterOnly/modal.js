function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");

// DOM Elements for form
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("quantity");
const radioButtons = document.getElementsByName("location");

// DOM Elements for error messages
const firstNameError = document.getElementById("fnameError");
const lastNameError = document.getElementById("lastnameError");
const emailError = document.getElementById("emailError");
const birthDateError = document.getElementById("birthDateError");
const quantityError = document.getElementById("quantityError");
const locationError = document.getElementById("locationError");
const conditionsError = document.getElementById("conditionsError");

// DOM Elements for Form validation thankyou message
const message = document.getElementById("messageBground");
const closeMessageBtn = document.querySelectorAll(".messageButton");

//Patterns for name & email validation checks
const nameRegex =/^[a-zA-Z]+(?:\s[a-zA-Z'-]+)*\s?$/ /* /^[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ](?:[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]|['| |-](?=[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]))*$/;*/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variable used for city location check
let selectedCity = null;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// reset error messages & launch modal form
function launchModal() {
  firstNameError.textContent ="";
  lastNameError.textContent ="";
  emailError.textContent ="";
  birthDateError.textContent ="";
  quantityError.textContent ="";
  selectedCity = null;
  conditionsError.textContent = "";
  locationError.textContent = "";
  modalbg.style.display = "block";
  document.getElementById('form').style.display = "block";
}

//  close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close thankyou message event
closeMessageBtn.forEach((btn) => btn.addEventListener("click", closeMessage));

// close thankyou message
function closeMessage() {
  message.style.display = "none";
}

// CHECK FIRST & LAST NAMES ARE VALID FUNCTION
function checkString(string, name){
  if (!nameRegex.test(string.trim()) || string.trim().length < 2){
    name.textContent ="Veuillez entrer un minimum de 2 caractères (pas de caractères spéciaux).";   /*Veuillez entrer 2 caractères ou plus pour ce champ.*/
  } else {
    name.textContent ="";} 
}

// FIRSTNAME & LASTNAME EVENT LISTENERS
firstName.addEventListener("blur", ($event) => {
  checkString($event.target.value, firstNameError);});

lastName.addEventListener("blur", ($event) => {
  checkString($event.target.value, lastNameError);});

// CHECK EMAIL IS VALID
email.addEventListener("blur", ($event) => {
  if (!emailRegex.test($event.target.value.trim())) {
    emailError.textContent ="Veuillez entrer une adresse e-mail valide.";
  } else {
    emailError.textContent ="";}
});

// CHECK BIRTHDAY ENTERED & VALID
birthdate.addEventListener("blur", ($event) => {
  if ($event.target.value.length == 0) {
    birthDateError.textContent ="Vous devez entrer votre date de naissance.";
  } else if (AgeNotValidate($event.target.value)) {
    birthDateError.textContent ="Veuillez vérifier votre date de naissance.";
        } else{
          birthDateError.textContent ="";}
});

// Function checks age more than 13yrs (Fortnite competitive age) & less than 100yrs
function AgeNotValidate(birthday){
// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
let optimizedBirthday = birthday.replace(/-/g, "/");
//set date based on birthday at 01:00:00 hours GMT+0100 
let userBirthday = new Date(optimizedBirthday);
// calculate age comparing current date and birthday
let userAge = ~~((Date.now() - userBirthday) / (31557600000));
if(userAge < 13 || userAge > 100 ) {
  return true;
  } else {
return false;
	}
}

// CHECK QUANTITY OF GameOn TOURNAMENTS PLAYED ENTERED IS VALID
tournamentQuantity.addEventListener("blur", ($event) => {
  let quantity = $event.target.value;
  if (quantity == ""){
    quantityError.textContent ="Vous devez choisir une option.";
    } else if (quantity < 0 || quantity > 99) {
        quantityError.textContent ="Veuillez choisir un nombre entre 0 et 99.";
      } else {
        quantityError.textContent ="";}
});

//RADIO BUTTON EVENT LISTENERS
  radioButtons.forEach((btn) => btn.addEventListener("change", ($event) => {
  selectedCity = $event.target.value;
    if (selectedCity !== null) {
      locationError.textContent = "";
    }
}));

/*
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("change", ($event) => {
  selectedCity = $event.target.value;
    if (selectedCity !== null) {
      locationError.textContent = "";
    }
  });
}*/

//POLICY CHECKBOX EVENT LISTENER
document.getElementById("checkbox1").addEventListener("change", ($event) => {
  if (!$event.target.checked) {
    conditionsError.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
  } else {
    conditionsError.textContent = "";}
});

// FORM VALIDATION FUNCTION
function validate(event) {
    event.preventDefault();
    if (!firstName.value || !nameRegex.test(firstName.value.trim()) || firstName.value.trim().length < 2) {
      firstNameError.textContent ="Veuillez entrer votre prénom (pas de caractères spéciaux)";
      firstName.focus();
      return false;
    }
    if (!lastName.value || !nameRegex.test(lastName.value.trim())  || lastName.value.trim().length < 2) {
      lastNameError.textContent ="Veuillez entrer votre nom (pas de caractères spéciaux)";
      lastName.focus();
      return false;
    }
    if (!email.value || !emailRegex.test(email.value.trim())) {
      emailError.textContent ="Veuillez entrer votre adresse e-mail";
      email.focus();
      return false;
    } 
    if (birthdate.value.length == 0 || AgeNotValidate(birthdate.value)){
      birthDateError.textContent ="Veuillez vérifier votre date de naissance. (âge min: 13 ans)";
      birthdate.focus();
      return false;
    }
    if (!tournamentQuantity.value || tournamentQuantity.value < 0 || tournamentQuantity.value > 99){
      quantityError.textContent = "Veuillez choisir un nombre entre 0 et 99.";
      tournamentQuantity.focus();
      return false;
    }
    if (!selectedCity) {
      locationError.textContent = "Vous devez choisir une option.";
      return false;
    } else{
      locationError.textContent = "";
    }
    if (document.reserve.checkbox1.checked == false ) {
      conditionsError.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
      document.reserve.checkbox1.focus();
      return false;
    }
    document.getElementById('form').style.display = "none";
    message.style.display = "flex";
    document.getElementById('form').reset();
}
