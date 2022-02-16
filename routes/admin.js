var express = require('express');
const res = require('express/lib/response');
const { route } = require('.');
var router = express.Router();
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login");
const paginate = require("express-paginate");


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
  res.render('admin/users', {user:req.user});
});

router.post("/upload", (req, res, next)=>{
    const {name, link, technologies, repositories, useReact,useNext, useNode, useMongo, image_1, image_2, image_3 } = req.body;

    const newWork = new Work({
    name, link, technologies, repositories, useReact,useNext, useNode, useMongo, image_1, image_2, image_3
    })
    newWork.save()
    .then(()=>{
      res.redirect("/works")
    })
    .catch(error=>{
      console.log(error)
    })    
})

router.get("/edit_and_deleate", ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    const options = {
    lean: true,
    limit:req.query.limit,
    page:req.query.page
    }

    Work.paginate({}, options, (err, result)=>{
        let next;
        let previous;
        let next_number;
        let previous_number; 
        let start_number = 1;
        let end_number = 6;

        (result.page < result.pages)? next = true: next = false;
        (result.page == 1)? previous = false: previous = true;
      
        next_number = (result.page)+1;
        previous_number = (result.page)-1;

        start_number = (((result.page) -1) * 6 ) + 1;
        end_number = (result.page) * 6;
        (end_number > result.total)? end_number = result.total:'';
      
        res.render('admin/list', {data:result.docs, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, total:result.total});
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

router.get("/edit/:id", ensureLogin.ensureLoggedIn(), (req, res, next)=>{
  Work.findById(req.params.id)
  .then(Data=>{
    res.render("admin/edit", {data:Data, user:req.user})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post("/edit/:id",  (req, res, next)=>{
  const {name, link, technologies, repositories, useReact,useNext, useNode, useMongo, image_1, image_2, image_3 } = req.body;

  Work.update({_id:req.params.id}, {$set:{name:name, link:link, technologies:technologies, repositories:repositories, useReact:useReact, useNext:useNext, useNode:useNode, useMongo:useMongo, image_1:image_1, image_2:image_2, image_3:image_3  }})
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
