PolySwipe.OverlayUI = ds.class({

	constructor: function() {
		this.score_text = null;
		this.pause_button = null;
	},

	show: function(instance) {
		//score_text
        this.score_text = instance.game.add.text(16, 16, "00000", { 
            font: "94px uni_sans_heavy",
            fill: "#e74c3c"
        });
        this.score_text.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
        this.score_text.anchor.set(0.0, 0.0);
        this.score_text.alpha = 0;
        instance.game.add.tween(this.score_text).to({ alpha: 1 }, 350, "Linear", true);

        //pause_button
        this.pause_button = instance.game.add.button(instance.world.width - 16, 16, "pause_button", instance.pause_game, instance, 0, 0, 1);
        this.pause_button.scale.set(window.devicePixelRatio / 10, window.devicePixelRatio / 10);
        this.pause_button.anchor.set(1.0, 0.0);
        this.pause_button.alpha = 0;
        instance.game.add.tween(this.pause_button).to({ alpha: 1 }, 350, "Linear", true);
	},

	setScoreText: function(score) {
		this.score_text.text = PolySwipeUtil.pad(score, 5);
	},

	destroy: function() {
		this.score_text.destroy();
		this.pause_button.destroy();
	}

});