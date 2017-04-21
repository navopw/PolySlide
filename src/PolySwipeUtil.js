var PolySwipeUtil = ds.static.class({

	pad: function(num, size) { 
		return ("000000000" + num).substr(-size); 
	},

	toHex: function(r, g, b) {
		return r << 16 | g << 8 | b;
	}

});
