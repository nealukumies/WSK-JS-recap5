import {getMenu} from './getMenu.js';
import {getRestaurants} from './getRestaurants.js';

async function init() {
  try {
    restaurants = await getRestaurants();
    if (restaurants && Array.isArray(restaurants)) {
      restaurants.sort((a, b) => a.name.localeCompare(b.name));
      renderTable();
    } else {
      console.error('Failed to fetch restaurants or invalid data format.');
      const body = document.querySelector('body');
      const h2 = document.createElement('h2');
      h2.innerHTML =
        'Check connection to restaurant-API. Use VPN outside of Metropolia.';
      body.appendChild(h2);
    }
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

function renderTable() {
  const table = document.querySelector('table');
  const dialog = document.querySelector('dialog');
  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    tr.addEventListener('click', async function () {
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
      const p6 = document.createElement('p');
      p6.setAttribute('class', 'menu-items');
      try {
        const menu = await getMenu(restaurant._id, 'en');

        if (menu.length > 0) {
          const menuTable = document.createElement('table');
          menuTable.innerHTML = `
            <thead>
              <tr>
              <th>Course</th>
              <th>Price</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            `;
          const tbody = menuTable.querySelector('tbody');
          for (const course of menu) {
            const row = document.createElement('tr');
            const coursetd = document.createElement('td');
            coursetd.innerHTML = course.name;
            const pricetd = document.createElement('td');
            pricetd.innerHTML = course.price;
            row.append(coursetd, pricetd);
            tbody.appendChild(row);
          }
          p6.appendChild(menuTable);
        } else {
          p6.innerHTML = 'No menu available today.';
        }
      } catch (error) {
        p6.innerHTML = 'Error fetching menu.';
      }

      const closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'close-btn');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', () => {
        dialog.close();
      });

      dialog.append(h3, p, p2, p3, p4, p5, p6, closeButton);
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
