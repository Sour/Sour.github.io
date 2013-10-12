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
		if(this.live <= 0) {
			this.alive = false;
		}
	}
});


Crafty.c('Wall', {
	init: function() {
		this.requires('Actor, Solid, spr_wall');
	},
});

Crafty.c('Floor', {
	init: function() {
		this.requires('Actor, Solid, spr_floor');
	},
});

Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Life, Twoway, Collision, Gravity, spr_player, Text, DOM')
		.text(this.getLife())
		.css({ "text-align": "center" })
		.twoway(2)
		.gravity('Solid')
		.collision()
		.onHit('Target', this.targetObtained);
	},

	 stopOnSolids: function() {
	 	// this.onHit('Solid', function() {
	 	// 	if(this.x > obj.x) {

	 	// 	}

	 	// 	if(this.x < obj.x) {

	 	// 	}
	 	// });




		this.onHit('Solid', function() {
			this._speed = 0;
			if(this.isDown("LEFT_ARROW"))
				this.x += 2;
			if(this.isDown("RIGHT_ARROW"))
				this.x -= 2;
		});
		return this;
	},

	stopMovement: function() {
		this._speed = 0;


		if(this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},

	targetObtained: function(data) {
		targett = data[0].obj;
		targett.obtain();
		this.takeDamage(15);
		this.text(this.getLife())
	}
});

Crafty.c('Target', {
	init: function() {
		this.requires('Actor, spr_target, SpriteAnimation')
		.animate('1', 0,1,3)
		.animate('1', 12,-1);
	},

	obtain: function() {
		this.destroy();
		Crafty.trigger('TargetObtained', this);
	}
});
