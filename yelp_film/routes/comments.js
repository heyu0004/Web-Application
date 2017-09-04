var express=require("express");
var router=express.Router({mergeParams:true});
var Film=require("../models/film");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get('/new',middleware.IsLoggedIn,function(req,res){
    Film.findById(req.params.id,function(err,film){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render("comments/new",{film:film});
        }
    });
});

router.post('/',middleware.IsLoggedIn,function(req,res){
    Film.findById(req.params.id,function(err,film){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect('/films');
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err)console.log(err);
                else{
                    comment.author.username=req.user.username;
                    comment.author.id=req.user._id;
                    comment.save();
                    film.comments.push(comment);
                    film.save();
                    res.redirect('/films/'+film._id);
                }
            });
        }
    });
});
//EDIT ROUTE
router.get('/:comments_id/edit',middleware.checkcCommentOwnership,function(req,res){
    Comment.findById(req.params.comments_id,function(err,foundComment){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }
        else{
        res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
    
});
//UPDATE ROUTE
router.put('/:comments_id',middleware.checkcCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,data){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/films/"+req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete('/:comments_id',middleware.checkcCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comments_id,function(err){
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }
        else{
            req.flash("success","Comment Deleted");
            res.redirect("/films/"+req.params.id);
        }
    })
});



module.exports=router;