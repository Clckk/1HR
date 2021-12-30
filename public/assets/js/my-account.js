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

const myacctab = document.querySelector('#myacc-tab')
const myacclogin = document.querySelector('#myacc-login')

const accuname = document.querySelector('#acc-uname')
const accemail = document.querySelector('#acc-email')
const accemailver = document.querySelector('#acc-ver-email')




firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        $('.section-headline.accountpage h2').html("My Account");
        myacctab.classList.remove("form--hidden");
        myacclogin.classList.add("form--hidden");

        var uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;
        const emailver = user.emailVerified;
        const emailVerified = user.emailVerified;

        accuname.innerHTML = `${displayName}`;
        accemail.innerHTML = `${email}`
        //accemailver.innerHTML = `${emailver}`         ZAKOMENTOWANE BO BYŁ ERROR, NIMA TEGO W HTML

        var orderNum = 0;
        const ordersWrapper = document.getElementById('orders-wrapper');
        OrderTable =[];
        db.ref('users/' + firebase.auth().currentUser.uid +'/Orders').get().then((snapshot) => {
            orderNum=snapshot.val();
            for (let i = 1; i <= orderNum; i++) {
                ordersWrapper.insertAdjacentHTML('beforeend',
                `<div class='order-el'><div>Order id: #${i}</div><div class="order-el-date"> </div></div>`)
                var orderWrapper = document.getElementsByClassName('order-el');
                var orderDate = document.getElementsByClassName('order-el-date');

                db.ref('users/' + firebase.auth().currentUser.uid + '/' + i).get().then((snapshot) => {
                    OrderTable = snapshot.val();
                    orderDate[i-1].innerHTML = `Date: ${OrderTable.Date}`
                    OrderTable = Object.values(OrderTable);
                    for (let j=0; j< OrderTable.length -1 ;j++) {               //te -1 jest po to æeby nie próbowoaøo zczytac 'Title' z Daty
                        orderWrapper[i-1].insertAdjacentHTML('beforeend',
                        `<div><a href='#'><span>${OrderTable[j].Title}</span></a></div>`)
                    }
                });
                
            }
        });

       
    } else {
        $('.section-headline.accountpage h2').html(
        "<h2 href='login-signup.html'> Log in to see your account </h2>");

        myacctab.classList.add("form--hidden");
        myacclogin.classList.remove("form--hidden");
    }

    // accSubmenu.addEventListener('click', function(){
    //     if (user) {
    //         window.location='my-account.html';
    //     } else {
    //         window.location='login-signup.html';
    //     }
    // })

  });

//logout
const mylogout = document.querySelector('#my-logout');
mylogout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.reload();
    })
})


//verify email
const verifybutton = document.querySelector('#verify-button');
verifybutton.addEventListener('click', (e) => {
    if(firebase.auth().currentUser.emailVerified==false) {
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
        window.alert("Verification email has been sent.")
        });
    } else {
        window.alert("Email already Verified.")
    }
})

 



//MODALS//
    $('.modal').hide()


    $('#edit-acc-uname').on('click',function(){$('#modal_2').fadeIn(100)}); 
    const editUname = document.querySelector("#edit_uname");
    editUname.addEventListener("submit", e => {
        e.preventDefault();

        const user = firebase.auth().currentUser;
        var changedUsername = document.getElementById("changed_username").value
        
        if(changedUsername.length > 3) {
            user.updateProfile({
            displayName: (changedUsername),
            }).then(() => {
                
                setFormMessage(editUname, "success", "Username changed successfully");

            }).catch((error) => {
                setFormMessage(editUname, "error", error.message);
            }); 
        }
    });

    $('#edit-acc-email').on('click',function(){$('#modal_3').fadeIn(100)}); 
    const editEmail = document.querySelector("#edit_email");
    editEmail.addEventListener("submit", e => {
        e.preventDefault();

        const user = firebase.auth().currentUser;
        var changedEmail = document.getElementById("changed_email").value

        user.updateEmail(changedEmail)
        .then(() => {
            
            setFormMessage(editEmail, "success", "Email adress changed successfully");

        }).catch((error) => {
            setFormMessage(editEmail, "error", error.message);

        });
    });


    //modal errors
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "changed_username" && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 4 characters in length");
            }
        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    
    //if the user clicks outside the modal window, then close modal by calling closeModal()
    document.addEventListener(
        "click",
        function(event) {
          if (
            event.target.closest(".modal") && !event.target.closest(".modal-content")
          ) {
            closeModal()
          }
        },
        false
      )
      function closeModal() {
        $('.modal').fadeOut(100);
      }

})