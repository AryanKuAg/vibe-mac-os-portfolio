const https = require('https');

const API_KEY = '82cb0cac313a8fb423e48f9af95da439446060ae77849615bf61c68ad163d5f6';
const API_URL = 'https://api.macosicons.com/api/search';

// Function to make the API request
function searchIcons(query) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      query: query
    });

    console.log('Making API request to:', API_URL);
    console.log('With request body:', requestBody);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(API_URL, options, (res) => {
      console.log('Status Code:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers));

      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('Response received');
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (error) {
            console.error('Error parsing JSON response:', error);
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.write(requestBody);
    req.end();
  });
}

// Execute the search
async function main() {
  try {
    const result = await searchIcons('finder');
    console.log('Search results:', JSON.stringify(result, null, 2));
    
    if (result.hits && result.hits.length > 0) {
      console.log('First icon:', result.hits[0]);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
