function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");


// DOM Elements for error messages
const firstNameError = document.getElementById("fnameError");
const lastNameError = document.getElementById("lastnameError");
const emailError = document.getElementById("emailError");
const birthDateError = document.getElementById("birthDateError");
const quantityError = document.getElementById("quantityError");


// Pattern for email validation check
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//  close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


// CHECK FIRST & LAST NAMES ARE VALID

function checkString(string, name){
  if (!/^[a-zA-Z]{2,30}$/.test(string)){
    name.innerText ='Veuillez entrer 2 caractères ou plus pour ce champ (sans chiffres, espaces ou caractères spéciaux).';
  } else {
    name.innerText ='';
  } 
};

document.getElementById("first").addEventListener("blur", function(e){
  checkString(e.target.value, firstNameError)});

document.getElementById("last").addEventListener("blur", function(e){
  checkString(e.target.value, lastNameError)});


// CHECK EMAIL IS VALID
document.getElementById("email").addEventListener("blur", function(e){
  if (!emailRegex.test(e.target.value)) {
    emailError.innerText ='Veuillez entrer une adresse e-mail valide dans le champ e-mail.';
  } else {
    emailError.innerText ='';
  }
});

// CHECK BIRTHDAY ENTERED & VALID
document.getElementById("birthdate").addEventListener("blur", function(e){
  if (e.target.value.length == 0) {
    birthDateError.innerText ='Vous devez entrer votre date de naissance.';
  } else if (AgeNotValidate(e.target.value)) {
    birthDateError.innerText ='Veuillez vérifier votre date de naissance.';
        } else{
          birthDateError.innerText =' ';}
});

//Function checks age more than 13yrs (Fortnite competitive age) & less than 100yrs
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
};

// CHECK QUANTITY OF GameOn TOURNAMENTS PLAYED ENTERED & VALID
document.getElementById("quantity").addEventListener("blur", function(e){
  let quantity = e.target.value;
  if (quantity === ''){
    quantityError.innerText ='Vous devez choisir une option.';
    } else if (quantity < 0 || quantity > 500) {
        quantityError.innerText ='Veuillez choisir un nombre entre 0 et 500.';
      } else {
        quantityError.innerText =' ';}
});


/*
 * RADIO BUTTON EVENT LISTENERS
 */
const radioButtons = document.getElementsByName('location');

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', ($event) => {
    locationError.textContent = $event.target.value;
  });
}
/* check first & last name fields are valid

function checkString(string){
  if (!/[a-zA-Z]{2,30}/.test(string)){
    return true;
  } 
};

document.getElementById("first").addEventListener("blur", function(e){
  if (checkString(e.target.value)) {
    firstNameError.innerText ='Veuillez entrer 2 caractères ou plus pour le champ du nom.';
  } else {
    firstNameError.innerText ='';
  }
});

document.getElementById("last").addEventListener("blur", function(e){
  if (checkString(e.target.value)) {
    lastNameError.innerText ='Veuillez entrer 2 caractères ou plus pour le champ du nom.';
  } else {
    lastNameError.innerText ='';
  }
});*/

