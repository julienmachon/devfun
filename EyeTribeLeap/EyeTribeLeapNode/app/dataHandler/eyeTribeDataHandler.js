var util = require('util');
var dl = require('./dataHandler.js');

/**
 * 
 * @constructor
 */

function EyeTribeDataHandler(emitter) {
	EyeTribeDataHandler.super_.call(this);
	this.state = {};
	this.emitter = emitter;
};
util.inherits(EyeTribeDataHandler, dl);


EyeTribeDataHandler.prototype.process = function process(data) {
	if((data.lefteye.avg.x === 0 || data.righteye.avg.y ===0) && !(data.lefteye.avg.x === 0 && data.righteye.avg.y ===0)) {
		if(!this.state.wink) {
			console.log('Wink');
			this.state.wink = true;
			this.emitter.send('{"command": "wink", "state":"true"}');
		}
		//for(c in connections) {                                             //else
		//	connections[c].send('{"command": "wink", "state":"true"}');//console.log(data.lefteye.avg.x+'\t\t'+data.righteye.avg.y);
		//}
	}else{
		if(this.state.wink) {
			console.log('Stop Wink');
			this.state.wink = false;
			this.emitter.send('{"command": "wink", "state":"false"}');
		}
		//for(c in connections) {                                             //else
		//	connections[c].send('{"command": "wink", "state":"false"}');//console.log(data.lefteye.avg.x+'\t\t'+data.righteye.avg.y);
		//}
	}
};


module.exports = EyeTribeDataHandler;
