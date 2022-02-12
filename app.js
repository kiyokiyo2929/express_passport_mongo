var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
const worksRouter = require('./routes/works')
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const session = require("express-session");
const passport = require("passport");
const User = require('./models/user');
const LocalStrategy = require("passport-local").Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true
}));



require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI;

mongoose.connect( dbUrl, ()=>{
  console.log('sucessfully connected to MongoDB.')
})

// mongoose.Promise = Promise;
// mongoose
//   .connect(dbUrl, {useMongoClient:true})
//   .then(()=>{
//     console.log("Connected to Mongo!")
//   })
//   .catch(err=>{
//     console.error("Error", err)
//   });

passport.serializeUser((user, cb)=>{
  cb(null, user._id)
})

passport.deserializeUser((id, cb)=>{
  User.findById(id, (err, user)=>{
    if(err){return cb(err);}
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next)=>{
  User.findOne({username}, (err, user)=>{
    if(err){
      return next(err);
    }
    if(!user){
      return next(null, false, {message:"Incorrect username"});
    }
    if(!bcrypt.compareSync(password, user.password)){
      return next(null, false, {message:"Incorrect password"});
    }
    return next(null, user);
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/works', worksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
