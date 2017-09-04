var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/itemlist', function(req, res) {
    var db = req.db;
    var collection = db.get('item');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/cartlist', function(req, res) {
    var db = req.db;
    var collection = db.get('cart');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/messagelist', function(req, res) {
    var db = req.db;
    var collection = db.get('message');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/orderhistory', function(req, res) {
    var db = req.db;
    var collection = db.get('order');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/additem', function(req, res) {
    var db = req.db;
    var collection = db.get('item');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/addcartitem', function(req, res) {
    var db = req.db;
    var collection = db.get('cart');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});





router.get('/finditem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('item');
    var itemToFind = req.params.id;
    collection.find({'_id':itemToFind}, function(err, result){
        res.json(result);
    
    });
});

router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deletecartitem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('cart');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deleteitem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('item');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.post('/leavemessage', function(req, res) {
    var db = req.db;
    var collection = db.get('message');
    //var usertomsg = req.body;
    collection.insert( req.body, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.post('/loguser', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    var userToCheck = req.body;
    collection.findOne({username:userToCheck.username}, function(err, result){
         res.send((err === null) ? { msg: '',pwd:userToCheck.password,password:result.password,username:userToCheck.username,label:result.label} : { msg:'error: ' + err });
    });
});

router.post('/order', function(req, res) {
    var db = req.db;
    var collection = db.get('cart');
    var userTopay = req.body;
    
    collection.find({"shopper":userTopay.username}, function(err, result){
        res.json(result);
    
    });
   
});

router.post('/addorder', function(req, res) {
    var db = req.db;
    var collection = db.get('cart');
    var itemToDelete = req.body;
    collection.remove({ 'shopper' : itemToDelete.shopper }, function(err) {
        if(err === null) {
         
         var collection = db.get('order');
         collection.insert(req.body, function(err, result){
         res.send(
            (err === null) ? { msg: '' } : { msg: err }
            );
         });
         
         }
        else{
         res.send({ msg:'error: ' + err });
         }
    });
    
});


module.exports = router;
