const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Solly',
      email: 'solly@gmail.com',
      password: 'cheesecake',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '123',
      hash: '',
      email: 'john@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.get('/users', (req, res) => {
  res.status(200).json(db.users);
});

app.post('/login', (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare('bacon', hash, function (err, res) {
  //   // res == true
  // });
  // bcrypt.compare('veggies', hash, function (err, res) {
  //   // res = false
  // });
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json('success').status(200);
  } else {
    res.status(404).json('error logging in');
  }
  res.json('Login');
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, null, null, function (err, hash) {
    const hashedPass = hash;
  });
  db.users.push({
    id: '125',
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.status(200).json(db.users[db.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user).status(200);
    }
  });
  if (!found) {
    res.json('No user found').status(404);
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries).status(200);
    }
  });
  if (!found) {
    res.json('No user found').status(404);
  }
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
