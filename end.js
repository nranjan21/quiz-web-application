const finalScore = document.getElementById('finalScore');
const username = document.getElementById('username');
const saveBtn = document.getElementById('saveBtn');
const recentScore = localStorage.getItem('recentScore');

finalScore.innerHTML= `<h1 style="color: white;">${recentScore}</h1>`;

username.addEventListener("keyup",()=>{
    saveBtn.disabled = !username.value;
});

saveBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log('clicked save button');
    console.log(auth.currentUser.uid);
    
    db.collection('scores').add({
        score: parseInt(recentScore),
        username: username.value,
    }).then(() => {
        console.log('data added');
        window.location.assign('/index.html');
    }).catch(error => {
        console.log(error.message);
    });
});

