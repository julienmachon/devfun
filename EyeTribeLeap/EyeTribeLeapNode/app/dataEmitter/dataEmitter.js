/**
 * Emits data to all connections
 * @class 
 **/


/**
 * Represents a Data Emitter
 * @constructor
 * @param {array} connections - A list of connections
 */
function DataEmitter(connections) {
	this.connections = connections;
}


/**
 * Sends data to all connections
 * @abstract
 * @param {JSON} data
 */
DataEmitter.prototype.send = function(data){
	throw new Error('must be implemented by subclass!');
};

module.exports = DataEmitter;
