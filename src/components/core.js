Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},

	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}
});

Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});

Crafty.c('Wall', {
	init: function() {
		this.requires('Actor, Collision')
		.collision();
	},
});

Crafty.c('ItemDrop', {
	init: function() {
		this.list = [
			['Life', 		.10],
			['Shield', 		.10],
			['CoinSmall' , 	.10],
			['CoinMedium',	.05],
			['CoinLarge',	.02],
			['Ammo', 		.10],
			['Nothing', 	.53]
			];

		this.weighed_list = [];

		for(var i = 0; i < this.list.length; i++) {
			var number = this.list[i][1] * 100;
			for (var it = 0; it < number; it++) {
				this.weighed_list.push(this.list[i][0]);
			}
		}

	},
	dropItem: function() {
		if( this.y < 350 ) {
			var rand = Math.floor(Math.random() * 100)
			console.log(this.weighed_list[rand]);
			switch(this.weighed_list[rand]) {
				case 'Life':
					Crafty.e('LifeOrb').create(this.x, this.y);
					break;
				case 'Shield':
					Crafty.e('ShieldOrb').create(this.x, this.y);
					break;
				case 'CoinSmall':
					Crafty.e('SmallCoin').create(this.x, this.y);
					break;
				case 'CoinMedium':
					Crafty.e('MediumCoin').create(this.x, this.y);
					break;
				case 'CoinLarge':
					Crafty.e('LargeCoin').create(this.x, this.y);
					break;
				case 'Ammo':
					Crafty.e('AmmoOrb').create(this.x, this.y);
					break;
				default:
					break;
			}
		}
	},
})

Crafty.c('Life', {
	init: function() {
		this.life = 100;
		this.alive = true;
	},
	getLife: function() {
		return this.life;
	},
	takeDamage: function(damage) {
		this.life -= damage;
		if(this.life <= 0) {
			this.alive = false;
		}
		if(this.life > 100) {
			this.life = 100;
		}
	},
	isAlive: function() {
		return this.alive;
	}
});

Crafty.c('Shield', {
	init: function() {
		this.shield = true;
		this.bind('EventFrame', function(dt) {
			if(this.shield) {
				this.sprite = spr_player_single_shield;
			}
		});
	},
	hasShield: function() {
		return this.shield;
	},
	updateShield: function() {
		this.shield = true;
	},
	removeShield: function() {
		this.shield = false;
	},

});

Crafty.c('Ammo', {
	init: function() {
		this.ammo = 100;
	},
	updateAmmo: function(ammo) {
		this.ammo += ammo;
	},
	getAmmo: function() {
		return this.ammo;
	},
});

Crafty.c('Score', {
	init: function() {
		this.score = 0;
	},
	updateScore: function(score) {
		this.score += score;
	},
	getScore: function() {
		return this.score;
	},
});

Crafty.c('Controls', {
	init: function() {
		this.requires('Multiway')
		.multiway( 8, { A: 180, D: 0, LEFT_ARROW:180, RIGHT_ARROW:0 })
		.enableControl();
		this.bind('KeyDown', function(e) {
			if( e.key === 32 ) {
				if(!this.__c.PlayerSingle) {
					Crafty.e('Plasma').create( this.x, this.y - 16, 3, this);
					Crafty.e('Plasma').create( this.x + 32, this.y - 16, 3, this);
				} else {
					Crafty.e('Plasma').create( this.x + 16, this.y - 16, 3, this);
				}
			}
		});
	}
});