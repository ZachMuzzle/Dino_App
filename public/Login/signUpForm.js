import {inputElementEmail,inputElementPassword,loginModel,submitButton,loginButton,loginForm,
    closeImage,inputElementPasswordCheck,formCenter,signUpButton,googleId,signUpForm} from '/loginForm.js'

const inputEmailSignUp = document.getElementById("inputEmailSignUp");
const inputPasswordSignUp = document.getElementById("inputPasswordSignUp")

signUpButton.addEventListener('click', function signUpClick(e) {
    formCenter[0].style.display = 'none'
    inputEmailSignUp.value = "";
    inputPasswordSignUp.value = "";

    setTimeout(function() {
        /* 
        * Hide styles that we don't want on the sign up page 
        * or changes for sign up page
        */
        formCenter[1].style.display = 'block';

    },200)
});

signUpForm.addEventListener('submit', function submitSignUpForm(e) {
    e.preventDefault();
    formCenter[1].style.display = 'none';
    /* 
    !! When we add the database creation for the username and password. Will need to check if already in the database.
    */
    setTimeout(function() {
        alert("An account has been created!")
        formCenter[0].style.display = "block";
    },1000);
});



