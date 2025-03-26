export async function getMenu(id, lang) {
  console.log('asynchronous download begins');
  try {
    const response = await fetch(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/${lang}`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.courses;
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('asynchronous load complete');
  }
}
