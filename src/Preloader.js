PolySwipe.States.Preloader = ds.class({

	constructor: function(game) {
		this.kncw_logo = null;
		this.start_time = null;
	},

	preload: function() {
		this.game.stage.backgroundColor = "#242424";

		//Kncw Logo
		this.kncw_logo = this.add.sprite(this.world.centerX, this.world.centerY, "kncw_logo");
		this.kncw_logo.scale.setTo(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.kncw_logo.anchor.setTo(0.5);
		this.game.add.tween(this.kncw_logo).to({ alpha: 1 }, 750, "Linear", true);
		this.start_time = Date.now();

		//Background
		this.game.load.image("background", "assets/background.png");

		//Logo
		this.game.load.image("logo", "assets/logo.png");

		//Items
		[
			"item_meteor",
			"item_watch",
			"item_shield"
		].forEach(function(item_name) {
			this.game.load.image(item_name, "assets/items/" + item_name + ".png");
		});

		//Entities
		[
			"player",
			"player_shield",
			"enemy_pentagon",
			"enemy_hexagon",
			"enemy_heptagon",
			"enemy_octagon",
			"enemy_circle"
		].forEach(function(enemy_name) {
			this.game.load.image(enemy_name, "assets/entities/" + enemy_name + ".png");
		});

		//Buttons
		this.game.load.spritesheet("play_button", "assets/buttons/play_button.png", 512, 512, 2);
		this.game.load.spritesheet("pause_button", "assets/buttons/pause_button.png", 512, 512, 2)
		this.game.load.spritesheet("mute_button", "assets/buttons/mute_button.png", 256, 256, 2);
		this.game.load.spritesheet("sound_button", "assets/buttons/sound_button.png", 256, 256, 2);
		this.game.load.spritesheet("twitter_button", "assets/buttons/twitter_button.png", 512, 512, 2)
		this.game.load.spritesheet("home_button", "assets/buttons/home_button.png", 512, 512, 2);
		this.game.load.spritesheet("replay_button", "assets/buttons/replay_button.png", 512, 512, 2);
	},

	create: function() {

	},

	update: function() {
		if (this.load.hasLoaded) {
			//if (Date.now() - this.start_time > 6000) {
				this.openMainMenu();
			//}
		}
	},

	openMainMenu: function() {
		this.state.start("MainMenu");
	}

});
