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
const quantity = document.getElementById("quantity");
const radioButtons = document.getElementsByName("location");

// DOM Elements for error messages
const firstNameError = document.getElementById("fnameError");
const lastNameError = document.getElementById("lastnameError");
const emailError = document.getElementById("emailError");
const birthDateError = document.getElementById("birthDateError");
const quantityError = document.getElementById("quantityError");
const locationError = document.getElementById("locationError");
const conditionsError = document.getElementById("conditionsError");

//test DOM
const testError = document.getElementById("testError");

// DOM Elements for Form validation thankyou message
const modalBody = document.querySelector(".modal-body");
const message = document.getElementById("bgroundmsg");
const closeMessageBtn = document.querySelectorAll(".messageButton");

//Patterns for name & email validation checks
const nameRegex = /^[a-zA-Z]{2,30}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// reset form inputs, error messages & launch modal form
function launchModal() {
  document.getElementById("form").reset();
  firstNameError.textContent ="";
  lastNameError.textContent ="";
  emailError.textContent ="";
  quantityError.textContent ="";
  birthDateError.textContent ="";
  conditionsError.textContent = "";
  locationError.textContent = "";
  modalbg.style.display = "block";
}

//  close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//  close thankyou message event
closeMessageBtn.forEach((btn) => btn.addEventListener("click", closeMessage));

// close thankyou message & send form data?
function closeMessage() {
  message.style.display = "none";
  /*return true;
  document.forms['form'].submit();*/
}

/*const submitButton = document.querySelectorAll(".btn-submit");
submitButton.addEventListener("click", ($event) => {
  $event.preventDefault();
 });*/

// CHECK FIRST & LAST NAMES ARE VALID FUNCTION
function checkString(string, name){
  if (!nameRegex.test(string)){
    name.textContent ="Veuillez entrer 2 caractères ou plus pour ce champ.";
  } else {
    name.textContent ="";} 
}

// FIRSTNAME & LASTNAME EVENT LISTENERS
firstName.addEventListener("blur", ($event) => {
  checkString($event.target.value, firstNameError)});

lastName.addEventListener("blur", ($event) => {
  checkString($event.target.value, lastNameError)});

// CHECK EMAIL IS VALID
email.addEventListener("blur", ($event) => {
  if (!emailRegex.test($event.target.value)) {
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
// set current day on 01:00:00 hours GMT+0100 
let currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
// calculate age comparing current date and birthday
let userAge = ~~((Date.now() - userBirthday) / (31557600000));
if(userAge < 13 || userAge > 100 ) {
  return true;
  } else {
return false;
	}
}

// CHECK QUANTITY OF GameOn TOURNAMENTS PLAYED ENTERED IS VALID
quantity.addEventListener("blur", ($event) => {
  let quantity = $event.target.value;
  if (quantity == ""){
    quantityError.textContent ="Vous devez choisir une option.";
    } else if (quantity < 0 || quantity > 200) {
        quantityError.textContent ="Veuillez choisir un nombre entre 0 et 200.";
      } else {
        quantityError.textContent ="";}
});

//RADIO BUTTON EVENT LISTENERS
  let selectedCity = 0;
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("change", ($event) => {
  selectedCity = $event.target.value;
  testError.textContent = 'Vous avez choisi: '+ $event.target.value;
    if (selectedCity !== 0) {
      locationError.textContent = "";
    }
  });
}

//POLICY CHECKBOX EVENT LISTENER
document.getElementById("checkbox1").addEventListener("change", ($event) => {
  if (!$event.target.checked) {
    conditionsError.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
  } else {
    conditionsError.textContent = "";}
});

// FORM VALIDATION FUNCTION
function validate() {
      if (!firstName.value || !nameRegex.test(firstName.value)) {
      fnameError.textContent ="Veuillez entrer votre prénom";
      firstName.focus();
      return false;
    }
    if (!lastName.value || !nameRegex.test(lastName.value)) {
      lastnameError.textContent ="Veuillez entrer votre prénom";
      lastName.focus();
      return false;
    }
    if (!email.value || !emailRegex.test(email.value)) {
      emailError.textContent ="Veuillez entrer votre adresse e-mail";
      email.focus();
      return false;
    } 
    if (birthdate.value.length == 0 || AgeNotValidate(birthdate.value)){
      birthDateError.textContent ="Veuillez vérifier votre date de naissance. (âge min: 13 ans)";
      birthdate.focus();
      return false;
    }
    if (!quantity.value || quantity.value < 0 || quantity.value > 200){
      quantityError.textContent = "Veuillez choisir un nombre entre 0 et 200.";
      quantity.focus();
      return false;
    }
    if (selectedCity === 0) {
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
    message.style.display = "flex";
    return false;
}


/*

function FireOnSubmit(){
  if(validate() == true){
    modalBody.style.display = "none";
    message.style.display = "flex";
    document.getElementById("form").reset();
} else {   
    return false;
  }
}


/*
function startValidate(){
  validate();
  document.forms['form'].submit();
}

/*
function RadioChecked(){
var getSelectedValue = document.querySelectorAll( 'input[name="location"]:checked'); 
if(getSelectedValue = null) {   
  locationError.textContent = "Vous devez choisir une option.";
  return false; 
}else {  
  locationError.textContent = "test";
  return true;  }
}

function RadioChecked(){
  for (let i = 0; i < radioButtons.length; i++) {
      if (!radioButtons[i].checked) {
          locationError.textContent = "Vous devez choisir une option.";
          return false;
      } else {
          locationError.textContent = "";
          return true;
        }
  }
}*/
