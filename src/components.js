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

Crafty.c('Controls', {
	init: function() {
		this.requires('Multiway')
		.multiway( 3, { A: 180, D: 0 })
		.enableControl();
		this.bind('EventFrame', function() {
			this.bind('KeyDown', function(e) {
				if( e.key === 32 ) {
					Crafty.e('Plasma').create( this.x, this.y  - 10 );
				}
			});
		});
	}
});

Crafty.c('Character', {
	init: function() {
		this.requires('Actor, Collision')
		.collision();
	},
	destory: function() {
		this.destory();
	}
});

Crafty.c('Plasma', {
	init: function() {
		this.requires('Actor, Collision, Solid, spr_plasma');
	},
	create: function(x, y, speed) {
		this.attr({
			x: x,
			y: y,
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
		this.collision();
		this.bind('EnterFrame', function(dt) {
			this.y -= dt.dt / 8
			console.log(this.y);
		});
		return this;
	},
});

Crafty.c('Wall', {
	init: function() {
		this.requires('Actor, Solid, spr_wall');
	},
});

Crafty.c('Floor', {
	init: function() {
		this.requires('Actor, Solid, spr_floor')
		.collision();
	},

});

Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Character, spr_player, Controls');

	},
});