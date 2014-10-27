var util = require('util');
var de = require('./dataEmitter.js');

/**
 * 
 * @constructor
 * @param {array} connections
 */

function UnityEmitter(connections) {
	de.call(this);
}	
util.inherits(UnityEmitter, de);

/**
 * Implements abstract method `send` defined in DataEmitter class 
 *
 * @param {JSON} data -  the data to send
 */ 

UnityEmitter.prototype.send = function(data) {
	//TODO: tests
	for(var c in this.connections) {
		this.connections.send('{"command" : "' + data.command + '", "state" : "' + data.state + '"}')
	}
};

module.exports = UnityEmitter;
