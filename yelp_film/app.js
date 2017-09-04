var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    seedsDB=require("./seeds"),
    passport=require("passport"),
    methodOverride=require("method-override"),
    localStrategy=require("passport-local"),
    flash=require("connect-flash"),
    Film=require("./models/film"),
    Comment=require("./models/comment"),
    User=require("./models/user");
    
var commentRoutes=require('./routes/comments'),
    filmRoutes=require('./routes/films'),
    indexRoutes=require('./routes/index')
    
var url=process.env.DATABASEURL||"mongodb://localhost/yelp_film"
// seedsDB();
mongoose.Promise = require('bluebird');
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(flash());
//PASSPORT CONFIHUREATION
app.use(require("express-session")({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
app.use(methodOverride("_method"));
app.use('/',indexRoutes);
app.use('/films',filmRoutes);
app.use('/films/:id/comments',commentRoutes);




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started");
});