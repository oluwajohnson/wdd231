// fetchData.js
export async function fetchJSON(path='data/farms.json'){
  try {
    const res = await fetch(path, {cache: "no-store"});
    if(!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchJSON error', err);
    throw err;
  }
}
