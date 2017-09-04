#Yelpcamp init
*Add loading page
*Add campgrounds page that lists all campgrounds

Each campground has:
*Image
*Name

Attention:
* <img src="<%=campground.image%>">

#Layout and basic Styling
*Create header and footer partials
*Add in Bootstrap

Attention:
* <%include partials/footer%>

#Add new campground
*Set up new campground POST rounte
*Add url body-parser
*Set up route to show form
*Add basic unstyled form

Attention:
* app.use(bodyParser.urlencoded({extended:true}));
* <form action="/campgrounds" method="POST">

#Style the campground page
*Add a better header/footer
*Make the campground display in a grid 

Attention:
* <div class="col-md-3 col-sm-6">--!being responsive!

#Style the Navbar and Form
*Add Navbar to all templates
*Style the new campground form 

#Add Mongoose Database
*Install and confugure mongoose
*Setup capmpground model
*Use campground model inside of our routes

Attention:
* res.render("view",{bindedData});
* res.redirect("route");
* mongoose.connect("mongodb://localhost/<database_name>");

#Show Page
*RESTful routes
-Index route    /campgrounds       GET    show a list of campgrounds
-New route      /campgrounds/new   GET    show form to create a new campground
-Create route   /campgrounds       POST   create a new campground
-Show           /campgrounds/:id   GET    show detailed info of a specific campground


*Add description to campground
*db.collection.drop()
*Add a show route/template

#Refactor Mongoose Code
*create a models directory
*use module.exports
*require everything correctly

Attention:
* module.exports=mongoose.model('Campground',campgroundSchema)---models/campground.js
* Campground=require("./models/campground")---app.js

#Add the Comment Model
*Display comments on campground show page

Attention:
* Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){...})
    -- to associate data from different collection into one object

#Create Comment
*Nested routes
*Add comments and create routes
*Add new comment form
*RESTful routes
Since we are adding comments to campgrounds
-New route      /campgrounds/:id/comments/new   GET     show form to create a new comment associated with a campground
-Create route   /campgrounds/:id/comments       POST    create a new comment associated with a campground


#Add Authentication to yelpcamp
*Install packages
-passport 
-passport-local 
-passport-local-mongoose
-express-session
*Define User model
*Add Register routes/templates
*Add Login routes/templates
*Show/hide navbar associate with user's state

Attention:
* passport.serializeUser(User.serializeUser());
* passport.deserializeUser(User.deserializeUser());


#Refactoring Routes
*use express route to refactor

Attention:
* var router=express.Router({mergeParams:true});--after refactor ,get campground/:id info inside comment router

#Associate database
*Associate User and Comment
*Associate User and Campground

#Authorization
*Update/Delete campground
*Edit and Delete Comments
*Refactor middleware

Attention:
* app.use(methodOverride("_method"));
-- there is not put and delete form, so we just override the method post to be put and delete
* app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
* req.user._id is a String and campground.author.id is Object
-- just check foundcampground.author.id.equals(req.user._id)   instaed

#Add in Flash
*Install and confugure connect-flash
*Add bootstrap alert to header

Attention:
* app.use(flash()); 
-- this has to be show before authentication configuaration
* req.flash("error","Please Log in First");  
-- shows on next ignite

#Animation and price feature

#Git and Github
*git init --> tell git to track docs inside the directory (recursively)
--> create ./git for you
// ls||ls -a //
*git status
*git add
*git commit
*git log
*git checkout

#Deploy
*public mongoose mongoose.connect("mongodb://admin:password@ds155961.mlab.com:55961/yelpcamp"); 
--run mongodb on mongo server instead of heroku server!!!
*https://boiling-scrubland-42749.herokuapp.com/ | https://git.heroku.com/boiling-scrubland-42749.git
*set environment variable(database url) [for testing purpose ,deveoper shouldn't be able to delete users' data]
--export DATABASEURL=mongodb://localhost/yelp_camp
--set config parameters in Heroku as well DATABASEURL=mongodb://admin:password@ds155961.mlab.com:55961/yelpcamp

