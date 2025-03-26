import {fetchData} from './fetchData.js';

async function init() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid URL');
    } else {
      console.error('An error occurred:', error);
    }
  }
}

init();
