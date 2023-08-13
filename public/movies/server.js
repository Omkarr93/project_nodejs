const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  // Serve the movies.html file
  res.sendFile(path.join(__dirname, 'movies.html'));
});

app.get('/status', (req, res) => {
  res.json({ status: 'running' }); // This endpoint can be used to check if the server is running
});

app.listen(3001, () => {
  console.log('Movies server is running on http://localhost:3001');
});

