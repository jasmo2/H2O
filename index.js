const CONSTANTS = require('./src/constants')
const casperjs  = require('casperjs').create()

// const platform = require('./src/platform')
const {INSTAGRAM_URL, LOGIN_LINK} = CONSTANTS

casper.start(INSTAGRAM_URL, function() {
   // Wait for the page to be loaded
   this.waitForSelector('form[action="/search"]');
});