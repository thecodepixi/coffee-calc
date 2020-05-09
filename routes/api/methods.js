const express = require('express');
const router = express.Router();
const BrewMethods = require('../../brew-methods');

//get all info for all methods
router.get('/', (req, res) => {
  res.json(BrewMethods);
});

module.exports = router;
