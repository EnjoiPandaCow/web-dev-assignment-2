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

test.describe('Search Delivery Page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('searchDeliveryPage');
        navBarSelector = By.tagName('nav');
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/?#/jobs');
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
                    expect(text).to.equal('View All Jobs');
                })
            });
    } );
    test.it( 'shows jobs table', function() {
        driver.findElement(By.id('jobsTable'))
            .then(function(element) {
                expect(element).to.not.equal(null);
            })
    });
    test.after(function() {
        driver.quit();
    });
});
