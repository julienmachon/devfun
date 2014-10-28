var util = require('util');
var dl = require('./dataHandler.js');


/**
 * @constructor 
 */

function LeapDataHandler(emitter) {
	LeapDataHandler.super_.call(this);
	this.state = {};
	this.timers= {};
	this.emitter = emitter;
};
util.inherits(LeapDataHandler, dl);

/**
 * @param {JSON} data - the data to process
 **/
LeapDataHandler.prototype.process = function process(data){
	console.log(data);
};

/**
 *
 */
LeapDataHandler.prototype.processGesture = function processGesture(data) {
	if(data.type && data.state) {
		switch(data.type) {
			case 'circle': 
			case 'swipe':
				//Circle and swipe both have a "update" and "stop" state. So we deal with both the same
				if(data.state === 'update') {
					//if gesture is being performed
		                	if(!this.state[data.type]) {
		                		console.log('Doing ' + data.type);
						//Set state to true, emit and run timer in case "stop" never happens or is too long to do so.
		                		this.state[data.type] = true;
						this.timers[data.type] = {when: Date.now(), id: data.id};
						//console.log('Setting id at ', data.id);
						this.emitter.send(buildCommand(data.type, this.state[data.type]));
						setTimer(this, data.type, (function(emitter) {
							return function(stop) {
								if(stop) {
									emitter.send(buildCommand(data.type, false));
								}
							}
						}(this.emitter)));
						
		                	}
					return false;
		                }
		                else if(data.state === 'stop') {
					//Gesture stoped
		                	if(this.state[data.type]) {
		                		console.log('Stop ' + data.type);
						//Set state to false if true previously (if not, it already happened, no need to do it again)
						//and emit
		                		this.state[data.type] = false;
						this.emitter.send(buildCommand(data.type, this.state[data.type]));
		                	}
					return false;
		                }
				break;
			case 'keyTap':
			case 'screenTap':
				console.log('Did ' + data.type);
				//keyTab and screenTap are a "one time" gesture. It just happens
				//so, emit and set timer to emit stop state
				this.emitter.send(buildCommand(data.type, true));
				var e = this.emitter;
				setTimeout((function(emitter){
					return function() {
						emitter.send(buildCommand(data.type, false));
					}
				}(this.emitter)), 1000);
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

/**
 * Reset state to false after a certain time
 * @private
 *
 **/
function setTimer(context, name, callback) {
	var context = context;
	//read current state, timestamp and id
	//check it again Xseconds later
	//callback with either "yep, send stop" or "nope, it's fine"
	function getData() {
		return {
			id: context.timers[name].id,
			ts: context.timers[name].when,
			state: context.state[name]
		}
	};

	//Get data before check
	var dataBeforeCheck = getData();
	setTimeout(function(){
		var dataAfterCheck = getData();	
		//console.log('Before> ', dataBeforeCheck);
		//console.log('After> ', dataAfterCheck);
		if(dataAfterCheck.id === dataBeforeCheck.id) {
			callback(true)
		}
		else {
			callback(false);
		}
			
	}, 2000);
}


module.exports = LeapDataHandler;
