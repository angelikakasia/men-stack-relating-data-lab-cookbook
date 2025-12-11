const isSignedIn = (req, res, next) => {
  // If a user session exists, continue to the next middleware or route
  if (req.session.user) return next();
  
  // If not signed in, redirect to the sign-in page
  res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;
