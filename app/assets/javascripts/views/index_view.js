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
	var controller = this.get('controller');

	// Set up the editor
	var langTools = ace.require("ace/ext/language_tools");
    window.editor = ace.edit("editor");
	window.editor.setTheme("ace/theme/xcode");
	window.editor.getSession().setMode("ace/mode/nagiza");
	window.editor.setOptions({
	  	enableBasicAutocompletion: true
	});

      var editor_true = ace.edit("editor-true");
      editor_true.setTheme("ace/theme/xcode");
      editor_true.getSession().setMode("ace/mode/nagiza");
      window.editor_true = editor_true;

	langTools.addCompleter({
		getCompletions: function(editor, session, pos, prefix, callback) {
            var lst_macros = [
            	{name: "@center", value: "@center", score: 0, meta: "1"},
            	{name: "@up", value: "@up", score: 0, meta: "2"},
            	{name: "@down", value: "@down", score: 0, meta: "4"},
            	{name: "@right", value: "@right", score: 0, meta: "3"},
            	{name: "@left", value: "@left", score: 0, meta: "5"},

            	{name: "@up_head", value: "@up_head", score: 0, meta: "1"},
            	{name: "@down_head", value: "@down_head", score: 0, meta: "2"},
            	{name: "@right_head", value: "@right_head", score: 0, meta: "3"},
            	{name: "@left_head", value: "@left_head", score: 0, meta: "4"},

            	{name: "@up_body", value: "@up_body", score: 0, meta: "5"},
            	{name: "@down_body", value: "@down_body", score: 0, meta: "6"},
            	{name: "@right_body", value: "@right_body", score: 0, meta: "7"},
            	{name: "@left_body", value: "@left_body", score: 0, meta: "8"},

            	{name: "@apple", value: "@apple", score: 0, meta: "9"},

            	{name: "@black", value: "@black", score: 0, meta: "0"},
            	{name: "@blue", value: "@blue", score: 0, meta: "1"},
            	{name: "@green", value: "@green", score: 0, meta: "2"},
            	{name: "@cyan", value: "@cyan", score: 0, meta: "3"},
            	{name: "@red", value: "@red", score: 0, meta: "4"},
            	{name: "@pink", value: "@pink", score: 0, meta: "5"},
            	{name: "@yellow", value: "@yellow", score: 0, meta: "6"},
            	{name: "@white", value: "@white", score: 0, meta: "7"},

            	{name: "add", value: "add", score: 0, meta: "ADD $rd, $rs, $rt(sh)"},
            	{name: "addi", value: "addi", score: 0, meta: "ADDI $rt, $rs, imm"},
            	{name: "sub", value: "sub", score: 0, meta: "SUB $rd, $rs, $rt(sh)"},
            	{name: "and", value: "and", score: 0, meta: "AND $rd, $rs, $rt(sh)"},
            	{name: "andi", value: "andi", score: 0, meta: "ANDI $rt, $rs, imm"},
            	{name: "or", value: "or", score: 0, meta: "OR $rd, $rs, $rt(sh)"},
            	{name: "ori", value: "ori", score: 0, meta: "ORI $rt, $rs, imm"},
            	{name: "xor", value: "xor", score: 0, meta: "XOR $rd, $rs, $rt(sh)"},
            	{name: "xori", value: "xori", score: 0, meta: "XORI $rt, $rs, imm"},
            	{name: "neg", value: "neg", score: 0, meta: "NEG $rd, $rs"},
            	{name: "rnd", value: "rnd", score: 0, meta: "RND $rd, $rs"},

            	{name: "ldk", value: "ldk", score: 0, meta: "LDK $rt"},
            	{name: "lw", value: "lw", score: 0, meta: "LW $rt, $rs, imm"},
            	{name: "sw", value: "sw", score: 0, meta: "SW $rt, $rs, imm"},
            	{name: "ceq", value: "ceq", score: 0, meta: "CEQ $rs, $rt"},
            	{name: "clt", value: "clt", score: 0, meta: "CLT $rs, $rt"},
            	{name: "bt", value: "bt", score: 0, meta: "BT :label"},
            	{name: "bf", value: "bf", score: 0, meta: "BF :label"},
            	{name: "bof", value: "bof", score: 0, meta: "BOF :label"},
            	{name: "btl", value: "btl", score: 0, meta: "BTL $rt, :label"},
                  {name: "brl", value: "brl", score: 0, meta: "BRL :label"},
            	{name: "bofl", value: "bofl", score: 0, meta: "BOFL $rt, :label"},
            	{name: "bcd", value: "bcd", score: 0, meta: "BCD $rs, imm"},
            	{name: "jr", value: "jr", score: 0, meta: "JR $rs"},
            	{name: "graphcall", value: "stall", score: 0, meta: "calls the GPU to draw"},
            	{name: "exit", value: "bcd", score: 0, meta: "Terminate the program"},

                  {name: "li", value: "li", score: 0, meta: "LI $rt, imm"},
                  {name: "point", value: "point", score: 0, meta: "POINT $x0, $y0, color_imm"}
            ];

            callback(null, lst_macros);
        }
	});

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