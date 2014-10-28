/**
 * Defines a hight level data handler
 * @class
 **/

/**
 *
 * Handles data
 *
 * @constructor
 * @param {DataEmitter} emitter - the emitter object used to emits event
 **/
function DataHandler(emitter) {
	this.emitter = emitter;
	this.states = {};
}

/**
 *
 * 
 **/
DataHandler.prototype.getEmitter = function() {
	return this.emitter;
};

/**
 * Processes a bunch of data
 * @abstract
 */

DataHandler.prototype.process = function(data) {
	throw new Error('must be implemented by subclass!');
};

module.exports = DataHandler;
