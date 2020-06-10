const router = require('express').Router();
const User = require('../../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id/brews', (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user.brews))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/:id/brews', (req, res) => {
  let newBrew = {
    coffee: {
      name: req.body.coffee.name,
      company: req.body.coffee.company,
      roast: req.body.coffee.roast,
    },
    method_used: req.body.method_used,
    ratio: req.body.ratio,
    rating: Number(req.body.rating),
    liked: Boolean(req.body.liked),
  };

  User.findById(req.params.id)
    .then((user) => {
      user.brews.push(newBrew);
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.error(err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  //initialize password to empty string
  let password = bcrypt.hashSync(req.body.password, saltRounds);
  let email = req.body.email;

  console.log('Password: ', password);

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
  if (!req.body.password || !req.body.username) {
    res.status(400).json('Please provide both a username and password.');
    return;
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.json(`${user.username} logged in`);
          return;
        }
      } else {
        res.status(400).json('Incorrect username or password. Try Again.');
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
