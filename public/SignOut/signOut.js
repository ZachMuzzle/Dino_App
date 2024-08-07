let signOutButton = document.getElementById("signOutButton");
let userDisplayId = document.getElementById('userDisplay');
let compStyles = window.getComputedStyle(userDisplayId);

/* 
!! Function is used in Recaptcha.js, scripts.js, and gallery.js
*/
export function displaySignOutButton() {
    if(compStyles.getPropertyValue("display") === "block") {
        signOutButton.style.display = "block";
        }
}