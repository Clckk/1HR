
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function clearFormMessage(formElement) {
    inputElement.classList.remove("form__message--error");
    inputElement.parentElement.querySelector(".form__message--error").textContent = "";
}




document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const verButton = document.querySelector('#verify-button');
    var form = document.getElementById("form");
    const myaccbtn = document.querySelector('#my-account-button')

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    document.querySelector("#signupmenu").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    //verify button
    document.querySelector("#verify-button").addEventListener("click", e => {
        if(firebase.auth().currentUser.emailVerified==false) {
            firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
            window.alert("Verification email has been sent.")
            });
        } else {
            window.alert("Email already Verified.")
        }
    });

    firebase.auth().onAuthStateChanged((user) => {
        if ((user)&&(firebase.auth().currentUser.emailVerified==false)) {
            verButton.classList.remove("form--hidden");
        } else {
            verButton.classList.add("form--hidden");
        }
      });
      

      //says ur logged in if your logged in
      //displays 'my account' button if logged in
      //resets the create acc form if logged in
      firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            setFormMessage(loginForm, "success", "You're logged in");
            myaccbtn.classList.remove("form--hidden");
            myaccbtn.classList.add("display-block");
            createAccountForm.reset();
          } else {

          }
      })

    //forgot your password


    //login on the form
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const logemail = loginForm['loginEmail'].value;
        const logpassword = loginForm['loginPassword'].value;
        

        auth.signInWithEmailAndPassword(logemail, logpassword).then(cred => {
            console.log(cred.user)
            
            setFormMessage(loginForm, "success", "You're now logged in");
            loginForm.reset();
        })
        .catch((error) => {
            setFormMessage(loginForm, "error", error.message);
        });
    });


    //signup
    createAccountForm.addEventListener("submit", e => {
        let messages = []
        e.preventDefault();
        
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var password2 = document.getElementById("signup-Password").value;
        
            


            if(password===password2 && username.length>3){
                appSignUp.auth().createUserWithEmailAndPassword( email, password)
                .then((userCredential) => {
                    let user = appSignUp.auth().currentUser;
                    user.updateProfile({
                        displayName: document.getElementById("signupUsername").value
                    })
    

                    console.log(userCredential.user)
                    loginForm.classList.remove("form--hidden");
                    createAccountForm.classList.add("form--hidden");
                    verButton.classList.remove("form--hidden");
                    appSignUp.auth().signOut();
                    createAccountForm.reset();
                    setFormMessage(loginForm, "success", "You may now log in :)");

                })
                .catch((error) => {
                    setFormMessage(createAccountForm, "error", error.message);
                });
            }
            else{
                document.getElementById("AccMainErr").textContent = 'Passowrds do not match or Username is less than 4 characters';

            }
    //  setFormMessage(createAccountForm, "error", "Invalid given information");

    //   if (email.value === '' || email.value == null){
    //     setFormMessage(inputElement, "Fill in Your Email adress");
    //     messages.push('Fill in Your email')
    //   }
    });

 
    
    
    //username error and clearing errors upon typing
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 4 characters in length");
            }
        });
        inputElement.addEventListener("input", e => {
            document.getElementById("AccMainErr").textContent = '';
            clearInputError(inputElement);
        });
    });


    // //nie dziala
    // document.querySelectorAll(".form__input").forEach(inputElement => {
    //     createAccountForm.addEventListener("submit", e => {
    //         if (e.target.id === "email" && e.target.value.length > 0 && e.target.value.length < 4) {
    //             setInputError(inputElement, "Wrong email form");
    //         }
    //     });
    //     inputElement.addEventListener("input", e => {
    //         clearInputError(inputElement);
    //     });
    // });



});








  