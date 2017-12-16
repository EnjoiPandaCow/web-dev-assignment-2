var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;
var numJobs;
var pageSelector;
var navBarSelector;

test.describe('Send Item Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('jobPage');
        navBarSelector = By.tagName('nav');
        driver.findElements(By.tagName('tr'))
            .then( function( jobs ) {
                numJobs = jobs.length;
            });
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/?#/job');
        driver.wait(until.elementLocated(pageSelector), 20000);
    } );
    test.it('shows the main body', function() {
        driver.findElement(pageSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    });
    test.it( 'shows the nav bar', function() {
        driver.findElement(navBarSelector)
            .then(function(element) {
                expect(element).to.not.equal(null );
            });
    } );
    test.it( 'shows page header', function() {
        driver.findElement(By.tagName('h1'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Create A New Delivery Job');
                })
            });
    } );
    test.it( 'shows details h3', function() {
        driver.findElement(By.tagName('h3'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Please Enter The Details Of Your Job Below');
                })
            });
    } );
    test.it( 'shows collection p', function() {
        driver.findElement(By.tagName('p'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Collection Location');
                })
            });
    } );
    test.it( 'accepts a new job', function() {
        var input = driver .findElement(By.id('titleBox'));
    input
        .then(function(){
            return driver.findElement(By.id('titleBox'));
        })
        .then(function(element){
            element.clear();
            return element;
        })
        .then(function(element){
            element.sendKeys('Laptop');
        })
        var input = driver .findElement(By.id('descBox'));
        input
            .then(function(){
                return driver.findElement(By.id('descBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Just Need A Laptop Moved');
            })
        var input = driver .findElement(By.id('cStreetBox'));
        input
            .then(function(){
                return driver.findElement(By.id('cStreetBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Polerone');
            })
        var input = driver .findElement(By.id('cTownBox'));
        input
            .then(function(){
                return driver.findElement(By.id('cTownBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Mooncoin');
            })
        var input = driver .findElement(By.id('cCountyBox'));
        input
            .then(function(){
                return driver.findElement(By.id('cCountyBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Co.Kilkenny');
            })
        var input = driver .findElement(By.id('dStreetBox'));
        input
            .then(function(){
                return driver.findElement(By.id('dStreetBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Main Street');
            })
        var input = driver .findElement(By.id('dTownBox'));
        input
            .then(function(){
                return driver.findElement(By.id('dTownBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Gorey');
            })
        var input = driver .findElement(By.id('dCountyBox'));
        input
            .then(function(){
                return driver.findElement(By.id('dCountyBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Co.Wexford');
            })
        var input = driver .findElement(By.id('priceBox'));
        input
            .then(function(){
                return driver.findElement(By.id('priceBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('100');
            })

            .then(function(){
                return driver.findElement(By.id('addJobBtn'));
            })
            .then(function(element){
                element.submit();
            })

            .then(function() {
            driver.wait(until.elementLocated(By.id('searchDeliveryPage')),20000);
            return driver.findElements(By.tagName('tr'));
        })
            .then( function( jobs ) {
                expect(jobs.length).to.not.equal(numJobs + 0) ;
                return jobs;
            })

} );

    test.after(function() {
        driver.quit();
    });
});
