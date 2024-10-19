document.addEventListener("DOMContentLoaded", function() {
    // URL of your Firebase Function
    const functionUrl = "https://us-central1-quickquiz-4cb8a.cloudfunctions.net/getFirebaseConfig";

    // Fetch the data from the Firebase Function
    fetch(functionUrl)
      .then(response => response.json()) // Assuming the function returns a JSON response
      .then(data => {
          firebase.initializeApp(data);
        // Initialize Firebase Authentication
          const auth = firebase.auth(); 
          
          const playBtn = document.getElementById('playBtn');
          const category = document.getElementById('categ');
          const type = document.getElementById('typ');

          playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('category',category.value);
            localStorage.setItem('type',type.value);
            auth.signInAnonymously().catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            }).then(cred=>{
                window.location.assign('/game.html');
            });
        });

      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
});


