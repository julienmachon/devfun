var WebSocketServer = require('../node_modules/ws').Server,
  pf = require('../node_modules/policyfile').createServer(),
  EyeTribe = require('./eyetribe.js'),
  LeapMotion = require('./leapmotion.js'),
  uEmitter = require('./dataEmitter/unityEmitter.js');


// Stock the connections in here
var connections = [];
var emitter = new uEmitter(connections);

// Start Policy file
pf.listen();

// Start WEb Socket Server
wss = new WebSocketServer({port: 8887});
wss.on('connection', function(ws){
	console.log('connection....')
	connections.push(ws);
});

EyeTribe.start(connections);
LeapMotion.start('new LeapDataHandler()', 'new UnityEmitter(connections)');

