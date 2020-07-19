const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signInAnonymously().catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      }).then(cred=>{
          window.location.assign('/game.html');
      });
});

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log('annonymously signed in');
      console.log(uid);
    } else {
     
    }
  });