import { Handler } from "@netlify/functions";

const apiKey = process.env.WOR_DEM_API_KEY;

export const handler: Handler = async (event) => {

  const locID = event.queryStringParameters?.locID;
  let url = 'https://world-demographics.p.rapidapi.com/';

  if (locID) url = url + 'countries/' + locID;
  else url = url + 'world';

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing API key' }),
    };
  };

  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'world-demographics.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'External API request failed' }),
      };
    };

    const data = await response.json();

    return {
      statusCode:200,
      body: JSON.stringify(data),
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };

  };

};
