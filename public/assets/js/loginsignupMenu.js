document.addEventListener("DOMContentLoaded", () => { 

    var menuItemLoggedIn = document.getElementsByClassName('logged-out');
    var menuItemLoggedOut = document.getElementsByClassName('logged-in');
    const logout = document.querySelector('#logout');
    const accSubmenu = document.getElementById('accSubmenu');

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

        accSubmenu.addEventListener('click', function(){
            if (user) {
                window.location='my-account.html';
            } else {
                window.location='login-signup.html';
            }
        })

      });


      //logout
      logout.addEventListener('click', (e) => {
          e.preventDefault();
          auth.signOut().then(() => {
              window.location.reload();
          })
      })
})

