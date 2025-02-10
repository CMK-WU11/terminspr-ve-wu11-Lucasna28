export async function serverFetch(url) {
  try {
    console.log(url);

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
