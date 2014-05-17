// for more details see: http://emberjs.com/guides/controllers/
function _simulate(controller, time, program) {
	var pc = parseInt(controller.get('pc'));
	window.editor_true.gotoLine(pc+1);
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
	init: function() {
		this.send('newCode');
	},

	_init_registers: function() {
		var registers = Em.A([]);
		for (var i = 0; i < 32; i++) {
			registers.pushObject(Em.Object.create({id: i, value: 0}));
		}
		this.set('registers', registers);
	},

	_init_memory: function() {
		this.set('memory', Em.A([]));
	},

	memory_array: function() {
		var arr = Em.A([]);
		console.log('::: calculate_item_idx');
		this.get('memory').forEach(function(itm, idx) {
			arr.pushObject({id: idx, value: itm});
		});
		return arr;
	}.property('memory_changed'),

	actions: {
		newCode: function() {
			// Create & Initialize Registers
			this.send('_init_registers');

			// Create & Initialize Memory
			this.send('_init_memory');
			

			// Create Assembly Code
			this.set('assmebly', Em.A([]));

			this.set('zflag', false);
			this.set('pc', 0);
			this.set('last_key');
			if(this.get('clk') == undefined) {
				this.set('clk', 10);
			}
			this.set('stall', 0);

			this.set('break', false);
			this.set('running', false);
		},

		simulate: function() {
			// Create & Initialize Registers
			this.send('_init_registers');

			// Create & Initialize Memory
			this.send('_init_memory');

			var controller = this;
			window.controller = controller;
			this.set('pc', 0);
			this.set('running', true);
			this.set('break', false);

			var time = (1/parseInt(this.get('clk')))*1000; 
			var program = _process_macros(window.editor.getValue());
			_simulate(controller, time, program);
		},

		assemble: function() {
			var controller = this;
			controller.set('assembly', Em.A([]));
			var labels = Em.Object.create();
			var cnt = 0;
			var program = _process_macros(window.editor.getValue());
			window.editor_true.getSession().setValue(program.join('\n'));
			program.forEach(function(line) {
				if(/^(\w+)\:/i.test(line)) {
					var temp = /^(\w+)\:/i.exec(line);
					labels.set(temp[1], cnt);
				}
				cnt++;
			});
			controller.set('labels', labels);
			window.labels = labels;
			program.forEach(function(line) {
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
