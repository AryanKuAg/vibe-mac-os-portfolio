const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3005;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Proxy endpoint for macOSicons.com API
app.post('/api/search', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    const API_KEY = '82cb0cac313a8fb423e48f9af95da439446060ae77849615bf61c68ad163d5f6';
    const API_URL = 'https://api.macosicons.com/api/search';
    
    // Forward the request to the actual API
    const response = await axios.post(API_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        // Add browser-like headers to avoid Cloudflare protection
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://macosicons.com',
        'Referer': 'https://macosicons.com/'
      }
    });
    
    console.log('API response status:', response.status);
    console.log('API response data:', response.data);
    
    // Return the API response
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error.message);
    
    // Log detailed error information
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      console.error('Error response data:', error.response.data);
    }
    
    res.status(500).json({
      error: 'Failed to proxy request',
      message: error.message,
      details: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : null
    });
  }
});

// Serve the test HTML page
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`API proxy server running at http://localhost:${port}`);
});
