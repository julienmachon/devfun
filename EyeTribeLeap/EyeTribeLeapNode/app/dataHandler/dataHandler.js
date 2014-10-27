/**
 * Defines a hight level data handler
 * @class
 **/

/**
 *
 * Handles data
 *
 * @constructor
 **/
function DataHandler() {
	this.states = {};
}

/**
 * Processes a bunch of data
 * @abstract
 */

DataHandler.prototype.process = function(data) {
	throw new Error('must be implemented by subclass!');
};

module.exports = DataHandler;
