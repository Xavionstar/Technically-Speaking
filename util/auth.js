//this middleware challenges the session id of the user, if they are not logged in any where it is applied it will send them back to the login page
const withAuth = (req, res, next) => {
  
  if (!req.session.logged_in) {
    res.redirect('/loginpage');
  } else {
    next();
  }
};

module.exports = withAuth;
