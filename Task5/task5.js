import {getRestaurants} from './getRestaurants.js';

async function init() {
  restaurants = await getRestaurants();
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  renderTable();
}

function renderTable() {
  const table = document.querySelector('table');
  const dialog = document.querySelector('dialog');
  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    tr.addEventListener('click', function () {
      tr.classList.add('highlight');
      dialog.innerHTML = '';
      dialog.showModal();
      const h3 = document.createElement('h3');
      h3.innerHTML = restaurant.name;
      const p = document.createElement('p');
      p.innerHTML = restaurant.address;
      const p2 = document.createElement('p');
      p2.innerHTML = restaurant.postalCode;
      const p3 = document.createElement('p');
      p3.innerHTML = restaurant.city;
      const p4 = document.createElement('p');
      p4.innerHTML = restaurant.phone;
      const p5 = document.createElement('p');
      p5.innerHTML = restaurant.company;
      const closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'close-btn');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', () => {
        dialog.close();
      });
      dialog.append(h3, p, p2, p3, p4, p5, closeButton);
    });

    dialog.addEventListener('close', () => {
      for (const elem of document.querySelectorAll('.highlight')) {
        elem.classList.remove('highlight');
      }
    });

    const nametd = document.createElement('td');
    tr.appendChild(nametd);
    nametd.innerHTML = restaurant.name;
    const addresstd = document.createElement('td');
    addresstd.innerHTML = restaurant.address;
    tr.appendChild(addresstd);

    const citytd = document.createElement('td');
    citytd.innerHTML = restaurant.city;
    tr.appendChild(citytd);
    table.appendChild(tr);
  }
}

let restaurants;
init();
