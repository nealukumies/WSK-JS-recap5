async function getFunction() {
  console.log('asynchronous download begins');
  try {
    const response = await fetch('https://reqres.in/api/unknown/23');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.log('GET error: ' + error.message);
  } finally {
    console.log('asynchronous load complete');
  }
}

async function postFunction() {
  const data = {
    body: JSON.stringify({
      first_name: 'Jane',
      last_name: 'Sunny',
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const response = await fetch('https://reqres.in/unknown/23', data);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    console.log('result', json);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log('Network error or invalid URL:', e.message);
    } else {
      console.log('POST error: ', e);
    }
  }
}

async function deleteFunction() {
  const data = {
    body: JSON.stringify({
      first_name: 'Jane',
      last_name: 'Sunny',
    }),
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const response = await fetch('https://reqres.in/unknown/23', data);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    console.log('result', json);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log('Network error or invalid URL:', e.message);
    } else {
      console.log('DELETE error: ', e);
    }
  }
}

getFunction();
postFunction();
deleteFunction();
