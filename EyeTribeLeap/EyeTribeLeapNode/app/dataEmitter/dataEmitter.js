/**
 * Emits data to all connections
 * @class 
 **/


/**
 * Represents a Data Emitter
 * @constructor
 */
function DataEmitter() {
}


/**
 * Sends something somewhere somehow
 * @abstract
 */
DataEmitter.prototype.send = function(){
	throw new Error('must be implemented by subclass!');
};

module.exports = DataEmitter;
