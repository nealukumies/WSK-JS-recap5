export async function getRestaurants() {
  console.log('asynchronous download begins');
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.log('Failed to get restaurants: ' + error.message);
  } finally {
    console.log('asynchronous load complete');
  }
}
