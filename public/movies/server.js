const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Handle Movies server logic here
  res.send('Movies server is running');
});

app.get('/status', (req, res) => {
  res.json({ status: 'running' }); // This endpoint can be used to check if the server is running
});

app.listen(3001, () => {
  console.log('Movies server is running on http://localhost:3001');
});
