import{closeImage,loginButtonPress,loginButton,submitButton,loginModel,inputElementEmail,inputElementPassword,loginForm} from '/loginForm.js'
import {addZoomEffect,removeZoomEffect,addShakeEffect,removeShakeEffect} from './styleEffects.js'
// const recaptchaKey = await getRecaptchPublicKey();
// const recaptchaKeyInsert = document.querySelectorAll('.g-recaptcha');
/* Pull key from api. Set the key value to the attribute in html */
// recaptchaKeyInsert[0].setAttribute("data-sitekey",recaptchaKey.key);

// recaptchaKey[0].setAttribute("data-sitekey","6LcqGJgpAAAAAN5_hDLAiWO44xIiQwBmHzbPOKDy")
// const loginBtn = document.getElementById("loginButton");

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
    if(loginResults === true) {
        await fetch('/loginCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passValue
            })
        })
            .then(async response => {
                if(!response.ok) {
                    await response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
                /* successful code */
                document.getElementById('popupMessage').style.display = 'none';
                loginModel.style.display = "none"
                
                setTimeout(function() {
                    alert("You have been logged in")
                },1000);   
            })
            .catch(error => {
                alert(error);
            });
    }
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
                /*
                !! Make resolve a reject 
                 */
                resolve(data.captchaSuccess)
                console.log('Validation failed!')
            }
        })
        .catch(err => console.log(err))
    });
}
}