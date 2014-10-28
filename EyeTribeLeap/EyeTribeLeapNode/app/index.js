var WebSocketServer = require('../node_modules/ws').Server,
  pf = require('../node_modules/policyfile').createServer(),
  EyeTribe = require('./eyetribe.js'),
  LeapMotion = require('./leapmotion.js'),
  EyeTribe = require('./eyetribe.js'),
  UnityEmitter = require('./dataEmitter/unityEmitter.js'),
  LeapDataHandler = require('./dataHandler/leapDataHandler.js'),
  EyeTribeDataHandler = require('./dataHandler/eyeTribeDataHandler.js');


// Stock the connections in here
var connections = [];

// Start Policy file
pf.listen();

// Start WEb Socket Server
wss = new WebSocketServer({port: 8887});
wss.on('connection', function(ws){
	console.log('connection....');
});


var emitter = new UnityEmitter(wss);

//EyeTribe(new EyeTribeDataHandler(emitter)).start();
LeapMotion(new LeapDataHandler(emitter)).start();

