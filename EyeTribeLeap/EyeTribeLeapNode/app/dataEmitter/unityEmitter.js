/**
 * Implements a Data Emitter of a Unity Client (or any client really) 
 * @class
 */

var util = require('util'),
	de = require('./dataEmitter.js');

/**
 * 
 * @constructor
 * @param {array} connections - WebSocketServer
 */

function UnityEmitter(connections) {
	de.call(this);
	this.connections = connections;
}	
util.inherits(UnityEmitter, de);

/**
 * Implements abstract method `send` defined in DataEmitter class 
 *
 * @param {String} data - the data to send
 */ 
UnityEmitter.prototype.send = function(data) {
	console.log('Sending> '+ data, '('+ this.connections.clients.length+')');
	for(var c in this.connections.clients){
		this.connections.clients[c].send(data);
	}
};

module.exports = UnityEmitter;
