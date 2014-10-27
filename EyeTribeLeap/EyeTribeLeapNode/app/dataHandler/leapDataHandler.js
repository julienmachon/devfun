var util = require('util');
var dl = require('./dataHandle.js');


/**
 * @constructor 
 */

function LeapDataHandler() {
	dl.DataHandler.call(this);
};
util.inherits(LeapDataHandler, dl.DataHandler);


module.exports = LeapDataHandler;
