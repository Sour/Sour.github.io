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
				Crafty.e('Plasma').create( this.x, this.y  - 16, 3, this);
				Crafty.e('Plasma').create( this.x + 32, this.y  - 16, 3, this);
			}
		});
	}
});