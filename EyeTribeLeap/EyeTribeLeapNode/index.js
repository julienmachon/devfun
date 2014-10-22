var Cylon = require('cylon');

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
		my.leapmotion.on('gesture', function(payload) {
			console.log(payload.toString());
		});
	}
}).start();
