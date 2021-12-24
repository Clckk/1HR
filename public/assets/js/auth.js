
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
    const forgotPasswordForm = document.querySelector("#forgotPassword")
    const verButton = document.querySelector('#verify-button');
    var form = document.getElementById("form");
    const myaccbtn = document.querySelector('#my-account-button');
    const loggedForm = document.querySelector('#loginform');
    const logoutbtn = document.querySelector('#logout-button');
    const resetpasswordbtn = document.querySelector('#resetPassword');

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


  

      
      //if logged in:
      //says ur logged in, displays 'my account' button, resets the create acc form 
      firebase.auth().onAuthStateChanged((user) => {
          if(user) {
              if (user.emailVerified==true) {
                  setFormMessage(loginForm, "success", "You're logged in");
                  myaccbtn.classList.remove("form--hidden");
                  myaccbtn.classList.add("display-block");
                  createAccountForm.reset();
                  loggedForm.classList.add("form--hidden");
                  logoutbtn.classList.remove("form--hidden");
                  verButton.classList.add("form--hidden");
              }
              //if logged out
              else {
                  verButton.classList.remove("form--hidden");
                  document.querySelector("#verify-button").addEventListener("click", e => {
                    user.sendEmailVerification()
                    .then(() => {
                        window.alert(`Verification email has been sent to ${user.email} `)
                    });
            });
            }
         } 
      })


      //logout
      logoutbtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.reload();
        })
      })
    
    //forgot your password
    document.querySelector("#forgotpasswordlink").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.remove("form--hidden");
    })

    resetpasswordbtn.addEventListener('click', (e) => {
        e.preventDefault();

       var resetemail = $("#resetEmail").val();
       if(resetemail != "") {
            auth.sendPasswordResetEmail(resetemail).then(function() 
            {
                window.alert("Email has been sent. Please check your mailbox and verify then refresh the page.")
            })
            .catch(function(error) {
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            })
        } else {
            window.alert("Please input Your email adress first.")
        }
        
        })


    //login on the form
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const logemail = loginForm['loginEmail'].value;
        const logpassword = loginForm['loginPassword'].value;
        

        auth.signInWithEmailAndPassword(logemail, logpassword).then(cred => {
            console.log(cred.user)
            if(cred.user.emailVerified==false){
                setFormMessage(loginForm, "error", "Verify your e-mail first then try logging in.");
                firebase.auth().signOut();
            } else {
                
                setFormMessage(loginForm, "success", "You're now logged in");
                myaccbtn.classList.remove("form--hidden");
                myaccbtn.classList.add("display-block")
                loginForm.reset();
                // window.location.reload();

            }
            
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
    
                    user.sendEmailVerification().then(() => {
                        window.alert(`Verification email has been sent to ${user.email} `)
                    });

                    console.log(userCredential.user)
                    loginForm.classList.remove("form--hidden");
                    createAccountForm.classList.add("form--hidden");
                    appSignUp.auth().signOut();
                    createAccountForm.reset();
                    setFormMessage(loginForm, "success", "Account created, please verify your email now");

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








  