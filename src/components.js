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

	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}
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
		this.requires('Actor, Box2D, spr_wall')
		.box2d({ bodyType: 'dynamic'});
	},
});

Crafty.c('Floor', {
	init: function() {
		this.requires('Actor, Box2D, spr_floor')
		.box2d({ bodyType: 'dynamic' });
	},
});

Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Box2D, Life, Twoway, spr_player, Text, DOM')
		.text(this.getLife())
		.css({ "text-align": "center" })
		.twoway(2)
		.box2d({ bodyType: 'dynamic' })
		// .onHit('Solid', this.stopOnSolid)
		// .onHit('Target', this.targetObtained);
	},

	stopOnSolid: function(data) {
		box = data[0].obj;
		if(box.x > this.x) {
			this._speed = 0;
			if(this._movement) {
				this.x -= this._movement.x;
			}
		}
		if(box.x < this.x) {
			this._speed = 0;
			if(this._movement) {
				this.x -= this._movement.x;
			}
		}
		if(this.y == box.y + 1) {
			this._speed = 0;
			if(this._movement) {
				this.y += this._movement.y;
			}
		}
		if (this.y == box.y - 1) {
			this._speed = 0;
			if(this._movement) {
				this.y -= this._movement.y;
			}
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
		.animate('1', 24,-1);
	},

	obtain: function() {
		this.destroy();
		Crafty.trigger('TargetObtained', this);
	}
});
