var Job = require('../models/jobs-model');
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
    Job.find(function(err, job) {
       if(err)
           res.status(404).send(err);
       else
           res.status(200).json(job);
    });
};

router.findOne = function(req,res) {
  Job.find({"_id" : req.params.id}, function(err, job) {
      if (err)
          res.status(404).json({message: 'Job Not Found! Please Try Another Job ID.'});
      else
      res.status(200).json(job);
  });
};

router.addJob = function (req,res) {
    var job = new Job();

    job.title = req.body.title;
    job.desc = req.body.desc;
    job.size = req.body.size;
    job.cStreet = req.body.cStreet;
    job.cTown = req.body.cTown;
    job.cCounty = req.body.cCounty;
    job.cCoordinates = req.body.cCoordinates;
    job.dStreet = req.body.dStreet;
    job.dTown = req.body.dTown;
    job.dCounty = req.body.dCounty;
    job.dCoordinates = req.body.dCoordinates;
    job.dTime = req.body.dTime;
    job.price = req.body.price;
    job.photos = req.body.photos;
    job.userId = req.body.userId;

    job.save(function(err) {
       if (err)
           res.status(400).json({message: 'Job Not Added! Please Check That You Are Filling All Fields & Try Again'});
       else
           res.status(200).json({message: 'Job Added!'});
    });
};

router.updateJob = function (req,res) {
    Job.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Update Job. Please Try Again'});
        else
            res.status(200).json({message: 'Job Updated'});
    });
};

router.deleteJob = function(req, res) {
    Job.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Delete Job. Please Try Again'});
        else
            res.status(200).json({message: 'Job Sucessfully Deleted!'});
    });
};

router.search = function(req, res) {

    Job.find().lean().exec(function(err, jobs) {
        if (err)
            res.status(400).json({message: 'Error While Searching For Job. Please Try Again'});

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
            res.status(404).json({message: 'No Job Containing Search Term Found'})
        }
    });
};

module.exports = router;