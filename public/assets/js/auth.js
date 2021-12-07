// const createAccunt = document.querySelector('#createAccount');
// createAccunt.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     //get user info
//     const email = createAccunt['email']
// })



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

    var form = document.getElementById("form");
   
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

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



    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });


    
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
                    appSignUp.auth().signOut();
                    createAccountForm.reset();

                })
                .catch((error) => {
                    setFormMessage(createAccountForm, "error", error.message);
                });
            }
            else{
                document.getElementById("AccMainErr").textContent = 'Passowrds do not match or Username is less than 4 characters';

            }
        
            


    //   // Perform your AJAX/Fetch login

    //  setFormMessage(createAccountForm, "error", "Invalid given information");


    //   if (email.value === '' || email.value == null){
    //     setFormMessage(inputElement, "Fill in Your Email adress");
    //     messages.push('Fill in Your email')
    //   }
    });

    // document.querySelectorAll(".form__input").forEach(inputElement => {
    //     inputElement.addEventListener("input", e => {
    //     });
    // });
    
    
    
    
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








  