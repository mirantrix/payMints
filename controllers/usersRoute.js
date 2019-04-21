const express = require('express');
const usersRoute = express.Router();
const Item = require('../models/itemSchema');
const orderItems = require('../middlewares/orderItems');
const logoutUser = require('../middlewares/logoutUser');
const dateData = require('../middlewares/dateData');

usersRoute.route('/')
  .get((req, res) => {
    Item.find({ owner: res.locals.user._id})
      .then(user => {
        const { thisMonth, nextMonth } = dateData();
        const { passComming, upComming } = orderItems(user);

        res.render('users/index', {
          owner: res.locals.user,
          up: upComming,
          pass: passComming,
          month: 'Next Month:',
          actualMonth: thisMonth,
          nextMonth: nextMonth,
          nextUp: Number(upComming.concat(passComming)[0].date),
          imagesEndpoint: 'http://mirantrix.com/wiiipay/images/'
        });
        return;
      }).catch(err => {
        console.log(err);
    });
  });

usersRoute.route('/create')
  .get((req, res) => {
    res.render('users/create');
    return;
  })
  .post((req, res) => {
    const item = new Item({
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      acronym: req.body.acronym.toUpperCase(),
      owner: res.locals.user._id
    });
    item.save().then(() => {
      res.redirect('/');
      return;
    });
  });

// check route conflict with :id
usersRoute.route('/logout')
  .get((req, res) => {
    logoutUser(req, res);
    res.redirect('/login');
    return;
  });

usersRoute.route('/:id')
  .get((req, res) => {
    Item.findById({ _id: req.params.id }, function(err, item){
      if(item === null){
        res.redirect('/');
        return;
      }
  		res.render('users/edit', { item: item });
      return;
  	});
  })
  .delete((req, res) => {
    Item.findOneAndDelete({ _id: req.params.id })
      .then(items => {
        res.redirect('/');
        return;
      }).catch(err => {
        console.log(err);
    });
  })
  .put((req, res) => {
    Item.findById({ _id: req.params.id })
      .then(item => {
        item.name = req.body.name;
        item.amount = req.body.amount;
        item.date = req.body.date;
        item.acronym = req.body.acronym.toUpperCase();
        item.save()
        .then(item => {
          res.redirect('/');
          return;
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

module.exports = usersRoute;
