var particlePlasma = {
	maxParticles: 20,
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
    duration: 5,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0 },
    // sensible values are 0-3
    jitter: 0
}

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
		this.addComponent( 'Actor, Collision, Solid, spr_plasma' );
		this.collision([5,4], [11,4], [11,12], [5,12]);
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