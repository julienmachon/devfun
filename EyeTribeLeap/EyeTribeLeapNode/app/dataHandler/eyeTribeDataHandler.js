var util = require('util');
var dl = require('./dataHandle.js');

/**
 * 
 * @constructor
 */

function EyeTribeDataHandler() {
	dl.DataHandler.call(this);
};
util.inherits(EyeTribeDataHandler, dl.DataHandler);


module.exports = EyeTribDataHandler;
