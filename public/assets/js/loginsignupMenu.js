document.addEventListener("DOMContentLoaded", () => { 

    var menuItemLoggedIn = document.getElementsByClassName('logged-out');
    var menuItemLoggedOut = document.getElementsByClassName('logged-in')
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            menuItemLoggedIn[0].style.display = 'none';
            menuItemLoggedIn[1].style.display = 'none';

            menuItemLoggedOut[0].style.display = 'flex';
            menuItemLoggedOut[1].style.display = 'flex';
            var uid = user.uid; //przypisuje id
       
        } else {
            menuItemLoggedIn[0].style.display = 'flex';
            menuItemLoggedIn[1].style.display = 'flex';

            menuItemLoggedOut[0].style.display = 'none';
            menuItemLoggedOut[1].style.display = 'none';
        }
      });

})

