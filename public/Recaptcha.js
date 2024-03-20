import{loginButtonPress,loginButton,submitButton,loginModel} from './loginForm.js'
/* 
!! Errors to look into below
*An invalid form control is not focusable. 3 localhost:3000
*The invalid form control with name=‘g-recaptcha-response’ is not focusable. localhost:3000
*An invalid form control is not focusable.
* Means that the fields for the form were empty.
*/
const recaptchaKey = await getRecaptchPublicKey();
const recaptchaKeyInsert = document.querySelectorAll('.g-recaptcha');
recaptchaKeyInsert[0].setAttribute("data-sitekey",recaptchaKey.key);

async function getRecaptchPublicKey() {
return new Promise((resolve) => {

    fetch('/login/key')
    .then(response => response.json())
    .then(data => {
        resolve(data)
    })
    .catch(err => console.log(err))
});
}

// recaptchaKey[0].setAttribute("data-sitekey","6LcqGJgpAAAAAN5_hDLAiWO44xIiQwBmHzbPOKDy")
// const loginBtn = document.getElementById("loginButton");

/*
 * Look to remove event listener or try to add them outside of each other
 * instead of inside one another
 */
loginButton.addEventListener('click', function loginEvent(){
    loginButtonPress(loginButton)
    
         /* 
         * I need to create logic that makes sure the fields are filled before
         * submitting
         */
         submitButton.onclick = async function submitFormClose() {
            await LoginClick()
            loginModel.style.display = "none"
            setTimeout(function() {
                alert("You have been logged in")
            },0);          
        }


    // const captchaReturnValue = LoginClick();
    // console.log("Returned value: ", captchaReturnValue)
});

 export async function LoginClick() {   
    // const form = document.getElementById("loginForm");
        // form.submit();

        const captchaResponse = grecaptcha.getResponse();
        console.log(captchaResponse)
        if (!captchaResponse.length > 0) {
            throw new Error("Captcha not complete!")
        }

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
                console.log('Validation failed!')
                resolve(data.captchaSuccess)
            }
        })
        .catch(err => console.log(err))
    });
}