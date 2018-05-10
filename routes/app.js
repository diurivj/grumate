const router      = require('express').Router();
const passport    = require('passport');
const User        = require('../models/User');
const multer      = require('multer');
const uploads     = multer({dest: './public/uploads'});
const nodemailer  = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res, next) => {
  res.render('app');
});

router.get('/grumate', (req, res, next) => {
  res.render('grumateUser');
});

router.get('/social', (req, res, next) => {
  res.send('Aquí tendría que esta la parte social de grumate');
});

module.exports = router;