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

test.describe('Update News Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('updateNewsPage');
        navBarSelector = By.tagName('nav');
        driver.findElements(By.tagName('tr'))
            .then( function( users ) {
                numUsers = users.length;
            });
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/?#/updateNews');
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
                    expect(text).to.equal('Update An Article');
                })
            });
    } );
    test.it( 'shows details h3', function() {
        driver.findElement(By.tagName('h3'))
            .then(function(element) {
                element.getText().then(function(text){
                    expect(text).to.equal('Please Enter New Article Details Below');
                })
            });
    } );
    test.it( 'updates an article', function() {
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
                element.sendKeys('Test Article 3');
            })
        var input = driver .findElement(By.id('msgBox'));
        input
            .then(function(){
                return driver.findElement(By.id('msgBox'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus tortor id augue egestas, vel consequat odio efficitur. Praesent cursus, neque eu tristique dictum, odio ex dignissim dolor, id suscipit urna sapien vel metus.');
            })
            .then(function(){
                return driver.findElement(By.id('updateNewsBtn'));
            })
            .then(function(element){
                element.submit();
            })
    } );

    test.after(function() {
        driver.quit();
    });
});