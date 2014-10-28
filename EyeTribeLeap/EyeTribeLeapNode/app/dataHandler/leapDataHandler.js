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
	//keeps states values
	this.states = {};
	//keeps id,name,timestamp of Gestures
	this.timers= {};
};
util.inherits(LeapDataHandler, dl);

/**
 * Implementation of the abstract method
 * @param {JSON} data - the data to process
 */
LeapDataHandler.prototype.process = function processGesture(data) {
	if(data.type && data.state) {
		switch(data.type) {
			case 'circle': 
			case 'swipe':
				//Circle and swipe both have a "update" and "stop" state. So we deal with both the same
				//if gesture is being performed
				if(data.state === 'update') {
					//and is set to stop
		                	if(!this.states[data.type]) {
		                		console.log('Doing ' + data.type);
						//Set state to true, emit and run timer in case "stop" never happens or is too long to do so.
		                		this.states[data.type] = true;
						this.timers[data.type] = {when: Date.now(), id: data.id};
						//console.log('Setting id at ', data.id);
						this.emitter.send(buildCommand(data.type, this.states[data.type]));
						var id = setTimer(this, data.type, (function(emitter) {
							return function(stop) {
								if(stop) {
									emitter.send(buildCommand(data.type, false));
								}
							}
						}(this.emitter)));
						this.timers[data.type].toId = id;
		                	}
					//set to true, means it is still runing
					else {
						//updating timestamp
						this.timers[data.type].when = Date.now()
						this.timers[data.type].id = data.id;
					}
					return false;
		                }
		                else if(data.state === 'stop') {
					//Gesture stoped
		                	if(this.states[data.type]) {
		                		console.log('Stop ' + data.type);
						//Set state to false if true previously (if not, it already happened, no need to do it again)
						//and emit
		                		this.states[data.type] = false;
						clearTimeout(this.timers[data.type].toId);
						this.emitter.send(buildCommand(data.type, this.states[data.type]));
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
 */
function setTimer(context, name, callback) {
	var context = context;
	//read current state, timestamp and id
	//check it again Xseconds later
	//callback with either "yep, send stop" or "nope, it's fine"
	function getData() {
		return {
			id: context.timers[name].id,
			ts: context.timers[name].when,
			state: context.states[name]
		}
	};

	//Get data before check
	var dataBeforeCheck = getData();
	var toid = setTimeout(function(){
		var dataAfterCheck = getData();	
		console.log('Before> ', dataBeforeCheck);
		console.log('After> ', dataAfterCheck);
		//
		if(dataAfterCheck.id === dataBeforeCheck.id && dataAfterCheck.ts <= dataBeforeCheck.ts) {
			callback(true);
		}
		else {
			//callback(false);
			setTimer(context, name, callback);
		}
			
	}, 2000);

	return toid;
}

module.exports = LeapDataHandler;
