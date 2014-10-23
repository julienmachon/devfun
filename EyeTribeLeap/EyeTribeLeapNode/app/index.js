var WebSocketServer = require('../node_modules/ws').Server,
  Cylon = require('../node_modules/cylon'),
  pf = require('../node_modules/policyfile').createServer(),
  EyeTribe = require('./eyetribe.js');


// Stock the connections in here
var connections = [];

// Start Policy file
pf.listen();

// Start WEb Socket Server
wss = new WebSocketServer({port: 8887});
wss.on('connection', function(ws){
	console.log('connection....')
	connections.push(ws);
});

EyeTribe.start(connections);

Cylon.robot({
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
}).start();

