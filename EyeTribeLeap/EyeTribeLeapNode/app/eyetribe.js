var net = require('net');


/**
 * @static
 *
 * @return {function} start
 */

var LeapMotion = (function(){
	return {
		start: function start() {
		
		}
	}
}());

exports.start = function(connections){


	var socket = net.createConnection({ip: 'localhost', port: 6555}, function() {

		//keeps the tracker alive
		setInterval(function() {
			socket.write(JSON.stringify({
				"category": "heartbeat"
			}));
		}, 2000);



		console.log('EyeTribe connected');

		socket.on('error', function(data) {
			console.log('TheEyeTribe error', data);
		})
		socket.on('close', function(data) {
			console.log('TheEyeTribe close');
		})
		socket.on('data', function(data) {
			//console.log(data);
			try {
				data = JSON.parse(data);
				if(data.values && data.values.frame) {
					handleFrameData(data.values.frame);
				}
			} catch(e) {
				console.error('Malformed JSON', e);
			}
		})

		// Request tracker reading data
		socket.write(JSON.stringify({
			category: 'tracker',
			request: 'set',
			values: {'push': true}
		}));






	});
	socket.setEncoding('utf8');



	function handleFrameData(data) {
		if((data.lefteye.avg.x === 0 || data.righteye.avg.y ===0) && !(data.lefteye.avg.x === 0 && data.righteye.avg.y ===0)) {
			console.log('Wink');
			for(c in connections) {                                             //else
				connections[c].send('{"command": "wink", "state":"true"}');//console.log(data.lefteye.avg.x+'\t\t'+data.righteye.avg.y);
			}
		}else{

			for(c in connections) {                                             //else
				connections[c].send('{"command": "wink", "state":"false"}');//console.log(data.lefteye.avg.x+'\t\t'+data.righteye.avg.y);
			}
		}


	};
};

