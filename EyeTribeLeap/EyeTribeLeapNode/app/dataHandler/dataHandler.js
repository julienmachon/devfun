/**
 * Abstract class.
 * Hight level definition of a Data handler.
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
}

/**
 * Returns a reference to emitter
 * @return emitter - the emitter used by data handler
 **/
DataHandler.prototype.getEmitter = function() {
	return this.emitter;
};

/**
 * Processes something 
 * @abstract
 */

DataHandler.prototype.process = function() {
	throw new Error('must be implemented by subclass!');
};

module.exports = DataHandler;
