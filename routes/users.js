var User = require('../models/users-model');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Fuse = require('fuse.js');

mongoose.connect('mongodb://localhost:27017/shyft');

var db = mongoose.connection;

db.on('error', function(err){

});

db.once('open', function(){

});

router.findAll = function(req, res) {
    User.find(function(err, user) {
        if(err)
            res.status(404).send(err);
        else
            res.status(200).json(user);
    });
};

router.findOne = function(req,res) {
    User.find({"_id" : req.params.id}, function(err, user) {
        if(err)
            res.status(404).json({message: 'User Not Found! Please Try Another Job ID.'});
        else
            res.status(200).json(user);
    });
};

router.addUser = function (req,res) {
    var user = new User();

    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.contactNo = req.body.contactNo;
    user.password = req.body.password;
    user.street = req.body.street;
    user.town = req.body.town;
    user.county = req.body.county;

    user.save(function(err) {
        if (err)
            res.status(400).json({message: 'User Not Added! Please Check That You Are Filling All Fields'});
        else
            res.status(200).json({message: 'User Added!'});
    });
};

router.updateUser = function (req,res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, doc) {
        if(err)
            res.status(400).json({message: 'Failed To Update User Profile. Please Try Again'});
        else
            res.status(200).json({message: 'User Updated'});
    });
};

router.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Delete User. Please Try Again'});
        else
            res.status(200).json({message: 'User Sucessfully Deleted!'});
    });
};


router.search = function(req, res) {

    User.find().lean().exec(function(err, jobs) {
        if (err)
            res.status(400).json({message: 'Error While Searching For User. Please Try Again'});

        var job = jobs;
        var key = [];

        if(req.body.key) {
            if(typeof req.body.key === 'object' && req.body.key.constructor === Array) {
                key = req.body.key;
            } else {
                key.push(req.body.key);
            }
        }
        var options = {
            keys: key
        };

        var fuse = new Fuse(job,options);
        var result = fuse.search(req.body.value);

        if(result.length > 0) {
            return res.status(200).json(result);
        }else {
            res.status(404).json({message: 'No User Containing Search Term Found'})
        }
    });

};


module.exports = router;
