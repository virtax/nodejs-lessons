const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pass1hash = bcrypt.hashSync('pass1', 10);
const users = [
  { id: 1, username: 'user1', passwordHash: pass1hash } // Хешований пароль like '$2b$10$E/examplehashedpassword'
];

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    console.log('user.passwordHash', user.passwordHash);
    return res.status(400).send('Invalid credentials');
  }

  res.send('Authentication successful');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user) {
    return res.status(400).send('User already exists');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });

  res.status(201).send('User registered');
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));

