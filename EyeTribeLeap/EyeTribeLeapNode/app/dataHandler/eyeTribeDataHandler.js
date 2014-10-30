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
	//
	this.queues = {
		winkleft: 0, 
		winkright: 0,
		blink: 0
	}; 
};
util.inherits(EyeTribeDataHandler, dl);

/**
 * Implementation of the abstract method
 * @param {JSON} data - the data to process
 */
EyeTribeDataHandler.prototype.process = function process(data) {
	//Wink
	if((data.lefteye.avg.x === 0 || data.righteye.avg.y ===0) && !(data.lefteye.avg.x === 0 && data.righteye.avg.y ===0)) {
		//left wink
		if(data.lefteye.avg.x === 0) {
			queueTime(this.emitter, this.queues, 'winkleft');	
		}
		//right wink
		if(data.righteye.avg.y === 0) {
			queueTime(this.emitter, this.queues, 'winkright');	
		}
	}
	//Blink
	if(data.lefteye.avg.x === 0 && data.righteye.avg.y === 0 && data.lefteye.avg.y === 0 && data.righteye.avg.x === 0){
			queueTime(this.emitter, this.queues, 'blink');	
	}
};

/**
 *
 */
function queueTime(emitter, queues, name) {
		//add in queue
        	queues[name]++;
        	if(queues[name]===1) {
        		//first one, send comand
        		emitter.send(buildCommand(name, true));
        	}
        	//setting timeout
        	setTimeout((function(emitter, queues, name){
        		return function() {
        			//remove from queue
        			--queues[name];
        			//if nothing left
        			if(queues[name]===0)
        				emitter.send(buildCommand(name, false));
        		}
        	}(emitter, queues, name)), 250);
}


/**
 * Builds JSON.
 * @private
 * @param {String} name - name of the command
 * @param {String} state - it's state
 * @return {JSON} - the Object to be sent to client
 */

function buildCommand(name, state) {
	return '{"command" : "'+ name +'", "state" : "'+ state +'"}';
}

module.exports = EyeTribeDataHandler;