/* Error when importing this file.
?? Process still works though. Will need to look into this
*/
import{closeButtons} from './gallery.js'
/* DOM Methods */
export const inputElementEmail = document.getElementById('inputEmail')
export const inputElementPassword = document.getElementById('inputPassword')
const inputElementPasswordCheck = document.getElementById('passwordCheck')
let closeImage = document.querySelectorAll('.close');
let modal = document.getElementById("updateModal");
let popupModel = document.getElementById("popupModel");
export const loginModel = document.getElementById('loginModel');
export const submitButton = document.getElementById('submitBtn');
export const loginButton = document.getElementById('loginButton');
export const loginForm = document.getElementById('loginForm');
// loginButtonPress(loginButton);
export function loginButtonPress(loginButton) {
    if(loginButton) {
            loginModel.style.display = "flex";
            loginForm.style.display = "block";
            inputElementEmail.value = "";
            inputElementPassword.value = "";
            inputElementPasswordCheck.checked = false;
    }
}
/* Call function only on hover over */
closeImage[0].onmouseover = function() {
      closeButtons(closeImage,modal,loginModel,popupModel)

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


