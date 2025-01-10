const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();
app.use(bodyParser.json());

app.use(
  // session({
  //     secret: 'you secret key',
  //     saveUninitialized: true,
  //     resave: true,
  // })
  session({
    store: new SQLiteStore,
    db: 'sessions.db3',
    secret: 'you secret key',
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    saveUninitialized: true,
    resave: true,
  })
);

const pass1hash = bcrypt.hashSync('pass1', 10);
const users = [
  { id: 1, username: 'user1', passwordHash: pass1hash } // Хешований пароль like '$2b$10$E/examplehashedpassword'
];

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);2

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    console.log('user.passwordHash', user.passwordHash);
    return res.status(400).send('Invalid credentials');
  }
  req.session.username = user.username;

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


app.get('/profile', (req, res) => {
  if (!req.session.username) {
    return res.status(403).send('Access denied, please login at /login');
  } else {
    res.send(`User: ${req.session.username}`);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

