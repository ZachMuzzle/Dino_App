//Import gallery.js is pulled from index.js. Where we routed it.
import{closeButtons} from '../reusedFunctions/closeButtons.js'
/* DOM Methods */
export const inputElementEmail = document.getElementById('inputEmail')
export const inputElementPassword = document.getElementById('inputPassword')
export const loginModel = document.getElementById('loginModel');
export const submitButton = document.getElementById('submitBtn');
export const loginButton = document.getElementById('loginButton');
export const loginForm = document.getElementById('loginForm');
export const closeImage = document.querySelectorAll('.close');
export const inputElementPasswordCheck = document.getElementById('passwordCheck')
export const formCenter = document.querySelectorAll('.center');
export const signUpButton = document.getElementById('signUpButton').querySelector('span');
export const resetPasswordButton = document.getElementById('passwordResetButton').querySelector('span');
export const googleId = document.getElementById('gID');
export const signUpForm = document.getElementById('signUpForm');
export const passwordCheckSignUp = document.getElementById("passwordCheckSignUp")


let modal = document.getElementById("updateModal");
let popupModel = document.getElementById("popupModel");
/* Login Box Style displays */
export function loginButtonPress(loginButton) {
    if(loginButton) {
            inputElementEmail.value = "";
            inputElementPassword.value = "";
            inputElementPasswordCheck.checked = false;
            passwordCheckSignUp.checked = false;
            loginModel.style.display = "flex";
            loginForm.style.display = "block";
            formCenter[0].style.display = "block";
            formCenter[1].style.display = "none";
            googleId.style.display = "none";

    }
}
/* Listener  for login button  press */
loginButton.addEventListener('click', function loginEvent(){
    loginButtonPress(loginButton)
});
/* Call function only on hover over */
closeImage[0].onmouseover = function() {
      closeButtons(closeImage,modal,loginModel,popupModel)


}
/* Hide and un-hide google recaptcha */
loginModel.onmouseover = function() {
    if(inputElementEmail.value.length >= 1 && inputElementPassword.value.length >=1) {
        googleId.style.display = "block";
    }
    else {
        googleId.style.display = "none";
    }
}
/* 
* submit button click. This is where once submit is clicked a login will occur.
* This would in theory call to the database and check if user has account and log them in or not
*/
// submitButton.onclick = function submitFormClose() {
//     loginModel.style.display = "none"
//       setTimeout(function() {
//           alert("You have been logged in")
//       },0)  
// }


