PolySlide.PauseUI = ds.class({

	constructor: function() {
		this.pause_text = null;
		this.resume_button = null;
		this.restart_button = null;
		this.menu_button = null;
	},

	show: function(instance) {
		this.pause_text = instance.game.add.text(instance.world.centerX, instance.world.height / 16 * 4, "Pause", { 
            font: "164px uni_sans_heavy",
            fill: "#ecf0f1"
        });
        this.pause_text.scale.setTo(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
        this.pause_text.anchor.setTo(0.5);
        this.pause_text.alpha = 0;
        instance.game.add.tween(this.pause_text).to({ alpha: 1 }, 350, "Linear", true);

        //Resume Button
        this.resume_button = instance.game.add.button(instance.world.centerX, this.pause_text.y + this.pause_text.height + 84, "play_button", instance.unpause_game, instance, 0, 0, 1);
        this.resume_button.scale.setTo(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
        this.resume_button.anchor.setTo(0.5);
        this.resume_button.alpha = 0;
        instance.game.add.tween(this.resume_button).to({ alpha: 1 }, 350, "Linear", true);

        //Restart Button
        this.restart_button = instance.game.add.button(instance.world.centerX, this.resume_button.y + this.resume_button.height + 28, "replay_button", instance.restart_game, instance, 0, 0, 1);
        this.restart_button.scale.setTo(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
        this.restart_button.anchor.setTo(0.5);
        this.restart_button.alpha = 0;
        instance.game.add.tween(this.restart_button).to({ alpha: 1 }, 350, "Linear", true);

        //Home Button (Back to menu)
        this.menu_button = instance.game.add.button(instance.world.centerX, this.restart_button.y + this.restart_button.height / 2 + 28, "home_button", instance.quit_game, instance, 0, 0, 1)
        this.menu_button.scale.setTo(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
        this.menu_button.anchor.setTo(0.5, 0);
        this.menu_button.alpha = 0;
        instance.game.add.tween(this.menu_button).to({ alpha: 1 }, 350, "Linear", true);
	},

	destroy: function() {
		this.pause_text.destroy();
		this.resume_button.destroy();
		this.restart_button.destroy();
		this.menu_button.destroy();
	}

});
