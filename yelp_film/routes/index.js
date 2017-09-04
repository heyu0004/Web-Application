var express=require("express");
var router=express.Router();
var  User=require("../models/user");
var  passport=require("passport");


router.get('/',function(req,res){
    res.render("landing");
});
router.get('/register',function(req,res){
    res.render("register");
});

router.post('/register',function(req,res){
    var newuser=new User({username:req.body.username});
    User.register(newuser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            return res.render("register");
        }
        else{
        passport.authenticate('local')(req,res,function(){
            req.flash("success","You are logged in");
            res.redirect('/films');
        });
        }
    });
});

router.get('/login',function(req,res){
    res.render("login");
});

router.post('/login',passport.authenticate("local",
    {
    successRedirect:"/films",
    failureRedirect:"/login"
    }),function(req,res){
        
    });

router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","You are logged out");
    res.redirect("/films");
});

// router.get('*',function(req,res){
//     res.send("404 Not Found");
// });


module.exports=router;