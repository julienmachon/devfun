var net = require('net');


/**
 * @static
 *
 * @return {function} start
 */

var EyeTribe = (function(handler){
	var handler = handler;
	return {
		start: function start() {
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
					try {
						data = JSON.parse(data);
						if(data.values && data.values.frame) {
							handler.process(data.values.frame);
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
		}
	}
});

module.exports = EyeTribe;

