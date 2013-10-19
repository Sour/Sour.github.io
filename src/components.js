var particleThrust = {
	maxParticles: 150,
	size: 5,
	sizeRandom: 0,
	speed: 5,
	speedRandom: 1.2,
    // Lifespan in frames
    lifeSpan: 10,
    lifeSpanRandom: 5,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 180,
    angleRandom: 10,
    startColour: [255, 131, 0, 1],
    startColourRandom: [48, 50, 45, 0],
    endColour: [245, 35, 0, 0],
    endColourRandom: [60, 60, 60, 0],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 0,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 1,
    // How many frames should this last
    duration: -1,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0 },
    // sensible values are 0-3
    jitter: 0
}

var particleDestory = {
	maxParticles: 150,
	size: 5,
	sizeRandom: 0,
	speed: 5,
	speedRandom: 1.2,
    // Lifespan in frames
    lifeSpan: 5,
    lifeSpanRandom: 4,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 0,
    angleRandom: 360,
    startColour: [127, 0, 143, 1],
    startColourRandom: [160, 0, 155, 0],
    endColour: [245, 35, 0, 0],
    endColourRandom: [60, 60, 60, 0],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 10,
    // How many frames should this last
    duration: 10,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0 },
    // sensible values are 0-3
    jitter: 1
}

var particlePlasma = {
	maxParticles: 100,
	size: 2,
	sizeRandom: 0,
	speed: 2,
	speedRandom: 1.2,
    // Lifespan in frames
    lifeSpan: 10,
    lifeSpanRandom: 2,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 0,
    angleRandom: 45,
    startColour: [126, 188, 211, 1],
    startColourRandom: [90, 50, 200, 0],
    endColour: [50, 50, 90, 0],
    endColourRandom: [30, 60, 60, 0],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 5,
    // How many frames should this last
    duration: 5,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0 },
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
});

Crafty.c('Wall', {
	init: function() {
		this.requires('Actor, Collision')
		.collision();
	},
});

