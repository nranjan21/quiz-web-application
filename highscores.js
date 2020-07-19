const scorelist = document.querySelector('#score-list');
function renderScore(doc) {
  let li = document.createElement('li');
  let username = document.createElement('span');
  let score = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  username.textContent = doc.data().username;
  score.textContent = doc.data().score;
 
  li.appendChild(username);
  li.appendChild(score);

  scorelist.appendChild(li);
};

db.collection('scores').orderBy('score',"desc").limit(10).get().then((snapshot) => {
 snapshot.docs.forEach(doc=>{
      renderScore(doc);
 });
});