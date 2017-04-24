PolySlide.Items.Shield = ds.static.class({
	
	enabled: false,
	name: "Shield",
	texture_name: "item_shield",

	min_rnd: 1,
	max_rnd: 50,

	spawn: function(game, x, y) {
		var sprite = game.add.sprite(x, y, this.texture_name);
		sprite.name = this.name
		sprite.anchor.set(0.5, 0.5);
		sprite.scale.setTo(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		return sprite;
	},

	start: function(instance) {
		this.enabled = true;

		instance.player.enableShield();
	},

	stop: function(instance) {
		this.enabled = false;

		instance.player.disableShield();
	}

});
