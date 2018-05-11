const router      = require('express').Router();
const passport    = require('passport');
const User        = require('../models/User');
const multer      = require('multer');
const uploads     = multer({dest: './public/uploads'});
const nodemailer  = require('nodemailer');
const hbs = require('hbs');


hbs.registerHelper('json', (content)=>{
  return JSON.stringify(content);
})


require('dotenv').config();



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
    res.redirect('/login');
};

function checkRole(req, res, next){
  if(req.user.role === 'user') return next();
    res.redirect('grumate/driver')
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

router.get('/grumate/driver', (req, res, next) => {
  User.findOne({role: 'user'})
  .then(user => {
    console.log(typeof user);
    //JSON.parse(user);
    res.render('grumateDriver', {user});
  })
  .catch(e => next(e));

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