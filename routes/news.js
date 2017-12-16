var News = require('../models/news-model');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/shyft');

var db = mongoose.connection;

db.on('error', function(err){
});

db.once('open', function(){
});

router.findAll = function(req, res) {
    News.find(function(err, job) {
        if(err)
            res.status(404).send(err);
        else
            res.status(200).json(job);
    });
};

router.findOne = function(req,res) {
    News.find({"_id" : req.params.id}, function(err, news) {
        if (err)
            res.status(404).json({message: 'Article Not Found! Please Try Another Article ID.'});
        else
            res.status(200).json(news);
    });
};

router.addNews = function (req,res) {
    var news = new News();

    news.title = req.body.title;
    news.msg = req.body.msg;

    news.save(function(err) {
        if (err)
            res.status(400).json({message: 'Article Not Added! Please Check That You Are Filling All Fields & Try Again'});
        else
            res.status(200).json({message: 'Article Added!'});
    });
};

router.updateNews = function (req,res) {
    News.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Update Article. Please Try Again'});
        else
            res.status(200).json({message: 'Article Updated'});
    });
};

router.deleteNews = function(req, res) {
    News.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Delete Article. Please Try Again'});
        else
            res.status(200).json({message: 'Article Sucessfully Deleted!'});
    });
};



module.exports = router;