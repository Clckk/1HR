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

        var uid = user.uid; //przypisuje id
        const displayName = user.displayName;
        const email = user.email;
        const emailver = user.emailVerified;
        const emailVerified = user.emailVerified;

        accuname.innerHTML = `${displayName}`;
        accemail.innerHTML = `${email}`
        accemailver.innerHTML = `${emailver}`

       
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
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
       window.alert("Verification email has been sent")
    });
})

 




//   const user = firebase.auth().currentUser;
//     user.updateProfile({
//     displayName: "Jane Q. User",
//     photoURL: "https://example.com/jane-q-user/profile.jpg"
//     }).then(() => {
//     // Update successful
//     // ...
//     }).catch((error) => {
//     // An error occurred
//     // ...
//     }); 
    
//     user.updateEmail("user@example.com").then(() => {
//         // Update successful
//         // ...
//       }).catch((error) => {
//         // An error occurred
//         // ...
//       });


})