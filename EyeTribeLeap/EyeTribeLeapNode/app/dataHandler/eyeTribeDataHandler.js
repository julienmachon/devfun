/**
 * Extends Data Handler for EyeTribe 
 * This class deals with raw data received from a TheEyeTribe Device
 * @class
 */

var util = require('util'),
	dl = require('./dataHandler.js');

/**
 * @constructor
 */
function EyeTribeDataHandler(emitter) {
	EyeTribeDataHandler.super_.call(this);
	//save object in context
	this.emitter = emitter;
	//keeps states values
	this.state = {}; 
};
util.inherits(EyeTribeDataHandler, dl);

/**
 * Implementation of the abstract method
 * @param {JSON} data - the data to process
 */
EyeTribeDataHandler.prototype.process = function process(data) {
	if((data.lefteye.avg.x === 0 || data.righteye.avg.y ===0) && !(data.lefteye.avg.x === 0 && data.righteye.avg.y ===0)) {
		if(!this.state.wink) {
			console.log('Wink');
			this.state.wink = true;
			this.emitter.send('{"command": "wink", "state":"true"}');
		}
	}else{
		if(this.state.wink) {
			console.log('Stop Wink');
			this.state.wink = false;
			this.emitter.send('{"command": "wink", "state":"false"}');
		}
	}
};

module.exports = EyeTribeDataHandler;
