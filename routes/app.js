const router      = require('express').Router();
const passport    = require('passport');
const User        = require('../models/User');
const multer      = require('multer');
const uploads     = multer({dest: './public/uploads'});
const nodemailer  = require('nodemailer');
require('dotenv').config();

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
    res.redirect('/login');
};

function checkRole(req, res, next){
  if(req.user.role === 'user') return next();
    res.render('grumateDriver')
};

router.get('/', (req, res, next) => {
  res.render('app');
});

router.get('/social', isLoggedIn, (req, res, next) => {
  res.send('Aquí tendría que esta la parte social de grumate');
});

router.get('/grumate', isLoggedIn, checkRole, (req, res, next) => {
  res.render('grumateUser');
});

router.post('/grumate', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {$set: {coordinates: req.body.coords}}, {new:true})
    .then(user => {
      res.status(200);
      res.json(user);
    })
    .catch(e => next(e));
});

module.exports = router;