var express=require("express");
var router=express.Router();
var  Film=require("../models/film");
var middleware=require("../middleware");
var request=require('request');

//INDEX PAGE
router.get('/',function(req,res){
    Film.find({},function(err,allFilms){
        if(err){
            console.log(err);
        }
        else {
            
            res.render("films/index",{films:allFilms});
        }
    });
    
});

//CREATE PAGE
router.post('/',middleware.IsLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var year=req.body.year;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    //console.log(req);
    var newfilm={name:name,image:image,description:description,author:author,year:year,comments:[]};
    Film.create(newfilm,function(err,newfilm){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/films");
        }
    });
});

//SEARCH PAGE
router.post('/search',middleware.IsLoggedIn,function(req,res){
    var searchtitle=req.body.title;
    var url="http://www.omdbapi.com/?s="+searchtitle+"&plot=full&apikey=thewdb";
    //console.log(url);
    request(url,function(err,response,body){
        //console.log(body);
        if(!err&&response.statusCode==200){
            body=JSON.parse(body);
            if(body.Response=='True'){
            var list=body['Search'];
            list.sort(function(a, b) {
                    return parseFloat(b.Year) - parseFloat(a.Year);
            });
            res.render('films/select',{film:list});
            }else{
            res.render('films/new',{film:body});
            }
        }else{
            var resfilm;
            resfilm.Response='False';
            res.render('films/new',{film:resfilm});
        }
    });
});

//NEW PAGE
router.get('/new',middleware.IsLoggedIn,function(req,res){
    Film.findById(req.params.id,function(err,film){
        if(err)console.log(err);
        else{
            //console.log(film);
            res.render("films/new",{film:film});
        }
    });
});

//NEW PAGE2
router.get('/new2',middleware.IsLoggedIn,function(req,res){
    Film.findById(req.params.id,function(err,film){
        if(err)console.log(err);
        else{
            res.render("films/new2",{film:film});
        }
    });
});

//SELECT PAGE
router.get('/select/:id',function(req,res){
    var searchtitle=req.params.id;
    var url="http://www.omdbapi.com/?i="+searchtitle+"&plot=full&apikey=thewdb";
    request(url,function(err,response,body){
        //console.log(body);
        if(!err&&response.statusCode==200){
            body=JSON.parse(body);
            //console.log(body);
            res.render('films/new',{film:body});
            
        }else{
            var resfilm;
            resfilm.Response='False';
            res.render('films/new',{film:resfilm});
        }
    });
});

//SHOW PAGE
router.get('/:id',function(req,res){
    Film.findById(req.params.id).populate("comments").exec(function(err,foundfilm){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundcampground)
            res.render("films/show",{film:foundfilm,rNum:foundfilm.comments.length});
        }
    });
});

//EDIT ROUTE
router.get('/:id/edit',middleware.checkOwnership,function(req,res){
        Film.findById(req.params.id,function(err,foundfilm){
        if(err){
            console.log(err);
            res.redirect("/films");
        }
        res.render("films/edit",{film:foundfilm});
    })

});

//UPDATE ROUTE
router.put('/:id',middleware.checkOwnership,function(req,res){
    Film.findByIdAndUpdate(req.params.id,req.body.film,function(err,film){
        if(err){
            console.log(err);
            res.redirect("/films");
        }
        else{
            res.redirect("/films/"+req.params.id);
        }
    })
});


//DESTROY ROUTE
router.delete('/:id',middleware.checkOwnership,function(req,res){
    Film.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/films");
        }
        else{
            req.flash("success","Film Deleted");
            res.redirect("/films")
        }
    })
});



module.exports=router;