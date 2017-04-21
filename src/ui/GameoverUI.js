PolySwipe.GameoverUI = ds.class({

	constructor: function() {
		this.gameover_text = null;
		this.restart_button = null;
		this.menu_button = null;
	},

	show: function(instance) {
		this.gameover_text = instance.game.add.text(instance.world.centerX, instance.world.height / 16 * 4, "Game Over", { 
            font: "164px uni_sans_heavy",
            fill: "#ecf0f1"
        });
        this.gameover_text.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
        this.gameover_text.anchor.set(0.5);
        this.gameover_text.alpha = 0;
        instance.game.add.tween(this.gameover_text).to({ alpha: 1 }, 500, "Linear", true);

        //Resume Button
        this.restart_button = instance.game.add.button(instance.world.centerX, this.gameover_text.y + this.gameover_text.height + 84, "replay_button", instance.restart_game, instance, 0, 0, 1);
        this.restart_button.scale.set(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
        this.restart_button.anchor.set(0.5);
        this.restart_button.alpha = 0;
        instance.game.add.tween(this.restart_button).to({ alpha: 1 }, 500, "Linear", true);

        //Home Button
        this.menu_button = instance.game.add.button(instance.world.centerX, this.restart_button.y + this.restart_button.height + 28, "home_button", instance.quit_game, instance, 0, 0, 1)
        this.menu_button.scale.set(window.devicePixelRatio / 6, window.devicePixelRatio / 6);
        this.menu_button.anchor.set(0.5);
        this.menu_button.alpha = 0;
        instance.game.add.tween(this.menu_button).to({ alpha: 1 }, 500, "Linear", true);
	},

	destroy: function() {
		this.gameover_text.destroy();
		this.restart_button.destroy();
		this.menu_button.destroy();
	}

});