const CONSTANTS = require('./src/constants')
const config = require('./src/config')
const casper  = require('casper').create(config)
// const platform = require('./src/platform')
const INSTAGRAM_URL  = CONSTANTS.INSTAGRAM_URL
const LOGIN_FORM  = CONSTANTS.LOGIN_FORM
const LOGIN_LINK  = CONSTANTS.LOGIN_LINK

// print out all the messages in the headless browser context
casper.on('remote.message', function (msg)  {
  this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function (msg, trace) {
  this.echo("Page Error: " + msg, "ERROR");
});

casper.start(INSTAGRAM_URL, function () {
  console.log("page instagram loaded");
});

casper.then(function () {
  // Click on 1st result link
  this.click(LOGIN_LINK + ' a');
});

casper.then( function() {
    this.fill(LOGIN_FORM, {
        'username':    'I am watching you',
        'password':    'I am watching you',
    }, true);
});

casper.run()