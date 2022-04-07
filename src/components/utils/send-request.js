import fetch from 'node-fetch';

export default async function sendRequest(method, path, params = null) {
    const headers = { "Content-Type": "application/json" };
  
    const response = await fetch(
      `${path}`,
      {
        method,
        headers,
        body: params && JSON.stringify({
          ...params
        }),
        credentials: "include"
      }
    );
  
    let json;
    try {
      json = await response.json();
    } catch (error) {
      // Nothing to do here, certain responses won't have json
    }
  
    if (response.status >= 200 && response.status < 300) {
      return json;
    } else {
      const message = json && json.error ? json.error : response.status;
      throw new Error(message);
    }
  }