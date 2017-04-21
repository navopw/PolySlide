PolySwipe.Entities.Player = ds.class({

	constructor: function(game, x, y) {
		this.speed = 15;

		//Shield
		this.shield_sprite = game.add.sprite(x, y, "player_shield");
		this.shield_sprite.anchor.set(0.5);
		this.shield_sprite.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.shield_sprite.kill();

		//Sprite
		this.sprite = game.add.sprite(x, y, "player");
		this.sprite.anchor.set(0.5);
		this.sprite.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
	},

	initializePhysics: function() {
		this.sprite.game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
	},

	moveLeft: function(speed) {
		this.sprite.x -= speed;
		this.shield_sprite.x = this.sprite.x;
	},

	moveRight: function(speed) {
		this.sprite.x += speed;
		this.shield_sprite.x = this.sprite.x;
	},

	fadeIn: function(time) {
		this.sprite.alpha = 0;
		this.sprite.game.add.tween(this.sprite).to({ alpha: 1 }, time, "Linear", true);
	},

	//Shield
	enableShield: function() {
		this.shield_sprite.revive();
	},

	disableShield: function() {
		this.shield_sprite.kill();
	},

	hasShield: function() {
		return this.shield_sprite.alive;
	},

	destroy: function() {
		this.sprite.destroy();
		this.shield_sprite.destroy();
	}

});
