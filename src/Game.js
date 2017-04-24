PolySlide.States.Game = ds.class({

	constructor: function(game) {
		//Background
		this.background = null;

		//Groups
		this.enemy_group = null;
		this.item_group = null;

		//Entities
		this.entity_speed = 12;
		this.player = null;

		//Score
		this.score = 0;

		//Overlay UI
		this.overlayUI = new PolySwipe.OverlayUI();

		//Pause menu
		this.paused_state = false;
		this.pauseUI = new PolySwipe.PauseUI();

		//Gameover menu
		this.gameover_state = false;
		this.gameoverUI = new PolySwipe.GameoverUI();

		//Timer
		this.game_timer = null;
		this.entity_spawn_loop = null;
		this.score_timer_loop = null;
	},

	enemy_information: {
		pentagon: {
			texture_name: "enemy_pentagon",
			rotation_speed: 1
		},

		hexagon: {
			texture_name: "enemy_hexagon",
			rotation_speed: 2
		},

		heptagon: {
			texture_name: "enemy_heptagon",
			rotation_speed: 3
		},

		octagon: {
			texture_name: "enemy_octagon",
			rotation_speed: 3
		},

		circle: {
			texture_name: "enemy_circle",
			rotation_speed: 0
		}
	},

	create: function() {
		//Background
		this.game.stage.backgroundColor = "#242424";
		this.background = this.game.add.tileSprite(0, 0, this.world.width * 3, this.world.height * 3, "background");
		this.background.scale.set(window.devicePixelRatio / 3, window.devicePixelRatio / 3);

		//Group
		this.enemy_group = this.game.add.group();
		this.item_group = this.game.add.group();

		//UI
		this.overlayUI.show(this);

		//System
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Entities
		this.player = new PolySwipe.Entities.Player(this.game, this.game.world.centerX, this.game.world.height / 16 * 15);
		this.player.fadeIn(350);
		this.player.initializePhysics();

		//Timer
		this.game_timer = this.game.time.create(false);

		this.entity_spawn_loop = this.game_timer.loop(580, (function () {
			if (this.game.rnd.frac() * 100 < 3) { //Zu x% spawnt irgendein Item
				this.spawn_item();
				return;
			}

			this.spawn_enemy();
		}).bind(this), this);

		this.score_loop = this.game_timer.loop(500, (function () {
			this.score++;
			this.overlayUI.setScoreText(this.score);

			if (this.score % 21 == 0) {
				this.entity_speed++;
			}

			if (this.score % 20 == 0) {
				this.entity_spawn_loop.delay -= 10;
			}
		}).bind(this));
		
		this.game_timer.start();
	},

	update: function() {
		if (this.paused_state || this.gameover_state) return;

		//enemy_group
		this.enemy_group.forEach((function (enemy) {
			if (PolySwipe.Items.Watch.enabled) {
				enemy.y += this.entity_speed / 2;
				enemy.angle += enemy.rotation_speed / 2;
			} else {
				enemy.y += this.entity_speed;
				enemy.angle += enemy.rotation_speed;
			}


			this.game.physics.arcade.collide(this.player.sprite, enemy, this.player_collision_handler, null, this);

			if (enemy.y > this.world.height + enemy.height / 2) {
				enemy.destroy();
			}
		}).bind(this));

		//item_group
		this.item_group.forEach((function (item) {
			if (PolySwipe.Items.Watch.enabled) {
				item.y += this.entity_speed / 2;
			} else {
				item.y += this.entity_speed;
			}

			this.game.physics.arcade.collide(this.player.sprite, item, this.item_collision_handler, null, this);
		
			if (item.y > this.world.height + item.height / 2) {
				item.destroy();
			}
		}).bind(this));

		//Player
		var input = this.game.input
		var pointer = input.activePointer;
		if (input.activePointer.isDown && this.overlayUI.pause_button.frame != 1) {
			if (pointer.x < this.world.width / 2) {
				this.player.moveLeft(this.player.speed);
			} else {
				this.player.moveRight(this.player.speed);
			}

			var left_border = this.player.sprite.width / 2;
			var right_border = this.world.width - left_border;

			if (this.player.sprite.x < left_border) {
				this.player.sprite.x = left_border;
			}

			if (this.player.sprite.x > right_border) {
				this.player.sprite.x = right_border;
			}

			this.player.shield_sprite.x = this.player.sprite.x;
		}
	},

	pause_game: function() {
		if (this.gameover_state || this.paused_state) return; //You can't pause when you're gameover
		
		//State
		this.paused_state = true;

		//Timer
		this.game_timer.pause();

		//Show UI
		this.pauseUI.show(this);
	},

	unpause_game: function() {
		//State
		this.paused_state = false;

		//Timer
		this.game_timer.resume();

		//Destroy UI
		this.pauseUI.destroy();
	},

	//Gameover
	gameover: function() {
		//State
		this.gameover_state = true;

		//Timer
		this.game_timer.pause();

		//destroy any entities
		this.player.destroy();
		this.enemy_group.destroy();
		this.item_group.destroy();

		//Gameover UI
		this.gameoverUI.show(this);
	},

	spawn_enemy: function() {
		var enemy_type;

		if (this.score >= 0 && this.score <= 100) {
			enemy_type = "pentagon";
		}

		if (this.score > 100 && this.score <= 200) {
			enemy_type = "hexagon";
		}

		if (this.score > 200 && this.score <= 350) {
			enemy_type = "heptagon";
		}

		if (this.score > 350 && this.score <= 500) {
			enemy_type = "octagon";
		}

		if (this.score > 500) {
			enemy_type = "circle";
		}

		var enemy_information = this.enemy_information[enemy_type];
		var enemy = this.game.add.sprite(this.game.rnd.frac() * this.world.width, -5, enemy_information.texture_name);
		enemy.scale.setTo(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
		enemy.anchor.set(0.5, 0.5);
		enemy.rotation_speed = (this.game.rnd.frac() > 0.5 ? enemy_information.rotation_speed : -enemy_information.rotation_speed);
		this.enemy_group.add(enemy);
		this.game.physics.arcade.enable(enemy);
	},

	spawn_item: function() {
		var randomInt = this.game.rnd.integerInRange(1, 100)
		for (var item_name in PolySwipe.Items) {
			var item = PolySwipe.Items[item_name];

			if (randomInt >= item.min_rnd && randomInt <= item.max_rnd) {
				var item_sprite = item.spawn(this.game, this.game.rnd.frac() * this.world.width, 0);
				this.game.physics.arcade.enable(item_sprite);
				this.item_group.add(item_sprite);
			}
		}
	},

	//Player hit
	player_collision_handler: function(player_sprite, enemy_sprite) {
		if (this.player.hasShield()) {
			enemy_sprite.destroy();
			PolySwipe.Items.Shield.stop(this);
		} else {
			this.gameover();
		}
	},

	//Item collect
	item_collision_handler: function(player_sprite, item_sprite) {
		var item = PolySwipe.Items[item_sprite.name];
		item.start(this);
		item_sprite.destroy();
	},

	dispose: function() {
		this.background.destroy();

		this.enemy_group.destroy();
		this.item_group.destroy();

		//Entities
		this.entity_speed = 10;
		this.player.destroy();

		//Score
		this.score = 0;

		//Overlay UI
		this.overlayUI.destroy();

		//Pause menu
		if (this.paused_state) {
			this.pauseUI.destroy();
		}
		this.paused_state = false;

		//Gameover menu
		if (this.gameover_state) {
			this.gameoverUI.destroy();
		}
		this.gameover_state = false;

		//Spawn Timer
		this.game_timer.removeAll();
		this.game_timer.stop();

		//Items
		for (item_name in PolySwipe.Items) {
			var item = PolySwipe.Items[item_name];
			if (item.enabled) {
				item.stop(this);
			}
		}
	},

	restart_game: function() {
		this.dispose();
		this.state.start("Game");
	},

	quit_game: function() {
		this.dispose();
		this.state.start("MainMenu");
	}

});
