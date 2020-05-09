const express = require('express');
const router = express.Router();
const BrewMethods = require('../../brew-methods');

//get all info for all methods
router.get('/', (req, res) => {
  res.json(BrewMethods);
});

router.get('/:method_name', (req, res) => {
  res.json(
    BrewMethods.filter((method) => req.params.method_name === method.slug)
  );
});

module.exports = router;
