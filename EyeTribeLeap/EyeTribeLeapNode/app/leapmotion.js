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
				//console.log(payload.toString());
			});

			my.leapmotion.on('gesture', function(payload) {
				if(payload.type === 'circle' && payload.state === 'stop'){
					for(c in connections) {
						connections[c].send('{"command": "wave", "state":"false"}');
					}
					console.log(payload);
				}
				if(payload.type === 'circle' && payload.state != 'stop'){
					for(c in connections) {
						connections[c].send('{"command": "wave", "state":"true"}');
					}
					console.log(payload);
				}

			});
		}
	});

	return {
		start: function start(){
			robot.start();
		}
	};
}());


module.exports = LeapMotion;
