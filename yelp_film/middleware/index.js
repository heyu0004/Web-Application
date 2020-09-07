var middlewareObj={};
var Film=require("../models/film");
var Comment=require("../models/comment");


middlewareObj.checkOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Film.findById(req.params.id,function(err,foundfilm){
        if(err){
            req.flash("error","Film not found");
            console.log(err);
            res.redirect("/films");
        }

        if(foundfilm.author.id.equals(req.user._id)){
            next();
        }
        else{
            req.flash("error","You don't have authorization");
            console.log("You do not have authorization");
            res.redirect("back")
        }
    })
    }else{
        req.flash("error","Please Log in First");
        console.log("You need to be logged in");
        res.redirect("back")
    }
};

middlewareObj.checkcCommentOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id,function(err,foundcomment){
        if(err){
            req.flash("error","Comment not found");
            console.log(err);
            res.redirect("back");
        }

        if(foundcomment.author.id.equals(req.user._id)){
            next();
        }
        else{
            req.flash("error","You don't have authorization");
            console.log("You do not have authorization");
            res.redirect("back")
        }
    })
    }else{
        req.flash("error","Please Log in First");
        console.log("You need to be logged in");
        res.redirect("back")
    }
};

middlewareObj.IsLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Log in First");
    res.redirect("/login");
}


module.exports=middlewareObj;