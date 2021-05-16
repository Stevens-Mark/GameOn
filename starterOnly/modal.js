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
const locationError = document.getElementById("locationError");
const conditionsError = document.getElementById("conditionsError");

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
    name.textContent ='Veuillez entrer 2 caractères ou plus pour ce champ (sans chiffres, espaces ou caractères spéciaux).';
    
  } else {
    name.textContent ='';
  } 
};

document.getElementById("first").addEventListener("blur", ($event) => {
  checkString($event.target.value, firstNameError)});

document.getElementById("last").addEventListener("blur", ($event) => {
  checkString($event.target.value, lastNameError)});

// CHECK EMAIL IS VALID
document.getElementById("email").addEventListener("blur", ($event) => {
  if (!emailRegex.test($event.target.value)) {
    emailError.textContent ='Veuillez entrer une adresse e-mail valide dans le champ e-mail.';
  } else {
    emailError.textContent ='';
  }
});

// CHECK BIRTHDAY ENTERED & VALID
document.getElementById("birthdate").addEventListener("blur", ($event) => {
  if ($event.target.value.length == 0) {
    birthDateError.textContent ='Vous devez entrer votre date de naissance.';
  } else if (AgeNotValidate($event.target.value)) {
    birthDateError.textContent ='Veuillez vérifier votre date de naissance.';
    valid = false;
        } else{
          birthDateError.textContent =' ';}
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
document.getElementById("quantity").addEventListener("blur", ($event) => {
  let quantity = $event.target.value;
  if (quantity === ''){
    quantityError.textContent ='Vous devez choisir une option.';
    } else if (quantity < 0 || quantity > 200) {
        quantityError.textContent ='Veuillez choisir un nombre entre 0 et 200.';
      } else {
        quantityError.textContent =' ';}
});

//RADIO BUTTON EVENT LISTENERS
const radioButtons = document.getElementsByName('location');

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', ($event) => {
    locationError.textContent = $event.target.value;
  });
}

for (let i = 0; i < radioButtons.length; i++) {
  if (!radioButtons[i].checked) {
    locationError.textContent = 'Vous devez choisir une option';
  } else {
    locationError.textContent = ' ';
  }
}

//POLICY CHECKBOX EVENT LISTENER
document.getElementById("checkbox1").addEventListener('change', ($event) => {
  if (!$event.target.checked) {
    conditionsError.textContent = 'Vous devez vérifier que vous acceptez les termes et conditions.';
  }
  else {
    conditionsError.textContent = '';
  }
});



function validate(e) {
  e.preventDefault();
	valid = true;
        const firstCheck = document.getElementById('first');
    if (firstCheck.value.length == 0) {
      checkString(document.reserve.first, lastNameError);    
      valid = false;
    }
    if (document.reserve.last.value == "") {
        checkString(document.reserve.first, lastNameError);
        valid = false;
    }
    if (document.reserve.birthdate.value.length == 0 ){
      birthDateError.textContent ='Please check';
      valid = false;
    } 
    if (document.reserve.email.value === ""){
        emailError.textContent ='Veuillez entrer une adresse e-mail';
        valid = false;
    }    
    if (document.reserve.quantity.value === ""){
        quantityError.textContent ='Vous devez choisir une option.';
        valid = false;
    }
    if (document.reserve.location.value === ""){
        locationError.textContent ='Vous devez choisir une option';
        valid = false;
    }
    if (document.reserve.checkbox1.checked == false ) {
        conditionsError.textContent = 'Vous devez vérifier que vous acceptez les termes et conditions.';
        valid = false;
    }
    return valid;
}

/*
function checkedOk(){
  for (let i = 0; i < radioButtons.length; i++) {
      if (!radioButtons[i].checked) {
          locationError.textContent = 'Vous devez choisir une option.';
          valid = false;
      } else {
          locationError.textContent = ' ';
          valid = true;
        }
  }
}*/