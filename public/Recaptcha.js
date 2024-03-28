import{closeImage,loginButtonPress,loginButton,submitButton,loginModel,inputElementEmail,inputElementPassword,loginForm} from './loginForm.js'
import {addZoomEffect,removeZoomEffect,addShakeEffect,removeShakeEffect} from './styleEffects.js'
// const recaptchaKey = await getRecaptchPublicKey();
// const recaptchaKeyInsert = document.querySelectorAll('.g-recaptcha');
/* Pull key from api. Set the key value to the attribute in html */
// recaptchaKeyInsert[0].setAttribute("data-sitekey",recaptchaKey.key);

// recaptchaKey[0].setAttribute("data-sitekey","6LcqGJgpAAAAAN5_hDLAiWO44xIiQwBmHzbPOKDy")
// const loginBtn = document.getElementById("loginButton");

loginForm.addEventListener('submit', async function submitForm(e) {
    e.preventDefault();
    // if((inputElementEmail.value.length == 0) || 
    // (inputElementPassword.value.length == 0)) {
    //     alert("Please fill out both Email and Password fields")
    // } else {
    await submitClick()
    loginModel.style.display = "none"
    /*
    !! Web Browser freezes when using alert  
    * Had to close and reopen web apps  
    */
    setTimeout(function() {
        alert("You have been logged in")
    },1000);          
// }
});

loginButton.addEventListener('click', function loginEvent(){
    loginButtonPress(loginButton)

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
        if (!captchaResponse.length > 0) {
            if(document.getElementById("popupValue")) {
                /*
                * Add shake effect to element
                */
               addShakeEffect();
               setTimeout(removeShakeEffect,2000);
                throw new Error('Complete the Captcha!')
            }
            else {
                setTimeout(function() {
                    popupMessageAlert();
                },0);
                throw new Error("Captcha not complete!")
            }
        }
        else {

        const fd = new FormData(document.querySelector("form"));
        // console.log(fd)
        const params = new URLSearchParams(fd);
        // console.log(params)
        //request to home page for now
    return new Promise((resolve,reject) => {

        fetch('/login', {
            method: "POST",
            body: params,
        })
        .then(response => response.json())
        .then(data => {
            if (data.captchaSuccess) {
                resolve(data.captchaSuccess)
                console.log('Validation successful!')
            } else {
                resolve(data.captchaSuccess)
                console.log('Validation failed!')
            }
        })
        .catch(err => console.log(err))
    });
}
}