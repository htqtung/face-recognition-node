const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();

const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true,
  },
});

app.get('/', (req, res) => {
  res.send('Hello there');
});

// TODOs: validations,

// * req and res is auto-passed to handleLogin - advanced technique
app.post('/login', login.handleLogin(db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(PORT || 3000, () => {
  console.log(`App is running on port ${PORT}`);
});
