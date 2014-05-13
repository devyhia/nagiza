// for more details see: http://emberjs.com/guides/controllers/

Nagiza.IndexController = Ember.Controller.extend({
	actions: {
		newCode: function() {
			// Create & Initialize Registers
			console.log('newCode');
			var registers = [];
			for (var i = 0; i < 32; i++) {
				registers.push({id: i, value: 0});
			}

			console.log(registers);

			this.set('registers', registers);
		}
	}
});
