import{closeImage,loginButtonPress,loginButton,submitButton,loginModel,inputElementEmail,inputElementPassword,loginForm} from '/loginForm.js'
import {addZoomEffect,removeZoomEffect,addShakeEffect,removeShakeEffect} from './styleEffects.js'
import { removeLoginButton } from './Login/loginFeature.js';
import { displaySignOutButton } from './SignOut/signOut.js';
import { navbarResize } from './SignOut/signOut.js';
// const recaptchaKey = await getRecaptchPublicKey();
// const recaptchaKeyInsert = document.querySelectorAll('.g-recaptcha');
/* Pull key from api. Set the key value to the attribute in html */
// recaptchaKeyInsert[0].setAttribute("data-sitekey",recaptchaKey.key);

// recaptchaKey[0].setAttribute("data-sitekey","6LcqGJgpAAAAAN5_hDLAiWO44xIiQwBmHzbPOKDy")
// const loginBtn = document.getElementById("loginButton");
/*
!! Look into putting loginForm.addEventListener into it's own file.
 */
loginForm.addEventListener('submit', async function submitForm(e) {
    e.preventDefault();
    const emailValue = inputElementEmail.value;
    const passValue = inputElementPassword.value;
    
    // if((inputElementEmail.value.length == 0) || 
    // (inputElementPassword.value.length == 0)) {
    //     alert("Please fill out both Email and Password fields")
    // } else {
    const loginResults = await submitClick()
    console.log("Results after logging in: ", loginResults);
    if(loginResults == true) {
        try {
            const response = await fetch('/loginCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passValue
                })
            });
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            const data = await response.json();
            
            let userDisplayId = document.getElementById('userDisplay');
            document.getElementById('popupMessage').style.display = 'none';
            loginModel.style.display = "none"
            userDisplayId.innerHTML = data.Email;
            userDisplayId.style.display = "block";
            removeLoginButton();
            displaySignOutButton();
            navbarResize(true);
            setTimeout(function() {
                alert(`User ${data.Email} was signed in`);
            },500);
        } catch(error) {
            alert(error);
        }
    } 
});

/* 
* Removal of pop value happens in closeButtons()
*/
function popupMessageAlert() {
    const popupMessageId = document.getElementById('popupMessage')
    const popupValue = document.createElement("div");
    const popupValueContents = document.createTextNode("Please complete Recaptcha before submitting")
    popupValue.setAttribute("id", "popupValue");
    popupValue.appendChild(popupValueContents);
    popupMessageId.appendChild(popupValue);
    addZoomEffect();
    popupMessageId.style.display = 'block'
    setTimeout(removeZoomEffect,1000);
    

}

 export async function submitClick() {   
    // const form = document.getElementById("loginForm");
        // form.submit();
        const captchaResponse = grecaptcha.getResponse();
        // console.log(captchaResponse)
        if (captchaResponse.length === 0) {
            const popupElement = document.getElementById("popupValue");
            if(popupElement) {
               addShakeEffect();
               setTimeout(removeShakeEffect,2000);
                throw new Error('Complete the Captcha!')
            }
            else {
                setTimeout(popupMessageAlert,0);
                throw new Error("Captcha not complete!")
            }
        }
        else {

        const fd = new FormData(document.querySelector("form"));
        // console.log(fd)
        const params = new URLSearchParams(fd);
        // console.log(params)
        //request to home page for now
        try {
        const response = await fetch('/login', {
            method: "POST",
            body: params,
        });

        const data = await response.json();
        console.log(data.captchaSuccess ? 'Validation successful!' : 'Validation failed!');
        return data.captchaSuccess;
    } catch(err) {
        console.error("Error: ", err);
        throw err;
    }
}
}