Crafty.c('Character', {
	init: function() {
		this.requires('Actor, Collision, Life')
		.collision();
	},
	particleDestroy: function() {
		this.destroy();
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

Crafty.c('LifeOrb', {
	init: function() {
		this.requires('Collision')
		.collision();
		this.bind('EnterFrame', function(dt) {
			this.y += dt.dt / 15;
		});
		this.onHit('Life', function(hit) {
			this.destroy();
			hit[0].obj.takeDamage(-10);
		});
		this.onHit('Wall', function(hit) {
			this.destroy();
		});
	},
	create: function(x, y) {
		this.addComponent( 'Actor, Collision, Solid, spr_life_orb' )
		.name = "health";
		this.attr({
			x: x,
			y: y,
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},
	getName: function() {
		return this.name;
	},
});

Crafty.c('Plasma', {
	init: function() {
		this.requires('Collision');
		this.bind('EnterFrame', function(dt) {
			this.y -= dt.dt / 5
		});
		this.onHit('Life', function(hit) {
			this.destroy();
			hit[0].obj.takeDamage(100);
			if(!hit[0].obj.isAlive()) {
				this.owner.updateScore(100);
			}
		});
		this.onHit('Wall', function(hit) {
			this.destroy();
		});
	},
	create: function(x, y, speed, owner) {
		this.addComponent( 'Actor, Collision, Solid, spr_plasma, WiredHitBox' );
		this.owner = owner;
		this.attr({
			x: x,
			y: y,
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
		Crafty.e('Actor, Particles')
		.particles(particlePlasma)
		.attr({ x:x + 8, y:y + 12 });
	},
});

Crafty.c('Player', {
	init: function() {
		this.requires('Character, spr_player_fixed, Controls, Score, WiredHitBox')
		.crop(0,0,48,32);

		var pcParticles = Crafty.e("Actor, Particles")
		.particles(particleThrust);

		var pcScore = Crafty.e("2D, DOM, Text")
		.attr({ x:0, y:0 })
		.textFont({ size: '20px', weight: 'bold', align: 'center' });

		Crafty.e('2D, DOM, Color')
		.attr({ x: 0, y: (Game.map_grid.height * Game.map_grid.tile.height) - 16, w: (Game.map_grid.width * Game.map_grid.tile.width), h:16 })
		.color('#ff5959');

		var pcLifeBar = Crafty.e('2D, DOM, Color, Text')
		.attr({ x: 0, y: (Game.map_grid.height * Game.map_grid.tile.height) - 16, w: (Game.map_grid.width * Game.map_grid.tile.width), h:16 })
		.color('#63C788')
		.text(this.getLife())
		.css({"font-size":"20px","text-align":"center","display":"inline-block","vertical-align":"middle"})
		.textFont({size:'12px', weight: 'bold'});

		

		this.bind('EnterFrame', function(dt) {
			pcParticles.x = this.x + 21.5;
			pcParticles.y = this.y + 26;

			pcScore.text(this.getScore());

			pcLifeBar.attr({ x: 0, y: (Game.map_grid.height * Game.map_grid.tile.height) - 16, w: ((Game.map_grid.width * Game.map_grid.tile.width) * (this.getLife()) / 100), h:16 });
			pcLifeBar.text(this.getLife());

		});
		this.onHit("Solid", function(hit) {
			if(hit[0].obj.getName() == "enemy")
			{
				this.takeDamage(30);
				hit[0].obj.takeDamage(100);
			}
			if(hit[0].obj.getName() == "health")
			{
				this.takeDamage(-10);
				hit[0].obj.destroy();
			}
			if( !this.isAlive() ) {
				this.particleDestroy();
				Crafty.e('Actor, Particles').particles(particleDestory).at( Math.floor( this.x / Game.map_grid.tile.width ), Math.floor( this.y / Game.map_grid.tile.height ) );
				pcParticles.destroy();
				setTimeout(function() { Crafty.scene('GameOver'); }, 1500);
			}
		});

		this.onHit("Wall", function(hit) {
			for (var i = 0; i < hit.length; i++) {
				if (hit[i].normal.x === 1) {
					this.x = hit[i].obj.x + hit[i].obj.w;
				}
				if (hit[i].normal.x === -1) {
					this.x = hit[i].obj.x - this.w;
				}
			}
		});
	},
});

Crafty.c('Enemy', {
	init: function() {
		this.requires('Character, spr_enemy, Solid');
		this.isMoving = true;
		this.bind('EnterFrame', function(dt) {
			if(!this.isAlive()) {
				Crafty.e('Actor, Particles').particles(particleDestory).at( Math.floor( this.x / Game.map_grid.tile.width ), Math.floor( this.y / Game.map_grid.tile.height ) );
				this.destroy();
				if(Math.random() < 0.05) {
					Crafty.e('LifeOrb').create(this.x,this.y);
				}
			}
			if(this.isMoving == true) {
				this.y += 16 * dt.dt / 100;
			}
		});
		this.onHit('Wall', function() {
			this.destroy();
		})
	},
	setName: function(name) {
		this.name = name;
	},

	getName: function() {
		return this.name;
	},
});

Crafty.c('TierTwo', {
	init: function() {
		this.requires('Character, spr_enemy_tier_two, Solid');
		this.isMoving = true;
		this.bind('EnterFrame', function(dt) {
			if(!this.isAlive()) {
				Crafty.e('Actor, Particles').particles(particleDestory).at( Math.floor( this.x / Game.map_grid.tile.width ), Math.floor( this.y / Game.map_grid.tile.height ) );
				this.destroy();
				if(Math.random() < 0.05) {
					Crafty.e('LifeOrb').create(this.x,this.y);
				}
			}
			if(this.isMoving == true) {
				this.y += 20 * dt.dt / 100;
			}
		});
		this.onHit('Wall', function() {
			this.destroy();
		})
	},
	setName: function(name) {
		this.name = name;
	},

	getName: function() {
		return this.name;
	},
});