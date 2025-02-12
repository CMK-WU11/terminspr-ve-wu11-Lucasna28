export async function serverFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Fejl ${response.status}: ${response.statusText}`);
    }

    //Hvis det er et DELETE requist, retuner true ved succes
    if (options.method === "DELETE") {
      return response.ok;
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Fetch fejl: ${error.message}`);
  }
}
