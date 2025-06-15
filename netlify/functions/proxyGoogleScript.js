export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxafhAdk4a11vsTmZI4duf82yuBsTi25ZrJSv_0KyqNRAMPqJUekNur5arcWjkI8_Clgw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or restrict to your domain
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
