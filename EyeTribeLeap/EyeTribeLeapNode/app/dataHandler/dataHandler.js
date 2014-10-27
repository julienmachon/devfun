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
}

/**
 * Processes a bunch of data
 * @abstract
 */

DataHandler.prototype.process = function(data) {
	throw new Error('must be implemented by subclass!');
};

module.exports = DataHandler;
