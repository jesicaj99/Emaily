const passport = require('passport');

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
  // app.get('/auth/google/callback', passport.authenticate('google')) ;
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  })
  
  app.get('/api/current_user', (req, res) => {
    // passport pulls user id out of the data
    // res.send(req.session); // {"passport":{"user":"646f7fbd610273428c3b0768"}}
    
    res.send(req.user);
  });

}
