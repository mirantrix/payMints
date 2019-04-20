const express = require('express');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const os = require('os');
const methodOverride = require('method-override');
const path = require("path");
const dotenv = require('dotenv').config();
const usersRoute = require('./controllers/usersRoute');
const sessionUser = require('./middlewares/sessionUser');
const session = require('express-session');
const User = require('./models/userSchema');


const app = express();
const port = process.env.PORT || process.env.PORT_LOCAL;

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
  .then(db => console.log(`Mongo DB: 200 ok`))
  .catch(err => console.log(`ERROR: ${err}`));

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

var sessionMiddleware = session({
	secret: String(process.env.SESSION_SECRET),
	resave: false,
	saveUninitialized: false
})

app.use(sessionMiddleware);
app.use(formData.parse(options));
app.use(formData.union());
app.use(methodOverride('_method'));

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => {
  User.find({})
    .then(users => {
      res.redirect('/users');
      return;
    }).catch(err => {
      console.log(err);
  });
});

app.get('/login', (req, res) => {
  if(req.session.user_id === null || req.session.user_id === undefined ){
    req.session.user_id = null;
    res.render('login');
    return;
  } else {
      res.redirect('/users');
      return;
  }
});

app.post('/sessions', (req, res) => {
  User.findOne({ userName: req.body.userName, password: req.body.password}, function(err, user){
    if(user === null || user === undefined ){
      res.redirect('/login');
      return;
    }
    req.session.user_id = user._id;
    res.redirect('/users');
    return;
	});
});

// sessions back dektop
app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use('/users', sessionUser);
app.use('/users', usersRoute);

app.listen(port);
