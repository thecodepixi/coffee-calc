const router = require('express').Router();
const User = require('../../models/User.model');

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/new', (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  //Hash with bcrypt and authenticate with JWT later
  let password = req.body.password;
  let email = req.body.email;

  let newUser = new User({
    name,
    username,
    password,
    email,
  });

  newUser
    .save()
    .then(() => res.json('User created!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//will check password against bcrypt and send back JWT
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (user) {
        return res.json(`${user.username} logged in (but not really)`);
      } else {
        return res.json('Incorrect username or password. Try Again.');
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
