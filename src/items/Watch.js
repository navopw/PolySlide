PolySlide.Items.Watch = ds.static.class({
	
	enabled: false,
	time: 10000,
	name: "Watch",
	texture_name: "item_watch",

	min_rnd: 51,
	max_rnd: 100,

	spawn: function(game, x, y) {
		var sprite = game.add.sprite(x, y, this.texture_name);
		sprite.name = this.name
		sprite.anchor.set(0.5, 0.5);
		sprite.scale.setTo(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		return sprite;
	},

	start: function(instance) {
		this.enabled = true;

		instance.entity_spawn_loop.delay *= 2;

		instance.game_timer.add(this.time, (function() {
			this.stop(instance);
		}).bind(this));
	},

	stop: function(instance) {
		this.enabled = false;

		instance.entity_spawn_loop.delay /= 2;
	}

});
