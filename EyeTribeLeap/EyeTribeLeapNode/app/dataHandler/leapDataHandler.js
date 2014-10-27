var util = require('util');
var dl = require('./dataHandler.js');


/**
 * @constructor 
 */

function LeapDataHandler() {
	dl.call(this);
	this.state = {
	//	circle: false,
	//	swipe: false
	};
};
util.inherits(LeapDataHandler, dl);

/**
 * @param {JSON} data - the data to process
 **/
LeapDataHandler.prototype.process = function process(data){
	console.log(data);
};

LeapDataHandler.prototype.processGesture = function processGesture(data) {
	if(data.type && data.state) {
		switch(data.type) {
			case 'circle':
			case 'swipe':
				if(data.state === 'update') {
		                	if(!this.state[data.type]) {
		                		console.log('Doing ' + data.type);
		                		this.state[data.type] = true;
						return true;
		                	}
					return false;
		                }
		                else if(data.state === 'stop') {
		                	if(this.state[data.type]) {
		                		console.log('Stop ' + data.type);
		                		this.state[data.type] = false;
						return true;
		                	}
					return false;
		                }
				break;
			case 'keyTap':
			case 'screenTap':
				console.log('Did ' + data.type);
				return true;
				break;
			default:
				console.log('Not Recognised');
				return false;
		}
	}
	
	//Process Circle
	//if(data.type === 'circle') {
	//	if(data.state === 'stop') {
	//		//circle gesture was being performed. Need to send stop command	
	//		if(this.state.circle) {
	//			console.log('Stop circle');
	//			this.state.circle = false;
	//		}
	//	}
	//	if(data.state === 'update') {
	//		//circle gesture is being performed, set to true if not already done
	//		if(!this.state.circle) {
	//			console.log('circling');
	//			this.state.circle = true;
	//		}
	//	}
	//}
	////Process Swipe
	//if(data.type === 'swipe') {
	//	if(data.state === 'stop'){
	//		console.log('Stop swipe');
	//	}
	//	if(data.state === 'update') {
	//		console.log('swiping');
	//	}
	//}

}

module.exports = LeapDataHandler;
