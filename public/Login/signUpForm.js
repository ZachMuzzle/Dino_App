import {inputElementEmail,inputElementPassword,loginModel,submitButton,loginButton,loginForm,
    closeImage,inputElementPasswordCheck,formCenter,signUpButton,googleId,signUpForm} from '/loginForm.js'

const inputEmailSignUp = document.getElementById("inputEmailSignUp");
const inputPasswordSignUp = document.getElementById("inputPasswordSignUp")
const strength = {
    1: "Very weak",
    2: "Weak",
    3: "Medium",
    4: "Strong"
}
const length = {
    1: "Too long",
    2: "Too short"
}

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

signUpForm.addEventListener('submit', async function submitSignUpForm(e) {
    try {
        e.preventDefault();
        formCenter[1].style.display = 'none';
        let passwordCheckValue = checkPasswordStrength(inputPasswordSignUp.value);
        
        if(passwordCheckValue === "Too short") {
            console.log("Password is too short");
            alert("Password is too short");
            formCenter[0].style.display = "block";
        }
    
        else if(passwordCheckValue === "Too long") {
           console.log("Password is too long");
            alert("Password is too long");
            formCenter[0].style.display = "block";
        }
    
        else if(passwordCheckValue === "Strong") {
            console.log("Strong password was returned");
        /* 
        !! When we add the database creation for the username and password. Will need to check if already in the database.
        */
       await fetch('/createNewUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: inputEmailSignUp.value, pass: inputPasswordSignUp.value})
       })
       .then(response => response.json())
       .catch(error => {
        console.log('Firebase account creation error: ', error)
       });
            setTimeout(function() {
                alert("Please use the link in the email sent to " + inputEmailSignUp.value + " to verify your account")
                formCenter[0].style.display = "block";
            },1000);
        } 
        else if(passwordCheckValue === "Very weak") {
            alert("Password is very weak please try again");
            formCenter[1].style.display = 'block';
            submitSignUpForm()
        }
        else if(passwordCheckValue === "Weak") {
            alert("Password is weak please try again");
            formCenter[1].style.display = 'block';
            submitSignUpForm()
        }
        else if(passwordCheckValue === "Medium") {
            alert("Password is medium please try again");
            formCenter[1].style.display = 'block';
            submitSignUpForm()
        }
        else {
            throw new Error("Unknown error in password creation")
        }
    } catch(err) {
        console.log(err);
    }
});

/* Check password length and check strength of password */
function checkPasswordStrength(pass) {
    if (pass.length > 20) {
        console.log(pass + " Password is too lengthy");
        return length[1];
    }
    else if (pass.length < 8) {
        console.log(pass + " Password is too short");
        return length[2];
    }

    else if (pass.length > 8 && pass.length < 20) {

    
    let regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,20}$/; 
        if (regex.test(pass)) { 
             console.log(pass  
            + " Password is strong"); 
        }
    let count = 0; 
    let regex1 = /[a-z]/; 
    if (regex1.test(pass)) count++; 
    let regex2 = /[A-Z]/; 
    if (regex2.test(pass)) count++; 
    let regex3 = /[\d]/; 
    if (regex3.test(pass)) count++; 
    let regex4 = /[!@#$%^&*.?]/; 
    if (regex4.test(pass)) count++;
    
    console.log(pass + " Password is " + strength[count]);
    return strength[count];
    
    }
}




