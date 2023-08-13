const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


const validCredentials = {
  username: 'a',
  password: 'a'
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','login.html'));
});

app.use(express.static('public'));

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;

  if (username === validCredentials.username && password === validCredentials.password) {
    res.redirect('/entertainment');
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

app.get('/entertainment', (req, res) => {
  // console.log('index')
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Redirect to Movies server
app.get('/movies', (req, res) => {
  res.redirect('http://localhost:3001');
});

// Redirect to Live Shows server
app.get('/liveshows', (req, res) => {
  res.redirect('http://localhost:3002');
});

// Redirect to Web Series server
app.get('/webseries', (req, res) => {
  res.redirect('http://localhost:3003');
});



app.listen(3000, () => {
  console.log('entertainment server is running on http://localhost:3000');
});