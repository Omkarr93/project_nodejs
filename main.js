const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer').createObjectCsvWriter; // Correct import


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
  // app.get('www.hotstar.com/in/onboarding/profile?ref=%2Fin');
});

// Redirect to Web Series server
app.get('/webseries', (req, res) => {
  res.redirect('http://localhost:3003');
});

app.get('/webseries', (req, res) => {
  // res.redirect('http://localhost:3003');
});


// code is for create account 14-07-2024
// Serve 'create-account.html' on '/create-account' route
app.get('/create-account', (req, res) => {
  res.sendFile(__dirname + '/public/create-account.html');
});

// Handle POST request to '/register' for account creation
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Create a CSV file if it doesn't exist and append new user info
  const csvWriter = createObjectCsvWriter({
      path: 'users.csv',
      header: [
          { id: 'username', title: 'Username' },
          { id: 'email', title: 'Email' },
          { id: 'password', title: 'Password' } // In practice, NEVER store passwords in plaintext like this example
      ],
      append: true
  });

  const records = [
      { username: username, email: email, password: password }
  ];

  csvWriter.writeRecords(records)
      .then(() => {
          console.log('New user registered and saved to CSV:', username, email);
          res.send('Registration successful!');
      })
      .catch((err) => {
          console.error('Error writing to CSV:', err);
          res.status(500).send('Registration failed. Please try again later.');
      });
});


app.listen(3000, () => {
  console.log('entertainment server is running on http://localhost:3000');
});