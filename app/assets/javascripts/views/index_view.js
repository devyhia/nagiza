// for more details see: http://emberjs.com/guides/views/

Nagiza.IndexView = Ember.View.extend({
  templateName: 'index',
  didInsertElement: function () {
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/xcode");
	editor.getSession().setMode("ace/mode/assembly_x86");
  }
});