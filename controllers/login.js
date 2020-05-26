const handleLogin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Invalid registration');
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isvValid = bcrypt.compareSync(password, data[0].hash);
      if (isvValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            res.status(200).json(user[0]);
          })
          .catch((err) => res.status(404).json('User not found'));
      } else res.status(400).json('Incorrect username or password');
    })
    .catch((err) => res.status(400).json('Login error'));
};

module.exports = {
  handleLogin,
};
