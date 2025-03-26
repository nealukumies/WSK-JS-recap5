export async function fetchData(URL, options) {
  const response = await fetch(URL, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status} for URL: ${URL}`);
  }
  const json = await response.json();
  return json;
}
