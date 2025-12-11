const passUserToView = (req, res, next) => {
  // Make the session user available to all EJS templates
  res.locals.user = req.session.user ? req.session.user : null;

  // Continue to next middleware or route
  next();
};

module.exports = passUserToView;
