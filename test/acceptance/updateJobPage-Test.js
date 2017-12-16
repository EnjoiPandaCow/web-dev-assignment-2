var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;
var pageSelector;
var navBarSelector;

test.describe('Update Job Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('updateJobPage');
        navBarSelector = By.tagName('nav');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/?#/updateJob');
        driver.wait(until.elementLocated(pageSelector), 30000);
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
                    expect(text).to.equal('Update a Job');
                })
            });
    } );
    test.it( 'shows details h3', function() {
        driver.findElement(By.tagName('h3'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Please Enter The Details You Would Like To Update');
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
    test.it( 'updates a job', function() {
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
                element.sendKeys('Piltown');
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
                element.sendKeys('Callen');
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
                element.sendKeys('Co.Kilkenny');
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
                element.sendKeys('1001');
            })

            .then(function(){
                return driver.findElement(By.id('updateJobBtn'));
            })
            .then(function(element){
                element.submit();
            })
    } );

    test.after(function() {
        driver.quit();
    });
});
