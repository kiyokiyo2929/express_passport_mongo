var express = require('express');
const res = require('express/lib/response');
const { route } = require('.');
var router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login")

const app = express();

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

const Work = require('../models/work');
const User = require('../models/user')

require('dotenv').config();


/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('admin/users');
});

router.post("/upload", (req, res, next)=>{
    const {work, type} = req.body;
    const newWork = new Work({work, type})
    newWork.save()
    .then(()=>{
      res.redirect("/works")
    })
    .catch(error=>{
      console.log(error)
    })    
})

router.get("/edit_and_deleate", (req, res, next)=>{
  Work.find()
  .then(Data => {
    res.render("admin/list", {data:Data, user:req.user})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/delete/:id", (req, res, next)=>{
  
  Work.findByIdAndRemove({"_id":req.params.id})
  .then(()=>{
    res.redirect("/admin/edit_and_deleate")
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/edit/:id", (req, res, next)=>{
  Work.findById(req.params.id)
  .then(Data=>{
    res.render("admin/edit", {data:Data, user:req.user})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post("/edit/:id", (req, res, next)=>{
  const {work, type} = req.body;
  Work.update({_id:req.params.id}, {$set:{work:work, type:type}})
  .then(()=>{
    res.redirect("/admin/edit_and_deleate")
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/signup", (req, res, next)=>{
  res.render("admin/signup");
});


router.post("/signup", (req, res, next)=>{
  const {username, password} = req.body;

  if(username === "" || password === ""){
  res.render("admin/signup", {message: "Indicate username and password"});
  return;
  }

  User.findOne({username})
  .then(user=>{
    if(user !== null){
      res.render("admin/signup", {message:"The username already exists"});
      return;
    }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password:hashPass
  });

  newUser.save((err)=>{
      if(err){
        res.render("admin/signup", {message:"Something went wrong"});
      } else {
        res.redirect("/admin")
      }
    })
  })
  .catch(err=>{
  console.log(err)
  })
});

router.get("/login", (req, res, next)=>{
  res.render("admin/login");
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/admin/administrator-page",
  failureRedirect: "/admin/login",
  // failureFlash: true,
  passReqToCallback: true
}))

router.get("/administrator-page", ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render("admin/administrator", {user:req.user})
})

router.get("/logout", (req, res)=>{
  req.logOut();
  res.redirect("/admin")
})

module.exports = router;
