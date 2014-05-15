// for more details see: http://emberjs.com/guides/controllers/
function _simulate(controller, time, program) {
	var pc = parseInt(controller.get('pc'));
	window.editor.gotoLine(pc+1);
	execute(controller, program[pc]);
	var stall = parseInt(controller.get('stall'));
	if(pc < program.length && !controller.get('break')) {
		setTimeout(function(){
			controller.set('stall', 0);
			_simulate(controller, time, program);
		}, stall ? stall : time);
	} else controller.set('running', false);
}

Nagiza.IndexController = Ember.Controller.extend({
	actions: {
		newCode: function() {
			// Create & Initialize Registers
			console.log('newCode');
			var registers = Em.A([]);
			for (var i = 0; i < 32; i++) {
				registers.pushObject(Em.Object.create({id: i, value: 0}));
			}

			console.log(registers);

			this.set('registers', registers);

			// Create & Initialize Memory
			this.set('memory', Em.Object.create());

			// Create Assembly Code
			this.set('assmebly', Em.A([]));

			this.set('zflag', false);
			this.set('pc', 0);
			this.set('last_key');
			this.set('clk', 10);
			this.set('stall', 0);

			this.set('break', false);
			this.set('running', false);
		},

		simulate: function() {
			var controller = this;
			
			this.set('pc', 0);
			this.set('running', true);
			this.set('break', false);

			var time = (1/parseInt(this.get('clk')))*1000; 
			var program = window.editor.getValue().split('\n');
			_simulate(controller, time, program);
		},

		assemble: function() {
			var controller = this;
			controller.set('assembly', Em.A([]));
			var labels = Em.Object.create();
			var cnt = 0;
			window.editor.getValue().split('\n').forEach(function(line) {
				if(/^(\w+)\:/i.test(line)) {
					var temp = /^(\w+)\:/i.exec(line);
					labels.set(temp[1], cnt);
				}
				cnt++;
			});
			controller.set('labels', labels);
			window.labels = labels;
			console.log(controller.get('labels'));
			window.editor.getValue().split('\n').forEach(function(line) {
				assemble(controller, line);
			});
		},

		storeKey: function(key) {
			this.set('last_key', key);
		}, 

		breakRunning: function() {
			this.set('break', true);
		}
	}
});
