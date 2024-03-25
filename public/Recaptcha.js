import{loginButtonPress,loginButton,submitButton,loginModel,inputElementEmail,inputElementPassword,loginForm} from './loginForm.js'
// const recaptchaKey = await getRecaptchPublicKey();
// const recaptchaKeyInsert = document.querySelectorAll('.g-recaptcha');
/* Pull key from api. Set the key value to the attribute in html */
// recaptchaKeyInsert[0].setAttribute("data-sitekey",recaptchaKey.key);

// recaptchaKey[0].setAttribute("data-sitekey","6LcqGJgpAAAAAN5_hDLAiWO44xIiQwBmHzbPOKDy")
// const loginBtn = document.getElementById("loginButton");

/*
 * Look to remove event listener or try to add them outside of each other
 * instead of inside one another
 */

loginForm.addEventListener('submit', async function submitForm(e) {
    e.preventDefault();
    if((inputElementEmail.value.length == 0) || 
    (inputElementPassword.value.length == 0)) {
        console.log("Please fill out both Email and Password fields")
    } else {
    await LoginClick()
    loginModel.style.display = "none"
    /*
    !! Web Browser freezes when using alert  
    * Had to close and reopen web apps  
    */
    setTimeout(function() {
        alert("You have been logged in")
    },1000);          
}
});

loginButton.addEventListener('click', function loginEvent(){
    loginButtonPress(loginButton)

});

 export async function LoginClick() {   
    // const form = document.getElementById("loginForm");
        // form.submit();

        const captchaResponse = grecaptcha.getResponse();
        // console.log(captchaResponse)
        if (!captchaResponse.length > 0) {
            // throw new Error("Captcha not complete!")
            // setTimeout(function() {
            //     alert("You must complete the Captcha verification before submitting")
            // },0);
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