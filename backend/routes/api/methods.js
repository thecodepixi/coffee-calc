const router = require('express').Router();
let BrewMethod = require('../../models/BrewMethod.model');

//get all info for all methods
router.get('/', (req, res) => {
  BrewMethod.find()
    .then((brewMethods) => res.json(brewMethods))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  BrewMethod.findById(req.params.id)
    .then((brewMethod) => res.json(brewMethod))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/new', (req, res) => {
  const name = req.body.name;
  const ratio = Number(req.body.ratio);
  const guide = req.body.guide;
  const tips = req.body.tips;

  const newBrewMethod = new BrewMethod({
    name,
    ratio,
    guide,
    tips,
  });

  newBrewMethod
    .save()
    .then(() => res.json('New Brew Method added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
