// for more details see: http://emberjs.com/guides/views/
var _key_mappings = {
	"38": 2, // UP
	"40": 4, // DOWN
	"39": 3, // RIGHT
	"37": 5 // LEFT
};
Nagiza.IndexView = Ember.View.extend({
  templateName: 'index',
  didInsertElement: function () {
	window.editor = ace.edit("editor");
	window.editor.setTheme("ace/theme/xcode");
	window.editor.getSession().setMode("ace/mode/assembly_x86");
	var controller = this.get('controller');
	window.editor.getSession().on('change', function(e) {
	   controller.send('assemble');
	});

	$(document).keyup(function(e) {
		if([37,38,39,40].contains(e.keyCode)) {
			controller.send('storeKey', _key_mappings[e.keyCode.toString()]);
		}
	});
  }
});