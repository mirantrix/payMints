
const logoutUser = (req, res, next) => {
  res.locals = null;
  req.session.user_id = null;
  return;
}

module.exports = logoutUser;
