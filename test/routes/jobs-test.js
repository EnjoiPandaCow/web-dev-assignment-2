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
var Job = require('../../models/jobs-model');

mongoose.connect('mongodb://localhost:27017/shyft', {useMongoClient: true});

var db = mongoose.connection;
mongoose.Promise = require('bluebird');

db.on('error', function(err){
});

db.once('open', function(){
});

describe('Jobs', function () {
    beforeEach(function (done) {

        Job.remove({}, function (err) {

            if (err)
                done(err);
            else {
                var job1 = new Job();

                job1._id = "59f1e69dd0ae514f10a24a82";
                job1.title = "Couch";
                job1.desc = "Sold my couch online, no way to transport it";
                job1.size = "Fits in a Van";
                job1.cStreet = "122 Stillorgan Wood";
                job1.cTown = "Stillorgan";
                job1.cCounty = "Dublin";
                job1.cCoordinates = [
                    53.282694,
                    -6.211145
                ];
                job1.dStreet = "Roadford Doolin Clare";
                job1.dTown = "Doolin";
                job1.dCounty = "Clare";
                job1.dCoordinates = [
                    53.023793,
                    -9.30881
                ];
                job1.dTime = "2014-09-11T14:12:00.000Z";
                job1.price = 100.14;
                job1.photos = [
                    "/photos/job/0002/4.jpg",
                    "/photos/job/0003/5.jpg",
                    "/photos/job/0004/6.jpg"
                ];
                job1.userId = "59f9fb109bd9dc7f544cadfa";

                job1.save(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var job2 = new Job();

                        job2._id = "59f1e69dd0ae514f10a24a83";
                        job2.title = "Pet Supplies";
                        job2.desc = "Please deliver inside doors by register";
                        job2.size = "Fits in the Back Seat of a Car";
                        job2.cStreet = "Petco, 28 The Mall";
                        job2.cTown = "Newery";
                        job2.cCounty = "Down";
                        job2.cCoordinates = [
                            54.180558,
                            -6.339021
                        ];
                        job2.dStreet = "Main Street";
                        job2.dTown = "Adare";
                        job2.dCounty = "Limerick";
                        job2.dCoordinates = [
                            52.564611,
                            -8.789048
                        ];
                        job2.dTime = "2017-10-10T13:12:00.000Z";
                        job2.price = 35.41;
                        job2.photos = [
                            "/photos/job/0003/7.jpg",
                            "/photos/job/0003/8.jpg"
                        ];
                        job2.userId = "59f9fb109bd9dc7f544cadfa";

                        job2.save(function (err) {
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
    describe('GET /jobs', function () {
        it('should return all the jobs in the array', function (done) {
            chai.request(server)
                .get('/jobs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    var result = _.map(res.body, function(job){
                        return {
                            _id : job._id,
                            price : job.price,
                            dTime : job.dTime,
                            dCoordinates : job.dCoordinates,
                            dCounty : job.dCounty,
                            dTown : job.dTown,
                            dStreet : job.dStreet,
                            cCoordinates : job.cCoordinates,
                            cCounty : job.cCounty,
                            cTown : job.cTown,
                            cStreet : job.cStreet,
                            size : job.size,
                            desc : job.desc,
                            title : job.title,
                            photos : job.photos
                        };
                    });
                    expect(result).to.include({
                        _id : "59f1e69dd0ae514f10a24a82",
                        price : 100.14,
                        dTime : "2014-09-11T14:12:00.000Z",
                        dCoordinates : [
                        53.023793,
                        -9.30881
                    ],
                        dCounty : "Clare",
                        dTown : "Doolin",
                        dStreet : "Roadford Doolin Clare",
                        cCoordinates : [
                        53.282694,
                        -6.211145
                    ],
                        cCounty : "Dublin",
                        cTown : "Stillorgan",
                        cStreet : "122 Stillorgan Wood",
                        size : "Fits in a Van",
                        desc : "Sold my couch online, no way to transport it",
                        title : "Couch",
                        photos : [
                        "/photos/job/0002/4.jpg",
                        "/photos/job/0003/5.jpg",
                        "/photos/job/0004/6.jpg"
                    ]
                    });
                    expect(result).to.include({
                        _id : "59f1e69dd0ae514f10a24a83",
                        price : 35.41,
                        dTime : "2017-10-10T13:12:00.000Z",
                        dCoordinates : [
                            52.564611,
                            -8.789048
                        ],
                        dCounty : "Limerick",
                        dTown : "Adare",
                        dStreet : "Main Street",
                        cCoordinates : [
                            54.180558,
                            -6.339021
                        ],
                        cCounty : "Down",
                        cTown : "Newery",
                        cStreet : "Petco, 28 The Mall",
                        size : "Fits in the Back Seat of a Car",
                        desc : "Please deliver inside doors by register",
                        title : "Pet Supplies",
                        photos : [
                            "/photos/job/0003/7.jpg",
                            "/photos/job/0003/8.jpg"
                        ]
                    });
                    done();
                });
        });
    });
    describe('GET /job/:id', function () {
        it('should return a single job with certain id', function (done) {
            chai.request(server)
                .get('/jobs/59f1e69dd0ae514f10a24a82')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    var result = _.map(res.body, function(job){
                        return {
                            _id : job._id,
                            price : job.price,
                            dTime : job.dTime,
                            dCoordinates : job.dCoordinates,
                            dCounty : job.dCounty,
                            dTown : job.dTown,
                            dStreet : job.dStreet,
                            cCoordinates : job.cCoordinates,
                            cCounty : job.cCounty,
                            cTown : job.cTown,
                            cStreet : job.cStreet,
                            size : job.size,
                            desc : job.desc,
                            title : job.title,
                            photos : job.photos
                        };
                    });
                    expect(result).to.include({
                        _id : "59f1e69dd0ae514f10a24a82",
                        price : 100.14,
                        dTime : "2014-09-11T14:12:00.000Z",
                        dCoordinates : [
                            53.023793,
                            -9.30881
                        ],
                        dCounty : "Clare",
                        dTown : "Doolin",
                        dStreet : "Roadford Doolin Clare",
                        cCoordinates : [
                            53.282694,
                            -6.211145
                        ],
                        cCounty : "Dublin",
                        cTown : "Stillorgan",
                        cStreet : "122 Stillorgan Wood",
                        size : "Fits in a Van",
                        desc : "Sold my couch online, no way to transport it",
                        title : "Couch",
                        photos : [
                            "/photos/job/0002/4.jpg",
                            "/photos/job/0003/5.jpg",
                            "/photos/job/0004/6.jpg"
                        ]
                    });
                    done();
                });
        });
        it('should return an error message and a 404 error', function (done) {
            chai.request(server)
                .get('/jobs/59f1e69dd0ae514f10a24a8')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Job Not Found! Please Try Another Job ID.');
                    done();
                });
        });
    });
    describe('POST /jobs', function () {
        it('should return a confirmation message and an updated datastore', function (done) {
            var newJob = {
                "title": "TEST",
                "desc": "TEST",
                "size": "TEST",
                "cStreet": "TEST",
                "cTown": "TEST",
                "cCounty": "TEST",
                "cCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dStreet": "TEST",
                "dTown": "TEST",
                "dCounty": "TEST",
                "dCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dTime": "2017-10-10T13:12:00.000Z",
                "price": "00.00",
                "photos": [
                    "/photos/job/0003/7.jpg",
                    "/photos/job/0003/8.jpg"
                ],
                "userId": "59f9fb109bd9dc7f544cadfa"
            };
            chai.request(server)
                .post('/jobs')
                .send(newJob)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Job Added!');
                    done();
                });
        });
        it('should return an error message and a 400 error', function (done) {
            var newJob = {

                "desc": "TEST",
                "size": "TEST",
                "cStreet": "TEST",
                "cTown": "TEST",
                "cCounty": "TEST",
                "cCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dStreet": "TEST",
                "dTown": "TEST",
                "dCounty": "TEST",
                "dCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dTime": "2017-10-10T13:12:00.000Z",
                "price": "00.00",
                "photos": [
                    "/photos/job/0003/7.jpg",
                    "/photos/job/0003/8.jpg"
                ],
                "userId": "59f9fb109bd9dc7f544cadfa"

            };
            chai.request(server)
                .post('/jobs')
                .send(newJob)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Job Not Added! Please Check That You Are Filling All Fields & Try Again');
                    done();
                });
        });
    });
    describe('PUT /jobs/:id', function () {
        it('should return a confirmation message and an updated datastore', function (done) {
            var update = {"title": "New Test Title 3.0"};
            chai.request(server)
                .put('/jobs/59f1e69dd0ae514f10a24a82')
                .send(update)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Job Updated');
                    done();
                });
        });
        it('should return an error message and a 400 error', function (done) {
            var update = {"title": "New Test Title 3.0"};
            chai.request(server)
                .put('/jobs/59f1e69dd0ae514f10a24a8')
                .send(update)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Failed To Update Job. Please Try Again');
                    done();
                });
        });
    });
    describe('DELETE /jobs/:id', function () {
        it('should delete a job with a certain id', function (done) {
            chai.request(server)
                .delete('/jobs/59f1e69dd0ae514f10a24a82')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should return an error message and a 400 error', function (done) {
            chai.request(server)
                .delete('/jobs/59f1e69dd0ae514f10a24a8')
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').equal('Failed To Delete Job. Please Try Again');
                    done();
                });
        });
    });
    describe('POST /jobs/search - Happy Cases', function () {
        it('should return a title that contains all or part of value', function (done) {
            var search = {"key": "title", "value": "Couch"};
            chai.request(server)
                .post('/jobs/search')
                .send(search)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        describe('POST /jobs/search - Error Cases', function () {
            it('should return an error message and a 404 error - no value that matches sent value', function (done) {
                var search = {"key": "title", "value": "Hello"};
                chai.request(server)
                    .post('/jobs/search')
                    .send(search)
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').equal('No Job Containing Search Term Found');
                        done();
                    });
            });
            it('should return an error message and a 404 error - bad key', function (done) {
                var search = {"key": "tTitle", "value": "Hello"};
                chai.request(server)
                    .post('/jobs/search')
                    .send(search)
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').equal('No Job Containing Search Term Found');
                        done();
                    });
            });
        });
    });
});




