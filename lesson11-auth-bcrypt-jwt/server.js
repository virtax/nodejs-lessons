const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const pass1hash = bcrypt.hashSync('pass1', 10);
const users = [
  { id: 1, username: 'user1', passwordHash: pass1hash } // Хешований пароль like '$2b$10$E/examplehashedpassword'
];

const SECRET_KEY = 'your-secret-key'; // для підпису токена


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);2

  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    console.log('user.passwordHash', user.passwordHash);
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  }); // Генерація токена
  res.json({ token });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user) {
    return res.status(409).send('User already exists');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });

  res.status(201).send('User registered');
});

// Middleware для перевірки токена
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Захищений маршрут
app.get('/profile', authenticateToken, (req, res) => {
  res.send(`User ${req.user.username}`);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
