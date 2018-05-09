const router      = require('express').Router();
const passport    = require('passport');
const User        = require('../models/User');
const multer      = require('multer');
const uploads     = multer({dest: './public/uploads'});
const nodemailer  = require('nodemailer');
require('dotenv').config();

router.get('/signup', (req, res, next) => {
  if(req.query.role ===  'user') {
    res.render('auth/signup', {r: req.query.role});
    return;
  } else if (req.query.role === 'driver') {
    res.render('auth/signup', {r: req.query.role});
  }
    res.render('signup')
});

router.post('/signup', (req,res) => {
  User.register(req.body, req.body.password, function(err, user) {
    if (err) return res.send(err);
      const authenticate = User.authenticate();
      authenticate(req.body.email, req.body.password, function(err, result) {
      if (err) return res.send(err);
        return res.redirect(`/user/confirm/${user.id}`);
      });
    const tp = nodemailer.createTransport({
      service: 'Gmail',
      auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    tp.sendMail({
      from: '"Grumate" <grumate@support.com>',
      to: user.email,
      subject: 'Confirm your account ' + user.name + ' ' + user.lastName,
      text: 'Confirm email',
      html: `<a href="http://localhost:3000/user/confirmed/${user.id}">Confirm your email here</a>`
    });
  });
});

router.get('/user/confirm/:id', (req, res) => {
  res.render('auth/confirm');
});

router.get('/user/confirmed/:id', (req, res) => {
  User.findOneAndUpdate({id: req.params._id}, {$set:{status: 'Active'}}, {returnNewDocument: true})
  .then(r => {
    res.render('auth/confirmed');
  })
  .catch(e => next(e));
});

router.get('/login', isAuthenticated, (req,res) => {
  res.render('auth/login', {error:req.body.error});
});

router.post('/login', checkStatus, passport.authenticate('local'), (req,res) => {
  res.redirect('/profile');
}); 

router.get('/profile', isNotAuth, (req, res, next) => {
  req.app.locals.user = req.user;
  User.findById(req.user._id)
  .then(user => {
    if (user.profilePic === 'No Photo') res.redirect(`/profile/incomplete/${user._id}`);
      res.render('profile');
  })
  .catch(e => next(e));
});

router.get('/profile/incomplete/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.render('incomplete', {user});
  })
  .catch(e => next(e));
});

router.post('/profile/incomplete/:id', uploads.single('profilePic'), (req, res, next) => {
  req.body.profilePic = '/uploads/' + req.file.filename;
  const address = {
    coord: [],
    street: req.body.street,
    number: req.body.number,
    city: req.body.city,
    state: req.body.state,
    cp: req.body.cp
  };
  const car = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    año: req.body.año,
    placas: req.body.placas  
  };
  User.findOneAndUpdate({email: req.body.email}, {$set: {address: address, profilePic: req.body.profilePic, car: car}})
  .then(() => {
    console.log("Actualizado");
    res.redirect('/profile');
  })
  .catch(e => next(e));
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

function isAuthenticated (req, res, next){
  if(req.isAuthenticated()) return res.redirect('/profile')
    return next();
};

function isNotAuth (req, res, next) {
  if(req.isAuthenticated()) return next();
    return res.redirect('/login');
};

function checkStatus (req, res, next) {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user.status === "Active") return next();
      res.render('auth/z')
  })
  .catch(e => next(e));
};

module.exports = router;




















  
  







