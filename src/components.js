var options = {
	maxParticles: 150,
	size: 16,
	sizeRandom: 0,
	speed: 5,
	speedRandom: 1.2,
    // Lifespan in frames
    lifeSpan: 29,
    lifeSpanRandom: 7,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 180,
    angleRandom: 34,
    startColour: [255, 131, 0, 1],
    startColourRandom: [48, 50, 45, 0],
    endColour: [245, 35, 0, 0],
    endColourRandom: [60, 60, 60, 0],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 5,
    // How many frames should this last
    duration: -1,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 1 },
    // sensible values are 0-3
    jitter: 0
}

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

Crafty.c('Character', {
	init: function() {
		this.requires('Actor, Collision, Life')
		.collision();
	},
	destory: function() {
		this.destory();
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
	},
	isAlive: function() {
		return this.alive;
	}
});

Crafty.c('Controls', {
	init: function() {
		this.requires('Multiway')
		.multiway( 5, { A: 180, D: 0 })
		.enableControl();
		this.bind('KeyDown', function(e) {
			if( e.key === 32 ) {
				Crafty.e('Plasma').create( this.x, this.y  - 10, 3);
			}
		});
	}
});

Crafty.c('Plasma', {
	init: function() {
		this.requires('Collision');
		this.bind('EnterFrame', function(dt) {
			this.y -= dt.dt / 8
		});
		this.onHit('Solid', function(hit) {
			this.destroy();
			hit[0].obj.takeDamage(10);
			console.log(hit[0].obj.getLife());
			// hit[0].takeDamage(10);
		});
	},
	create: function(x, y, speed) {
		this.addComponent( 'Actor, Collision, Solid, spr_plasma' )
		this.attr({
			x: x,
			y: y,
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},
	destory: function() {
		this.destroy();
	}
});

Crafty.c('Player', {
	init: function() {
		this.requires('Character, spr_player, Controls');
		var pcParticles = Crafty.e("Actor, 2D,Canvas,Particles").particles(options);
		this.bind('EnterFrame', function(dt) {
			pcParticles.x = this.x;
			pcParticles.y = this.y + 16;
		});

	},
});

Crafty.c('Enemy', {
	init: function() {
		this.requires('Character, spr_target, Solid');
		console.log(this.getLife());
		this.bind('EnterFrame', function() {
			if(!this.isAlive()) {
				this.destroy();
			}
		});
	},
});