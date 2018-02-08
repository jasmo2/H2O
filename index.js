const CONSTANTS = require('./src/constants')
const config = require('./src/config')
const casperjs  = require('casperjs').create(config)
// const platform = require('./src/platform')
const {
  INSTAGRAM_URL,
  LOGIN_FORM,
  LOGIN_LINK
} = CONSTANTS

// print out all the messages in the headless browser context
casper.on('remote.message', (msg) => {
  this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", (msg, trace) => {
  this.echo("Page Error: " + msg, "ERROR");
});

casper.start(INSTAGRAM_URL, () => {
  console.log("page instagram loaded");
});

casper.then(() => {
  // Click on 1st result link
  this.click(`${LOGIN_LINK} a`);
});

casper.then(() => {
    this.fill(LOGIN_FORM, {
        'username':    'I am watching you',
        'password':    'I am watching you',
    }, true);
});