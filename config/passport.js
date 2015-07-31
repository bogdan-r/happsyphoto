var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, next){
  next(null, user.id);
});

passport.deserializeUser(function(id, next){
  User.findOne(id).exec(function(err, user){
    next(err, user);
  })
});
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, next) {
  User.findOne()
    .where({username : username})
    .exec(function (err, user) {
      if (err) {return next(err)}
      if (!user || user.length > 1) {
        return next(null, false,  {message : 'Неверный пароль или имя пользователя'});
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (!res) {
          return next(null, false, {message :'Неверный пароль или имя пользователя'});
        }
        return next(null, user);
      });
    });
}));