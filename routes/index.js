const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/subappi', (req, res, next) => {
  res.redirect('http://subappi.herokuapp.com')
});
module.exports = router;


