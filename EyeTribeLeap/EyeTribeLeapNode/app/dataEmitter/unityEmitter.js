var util = require('util');
var de = require('./dataEmitter.js');

/**
 * 
 * @constructor
 * @param {array} connections
 */

function UnityEmitter(connections) {
	de.call(this);
	this.connections = connections;
}	
util.inherits(UnityEmitter, de);

/**
 * Implements abstract method `send` defined in DataEmitter class 
 *
 * @param {JSON} data -  the data to send
 */ 

UnityEmitter.prototype.send = function(data) {
	//TODO: tests
	console.log('Sending> '+ data, '('+ this.connections.clients.length+')');
	for(var c in this.connections.clients){
		this.connections.clients[c].send(data);
	}
};

module.exports = UnityEmitter;
