const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/iniciarSesion');
  };
  
  module.exports = { ensureAuthenticated };
  