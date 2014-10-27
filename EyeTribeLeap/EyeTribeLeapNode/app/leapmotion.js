var  Cylon = require('../node_modules/cylon');

/**
 * 
 * @static
 * @param {DataHandler} handler
 * @param {DataEmitter} emitter
 */

var LeapMotion = (function(handler, emitter) {
	var handler = handler;
	var emitter = emitter;
	
	//Create a new Instance of Cylon.robot
	var robot = Cylon.robot({
		connection: {
			name: 'leapmotion',
			adaptor: 'leapmotion',
			port: '127.0.0.1:6437'
		},

		device: {
			name: 'leapmotion',
			driver: 'leapmotion'
		},

		work: function(my) {
			my.leapmotion.on('hand', function(payload) {
			//	handler.process(payload);
			});
			my.leapmotion.on('gesture', function(payload) {
				var s = handler.processGesture(payload);
				console.log(s);
			});
		}
	});

	return {
		start: function start(){
			robot.start();
		}
	};
});


module.exports = LeapMotion;
