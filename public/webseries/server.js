const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'webseries.html'));
});

app.get('/status', (req, res) => {
  res.json({ status: 'running' }); // This endpoint can be used to check if the server is running
});

app.listen(3003, () => {
  console.log('webseries server is running on http://localhost:3003');
});
