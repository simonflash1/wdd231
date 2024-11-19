const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      let card = document.createElement('section');
      let fullName = document.createElement('h2');
      let portrait = document.createElement('img');
      let dateofbirth = document.createElement('p');
      let placeofbirth = document.createElement('p');
  
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
      dateofbirth.textContent = `Date of birth: ${prophet.birthdate}`;
      placeofbirth.textContent = `Place of birth: ${prophet.birthplace}`;
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      card.appendChild(fullName);
      card.appendChild(dateofbirth);
      card.appendChild(placeofbirth);
      card.appendChild(portrait);
      cards.appendChild(card);
    });
  }


  async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
//  console.table(data.prophets);
    displayProphets(data.prophets);
  }
  
  getProphetData();