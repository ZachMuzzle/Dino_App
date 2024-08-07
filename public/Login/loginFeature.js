// disable button for user email display
// Can't just use style.display... need to get the rendered style below
let userDisplayId = document.getElementById('userDisplay');
let loginButtonId = document.getElementById('loginButton');
let userDisplayClass = document.querySelectorAll('.userDisplayButton');
let compStyles = window.getComputedStyle(userDisplayId);

userDisplayId.disabled = "disabled";

/* 
!! Function is used in Recaptcha.js, scripts.js, and gallery.js
*/
export function removeLoginButton() {
if(compStyles.getPropertyValue("display") === "block") {
    loginButtonId.style.display = "none";
    }
}

export function addLoginButton() {
    if(compStyles.getPropertyValue("display") === "none") {
        loginButtonId.style.display = "block";
    }
}