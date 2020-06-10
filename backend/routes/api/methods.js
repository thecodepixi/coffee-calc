const express = require('express');
const router = express.Router();

//get all info for all methods
router.get('/', (req, res) => {
  res.json(BrewMethods);
});

router.get('/:method_name', (req, res) => {
  let method = BrewMethods.some(
    (method) => method.slug === req.params.method_name
  );
  if (method) {
    res.json(
      BrewMethods.filter((method) => req.params.method_name === method.slug)
    );
  } else {
    res.json({
      msg: `Sorry a brewing method with the name "${req.params.method_name
        .split('-')
        .join(' ')}" could not be found.`,
    });
  }
});

router.put('/:method_name', (req, res) => {
  let method = BrewMethods.some(
    (method) => method.slug === req.params.method_name
  );

  if (method) {
    //filter the method to be updated
    let methodToUpdate = BrewMethods.filter(
      (method) => method.slug === req.params.method_name
    )[0];

    //update method with new info
    methodToUpdate.name = req.body.method.name
      ? req.body.method.name
      : methodToUpdate.name;
    methodToUpdate.ratio = req.body.method.ratio
      ? req.body.method.ratio
      : methodToUpdate.ratio;
    methodToUpdate.guide = req.body.method.guide
      ? req.body.method.guide
      : methodToUpdate.guide;
    //check for added tips and add them to the array
    req.body.method.tips
      ? (methodToUpdate.tips = methodToUpdate.tips.concat(req.body.method.tips))
      : null;

    res.json(
      BrewMethods.filter((method) => method.slug === req.params.method_name)
    );
  } else {
    res.json({
      msg: `Sorry a brewing method with the name ${req.params.method_name
        .split('-')
        .join(' ')} could not be found.`,
    });
  }
});

module.exports = router;
