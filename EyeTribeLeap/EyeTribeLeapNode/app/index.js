var WebSocketServer = require('../node_modules/ws').Server,
WebSocket = require('../node_modules/ws'),
Cylon = require('../node_modules/cylon'),
pf = require('../node_modules/policyfile').createServer(),
EyeTribe = require('./eyetribe.js');


//stock the connections in here
var connections = [];

pf.listen();
wss = new WebSocketServer({port: 8887});
wss.on('connection', function(ws){
	console.log('connection....')
	connections.push(ws);
});

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

//EyeTribe
//var ws = new WebSocket('ws://localhost:6555');
//ws.on('open', function(e) {console.log('lol');})
//ws.on('message', function(e) {
//
//	//   category: '...',
//	//   request: '...',
//	//   statuscode: ...,
//	//   values: { ... }
//	// } 
//	console.log(JSON.parse(e.data));
//});
