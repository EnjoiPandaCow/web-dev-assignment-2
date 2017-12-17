var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../../bin/www');
var mongoose = require('mongoose');
var after = require('lodash');
var _ = require('lodash');
mongoose.Promise = global.Promise;
chai.use(chaiHttp);
chai.use(require('chai-things'));
var News = require('../../models/news-model');

mongoose.connect('mongodb://localhost:27017/shyft', {useMongoClient: true});

var db = mongoose.connection;
mongoose.Promise = require('bluebird');

db.on('error', function(err){
});

db.once('open', function(){
});

describe('News tests', function () {
    beforeEach(function (done) {

        News.remove({}, function (err) {

            if (err)
                done(err);
            else {
                var news1 = new News();

                news1._id = "59f6f0b99bd9dc7f544d7dbc";
                news1.title = "Test Post 1";
                news1.msg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum.";
                
                news1.save(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var news2 = new News();

                        news2._id = "59f6f14b9bd9dc7f544d7fdf";
                        news2.title = "Test Post 2";
                        news2.msg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum.";

                        news2.save(function (err) {
                            if (err)
                                console.log(err);
                            else {
                                done();
                            }
                        });
                    }
                });
            }
        });
    });
    describe('GET /news', function () {
        it('should return all the articles in the array', function (done) {
            chai.request(server)
                .get('/news')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    var result = _.map(res.body, function(news){
                        return {
                            _id : news._id,
                            title : news.title,
                            msg : news.msg
                        };
                    });
                    expect(result).to.include({
                        _id : "59f6f0b99bd9dc7f544d7dbc",
                        title : "Test Post 1",
                        msg : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum."
                    });
                    expect(result).to.include({
                        _id : "59f6f0b99bd9dc7f544d7dbc",
                        title : "Test Post 1",
                        msg : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum."
                    });
                    done();

                });
        })
    });
    describe('GET /news/:id', function () {
        it('should return a single article with certain id', function (done) {
            chai.request(server)
                .get('/news/59f6f0b99bd9dc7f544d7dbc')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    var result = _.map(res.body, function (news) {
                        return {
                            _id: news._id,
                            title: news.title,
                            msg: news.msg
                        };
                    });
                    expect(result).to.include({
                        _id: "59f6f0b99bd9dc7f544d7dbc",
                        title: "Test Post 1",
                        msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum."
                    });
                    done();
                });
        });
    it('should return an error message and a 404 error', function (done) {
        chai.request(server)
            .get('/news/59f6f0b99bd9dc7f544d7da')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message').equal('Article Not Found! Please Try Another Article ID.');
                done();
            });
        });
    });
    describe('POST /news', function () {
        it('should return a confirmation message and an updated datastore', function (done) {
            var newNews = {
                "title": "Test Post 3",
                "msg": "Test Messasge 3"
            };
            chai.request(server)
                .post('/news')
                .send(newNews)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Article Added!');
                    chai.request(server)
                        .get('/news')
                        .end(function(err, res) {
                            var result = _.map(res.body, function(news) {
                                return {
                                    title : news.title,
                                    msg : news.msg
                                };
                            });
                            expect(result).to.include({
                                "title": "Test Post 3",
                                "msg": "Test Messasge 3"
                            });
                            done();
                        });
                });
        });
        it('should return an error message and a 400 error', function (done){
            var newNews =  {
                "msg": "Test Messasge 4"
            };
            chai.request(server)
                .post('/news')
                .send(newNews)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Article Not Added! Please Check That You Are Filling All Fields & Try Again');
                    done();
                });
        });
    });
    describe('PUT /news/:id', function () {
        it('should return a confirmation message and an updated datastore', function (done) {
            var update = {"title": "Updated Title"};
            chai.request(server)
                .put('/news/59f6f0b99bd9dc7f544d7dbc')
                .send(update)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Article Updated');
                    chai.request(server)
                        .get('/news')
                        .end(function(err, res) {
                            var result = _.map(res.body, function(news) {
                                return {
                                    _id : news._id,
                                    title : news.title,
                                    msg : news.msg
                                };
                            });
                            expect(result).to.include({
                                _id : "59f6f0b99bd9dc7f544d7dbc",
                                title : "Updated Title",
                                msg : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend sem et vestibulum blandit. Maecenas porttitor mauris nec erat vehicula finibus. Proin quis urna auctor, facilisis risus nec, elementum felis. Suspendisse vel placerat lacus, ac condimentum mauris. Suspendisse ac pretium massa. Cras ex risus, mattis ac egestas sed, imperdiet non elit. Proin libero lacus, tincidunt nec laoreet ut, vulputate sagittis metus. Pellentesque condimentum lacinia ligula at interdum."
                            });
                            done();
                        });
                });
        });
        it('should return an error message and a 400 error', function (done) {
            var update = {"title" : "Failed Update"};
            chai.request(server)
                .put('/news/59f6f0b99bd9dc7f544d7da')
                .send(update)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Failed To Update Article. Please Try Again');
                    done();
                });
        });
    });
    describe('DELETE /users/:id', function () {
        it('should delete an article with a certain id', function (done) {
            chai.request(server)
                .delete('/news/59f6f14b9bd9dc7f544d7fdf')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Article Sucessfully Deleted!');
                    done();
                });
        });
        it('should return an error message and a 400 error', function (done) {
            chai.request(server)
                .delete('/news/59f6f0b99bd9dc7f544d7da')
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Failed To Delete Article. Please Try Again');
                    done();
                });
        });
    });
});