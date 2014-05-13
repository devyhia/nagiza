function binaryToInt(bin) {
	var num = 0;
	var count = 0;
	var v = 0;
	var MSB = bin[bin.length-1];
	var isNeg = bin[bin.length-1] == '1';
	if(bin.length < 16) {
		var c = '';
		for(var i = 0; i < 16 - bin.length; i++) {
			c += MSB;
		}
		bin = c + bin;
	}

	console.log(bin);

	for (var i = 0; i < 16; i++) {
		v += parseInt(bin[bin.length-i-1])*Math.pow(2, count++);
	}

	return isNeg ? v - Math.pow(2, bin.length) : v;
}