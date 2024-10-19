document.addEventListener("DOMContentLoaded", function () {
    const functionUrl = "https://us-central1-quickquiz-4cb8a.cloudfunctions.net/getFirebaseConfig";
    // Fetch the data from the Firebase Function
    fetch(functionUrl)
        .then(response => response.json()) // Assuming the function returns a JSON response
        .then(data => {
            firebase.initializeApp(data);
            // Initialize Firebase Authentication
            const db = firebase.firestore();
            let score = 0;
            const finalScore = document.getElementById('finalScore');
            const username = document.getElementById('username');
            const saveBtn = document.getElementById('saveBtn');
            const recentScore = localStorage.getItem('recentScore') || 0;
            if (finalScore) {
                finalScore.innerHTML = `<h2>${recentScore}</h2>`;
            }
            username.addEventListener("keyup", () => {
                saveBtn.disabled = !username.value;
            });
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                score = parseInt(recentScore);
                if (score > 50) {
                    db.collection('scores').add({
                        score: score,
                        username: username.value,
                    }).then(() => {
                        localStorage.removeItem('recentScore');
                        window.location.assign('/index.html');
                    }).catch(error => {
                        console.log(error.message);
                    });
                }
                else {
                    localStorage.removeItem('recentScore');
                    window.location.assign('/index.html');
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});




