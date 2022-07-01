const titleData = document.getElementById("title")
const bodyData = document.getElementById("body")
const card = document.getElementById("cards")

function fetchThings() {
  card.innerHTML = ""
  fetch("/tags")
    .then((response) => response.json())
    .then((data) => {
      data.forEach( (tag) => {
        card.innerHTML += `
          <div class="card">
            <div class="container">
              <h4>${tag.title}</h4>
              <p>${tag.body}</p>
              <img onclick="deleteThings(${tag.id})" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg=="/>
          </div>
        `;
      });
    });
};
fetchThings();

async function addThings() {
  const form = {
    title: titleData.value,
    body: bodyData.value
  };
  const body = {
    method: "POST",
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' }
  }
  await fetch("/add", body)
    .then( response => response.json() )
    .then( data => {
      console.log(data);
      fetchThings();
    })
}

async function deleteThings( id ) {
  const body = {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  }
  await fetch("/delete", body)
    .then( response => response.json() )
    .then( data => {
      console.log(data);
      fetchThings();
    })
}