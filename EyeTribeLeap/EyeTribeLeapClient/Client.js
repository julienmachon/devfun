/**
 * Simple socket client and event dispatcher
 *
 **/
 
 var Realise = Realise || {};
 
 Realise.eyeTribeDemo = {};
 
 /**
  * DISPATCHER
  *
  **/
 
 Realise.eyeTribeDemo.ClientEventDispatcher = function(){
 	//Where events are going to be stocked
 	this.events = {}
 	
 	//list of custom events
 	var events = ['winkLeft', 'winkRight', 'moveHeadLeft', 'moveHeadRight', 'moveHandLeft', 'moveHandRight'];
 	
 	//Instantiate them
 	for(e in events) {
 		//and push them in public attribute
 		this.events[events[e]] = new Event(events[e]);
 	}
 };
 
 Realise.eyeTribeDemo.ClientEventDispatcher.prototype.do = function(){
 	var self = this;
 	return {
	 	winkLeft: function(){
			PubSub.publish('winkLeft');
	 		document.dispatchEvent(self.events.winkLeft);
	 	},
	 	winkRight: function(){
			PubSub.publish('winkRight');
	 		document.dispatchEvent(self.events.winkRight);
	 	},
	 	moveHeadLeft: function(){
			PubSub.publish('moveHeadLeft');
	 		document.dispatchEvent(self.events.moveHeadLeft);
	 	},
	 	moveHeadRight: function(){
			PubSub.publish('moveHeadRight');
	 		document.dispatchEvent(self.events.moveHeadRight);
	 	},
	 	moveHandLeft: function(){
			PubSub.publish('moveHandLeft');
	 		document.dispatchEvent(self.events.moveHandLeft);
	 	},
	 	moveHandRight: function(){
			PubSub.publish('moveHandRight');
	 		document.dispatchEvent(self.events.moveHandRight);
	 	}
 	}
 };
 
 
/**
 * SOCKET
 *
 **/
 Realise.eyeTribeDemo.Client = function() {
 		var client = new Realise.eyeTribeDemo.ClientEventDispatcher();
		var socket = new WebSocket('ws://localhost:8887/');

		socket.onopen = function() { 
		console.log("Connected...");
		}
		
		socket.onmessage = function(message) {
			var data = {};
			try{
				data = JSON.parse(message.data);
			}
			catch(err) {
				throw 'Data received is not JSON format. ('+err.message+')';
			}
			if(data.command) {
				switch(data.command) {
					case 'winkleft':
						client.do().winkLeft();
						break;
					case 'winkright':
						client.do().winkRight();
						break;
					case 'moveheadleft':
						client.do().moveHeadLeft();
						break;
					case 'moveheadright':
						client.do().moveHeadRight();
						break;
					case 'movehandleft':
						client.do().moveHandLeft();
						break;
					case 'movehandright':
						client.do().moveHandRight();
						break;
					default:
						console.log('confused');
				}
			}
			else{
				console.log('Cannot process received data...')
			}
		}
		
		socket.onclose = function() {}
		
		socket.onerror = function() {}
 }
 
