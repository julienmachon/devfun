/**
 * Extends Data Handler for LeapMotion
 * This class deals with Gestures received from a LeapMotion Device
 * @class
 */

var util = require('util'),
	dl = require('./dataHandler.js');

/**
 * @constructor 
 * @param emitter - object to emit processed data with
 */
function LeapDataHandler(emitter) {
	LeapDataHandler.super_.call(this);
	//save object in context
	this.emitter = emitter;
	//Keeps queues for certain gestures
	this.queues = {
		swipe: 0
	};
};
util.inherits(LeapDataHandler, dl);

/**
 * Implementation of the abstract method
 * @param {JSON} data - the data to process
 */
LeapDataHandler.prototype.process = function processGesture(data) {
	if(data.type && data.state) {
		switch(data.type) {
			case 'swipe':
				//specific swipe gesture has stoped
		                if(data.state === 'stop') {
					//add in queue
					this.queues.swipe++;
					if(this.queues.swipe===1) {
						//first one, send comand
						this.emitter.send(buildCommand(data.type, true));
					}
					//setting timeout
					setTimeout((function(emitter, queues){
						return function() {
							//remove from queue
							--queues.swipe;
							//if nothing left
							if(queues.swipe===0)
								emitter.send(buildCommand(data.type, false));
						}
					}(this.emitter, this.queues)), 250);
		                }
				break;
			case 'keyTap':
			case 'screenTap':
			case 'circle':
				//send command once one of these gestures has been performed.
				if(data.state === 'stop') {
					//emit command
					this.emitter.send(buildCommand(data.type, true));
					//emit stop 1s after
					setTimeout((function(emitter){
						return function() {
							emitter.send(buildCommand(data.type, false));
						}
					}(this.emitter)), 250);
				}
				break;
			default:
				console.log('Not Recognised');
				return false;
		}
	}
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

module.exports = LeapDataHandler;
