const User = require('../models/userSchema');


const sessionUser = (req, res, next) => {

  if(req.session.user_id === null || req.session.user_id === undefined){
		res.redirect('/login');
    return;
	}

	User.findById(req.session.user_id, function(err, user){
		if( err || user === null){
			console.log(err);
			res.redirect('/login');
      return;
		} else {
			res.locals = { user : user };
			next();
      return;
		}
	});
}

module.exports = sessionUser;
