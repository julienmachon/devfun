var util = require('util');
var de = require('./dataEmitter.js');

/**
 * 
 * @constructor
 * @param {array} connections
 */

function UnityEmitter(connections) {
	de.DataEmitter.call(this);
}	
console.log(de);
util.inherits(UnityEmitter, de.DataEmitter);

/**
 * Implements abstract method `send` defined in DataEmitter class 
 *
 * @param {JSON} data -  the data to send
 */ 

UnityEmitter.prototype.send = function(data) {
	for(var c in this.connections) {
		this.connections.send('{"command" : "' + data.command + '", "state" : "' + data.state + '"}')
	}
};

module.exports = UnityEmitter;
