var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;
var numUsers;
var pageSelector;
var navBarSelector;

test.describe('Add User Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('addUserPage');
        navBarSelector = By.tagName('nav');
        driver.findElements(By.tagName('tr'))
            .then( function( users ) {
                numUsers = users.length;
            });
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/?#/user');
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
                    expect(text).to.equal('Add A New User');
                })
            });
    } );
    test.it( 'shows details h3', function() {
        driver.findElement(By.tagName('h3'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Please Enter User Details Below');
                })
            });
    } );
    test.it( 'shows address paragraph', function() {
        driver.findElement(By.tagName('p'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Address');
                })
            });
    } );
    test.it( 'accepts a new user', function() {
        var input = driver .findElement(By.id('fNameBox'));
        input
            .then(function(){
                return driver.findElement(By.id('fNameBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('CJ');
            })
        var input = driver .findElement(By.id('lNameBox'));
        input
            .then(function(){
                return driver.findElement(By.id('lNameBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('OSullivan');
            })
        var input = driver .findElement(By.id('emailBox'));
        input
            .then(function(){
                return driver.findElement(By.id('emailBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('cjosullivan@hotmail.co.uk');
            })
        var input = driver .findElement(By.id('contactNumBox'));
        input
            .then(function(){
                return driver.findElement(By.id('contactNumBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('0831555552');
            })
        var input = driver .findElement(By.id('passwordBox'));
        input
            .then(function(){
                return driver.findElement(By.id('passwordBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Password1');
            })
        var input = driver .findElement(By.id('streetBox'));
        input
            .then(function(){
                return driver.findElement(By.id('streetBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Main Street');
            })
        var input = driver .findElement(By.id('townBox'));
        input
            .then(function(){
                return driver.findElement(By.id('townBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Gorey');
            })
        var input = driver .findElement(By.id('countyBox'));
        input
            .then(function(){
                return driver.findElement(By.id('countyBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Co.Wexford');
            })

            .then(function(){
                return driver.findElement(By.id('addUserBtn'));
            })
            .then(function(element){
                element.submit();
            })

            .then(function() {
                driver.wait(until.elementLocated(By.id('viewUsersPage')),20000);
                return driver.findElements(By.tagName('tr'));
            })
            .then( function( users ) {
                expect(users.length).to.not.equal(numUsers + 0) ;
                return users;
            })

    } );

    test.after(function() {
        driver.quit();
    });
});
