PolySlide.States.MainMenu = ds.class({
	
	constructor: function (game) {
		//Background
		this.background = null;

		//Text
		this.header = null;

		//Buttons
		this.play_button = null;
		this.mute_button = null;
		this.twitter_button = null;
	},

	create: function() {
		//Background
		this.game.stage.backgroundColor = "#242424";
		this.background = this.game.add.tileSprite(0, 0, this.world.width * 3, this.world.height * 3, "background");
		this.background.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);

		//Header
		this.header = this.game.add.sprite(this.world.centerX, this.world.height / 16 * 3, "logo");
		this.header.anchor.set(0.5);
		this.header.scale.set(window.devicePixelRatio / 4.0, window.devicePixelRatio / 4.0);
		this.header.alpha = 0;
		this.game.add.tween(this.header).to({ alpha: 1 }, 650, "Linear", true);

		//play_button
		this.play_button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, "play_button", this.startGame, this, 0, 0, 1);
		this.play_button.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.play_button.anchor.set(0.5);
		this.play_button.alpha = 0;
		this.game.add.tween(this.play_button).to({ alpha: 1 }, 650, "Linear", true);

		//mute_button
		this.mute_button = this.game.add.button(this.world.width / 32 * 11, this.world.height / 4 * 3, "mute_button", this.muteGame, this, 0, 0, 1);
		this.mute_button.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.mute_button.anchor.set(0.5);
		this.mute_button.alpha = 0;
		this.game.add.tween(this.mute_button).to({ alpha: 1 }, 650, "Linear", true);

		//twitter_button
		this.twitter_button = this.game.add.button(this.world.width / 32 * 21, this.world.height / 4 * 3, "twitter_button", this.openTwitter, this, 0, 0, 1);
		this.twitter_button.scale.set(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
		this.twitter_button.anchor.set(0.5);
		this.twitter_button.alpha = 0;
		this.game.add.tween(this.twitter_button).to({ alpha: 1 }, 650, "Linear", true);
	},

	update: function() {
		
	},

	muteGame: function() {
		this.mute_button.destroy();
		this.mute_button = this.game.add.button(this.world.width / 32 * 11, this.world.height / 4 * 3, "sound_button", this.unmuteGame, this, 0, 0, 1);
		this.mute_button.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.mute_button.anchor.set(0.5);
	},

	unmuteGame: function() {
		this.mute_button.destroy();
		this.mute_button = this.game.add.button(this.world.width / 32 * 11, this.world.height / 4 * 3, "mute_button", this.muteGame, this, 0, 0, 1);
		this.mute_button.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		this.mute_button.anchor.set(0.5);
	},

	openTwitter: function() {
		window.open("http://twitter.com/KncwEU", "_system");
	},

	startGame: function() {
		//Header
		this.header.destroy();

		//Buttons
		this.play_button.destroy();
		this.mute_button.destroy();
		this.twitter_button.destroy();

		//Start
		this.state.start("Game");
	}

});
