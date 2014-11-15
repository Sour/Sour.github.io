var particleThrust = {
	maxParticles: 50,
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
	maxParticles: 75,
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
    spread: 5,
    // How many frames should this last
    duration: 10,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0 },
    // sensible values are 0-3
    jitter: 3
}

Crafty.c('Character', {
	init: function() {
		this.requires('Actor, Collision, Life, Shield')
		.collision();
	},
	particleDestroy: function() {
		this.destroy();
	},
});

Crafty.c('PlayerSingle', {
	init: function() {
		this.requires('Character, spr_player_single, Controls, Score');

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
		.color('#63C788');
		//.text(this.getLife())
		//.css({"font-size":"20px","text-align":"center","display":"inline-block","vertical-align":"middle"})
		//.textFont({size:'12px', weight: 'bold'});

		var pcLifeText = Crafty.e('2D, DOM, Text')
		.attr({ x:0, y:0 })
		.css({"font-size":"20px","text-align":"center","display":"inline-block","vertical-align":"middle"})
		.textFont({ size: '12px', weight: 'bold', align: 'center' });
		

		this.bind('EnterFrame', function(dt) {
			pcParticles.x = this.x + 21.5;
			pcParticles.y = this.y + 26;

			pcScore.text(this.getScore());

			pcLifeBar.attr({ x: 0, y: (Game.map_grid.height * Game.map_grid.tile.height) - 16, w: ((Game.map_grid.width * Game.map_grid.tile.width) * (this.getLife()) / 100), h:16 });
			pcLifeText.text(this.getLife());

		});
		this.onHit("Solid", function(hit) {
			if(hit[0].obj.getName() == "enemy")
			{
				if(this.hasShield === false) {
					this.takeDamage(30);
				}
				this.removeShield;
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

Crafty.c('PlayerDual', {
	init: function() {
		this.requires('Character, spr_player_dual, Controls, Score');

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
		.color('#63C788');

		var pcLifeText = Crafty.e('2D, DOM, Text')
		.attr({ x:0, y: ((Game.map_grid.height * Game.map_grid.tile.height) - 16) })
		.css({"font-size":"20px","text-align":"center","display":"inline-block","vertical-align":"middle"})
		.textFont({ size: '12px', weight: 'bold', align: 'center' });
		
		this.bind('EnterFrame', function(dt) {
			pcParticles.x = this.x + 21.5;
			pcParticles.y = this.y + 26;

			pcScore.text(this.getScore());

			pcLifeBar.attr({ x: 0, y: (Game.map_grid.height * Game.map_grid.tile.height) - 16, w: ((Game.map_grid.width * Game.map_grid.tile.width) * (this.getLife()) / 100), h:16 });
			pcLifeText.text(this.getLife());

		});

		this.onHit("Solid", function(hit) {
			if(hit[0].obj.getName() == "enemy")
			{
				if(this.hasShield === false) {
					this.takeDamage(30);
				}
				this.removeShield;
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

Crafty.c('EnemyGrey', {
	init: function() {
		this.requires('Character, spr_enemy_grey, Solid, ItemDrop');
		this.isMoving = true;
		this.speed = 10;
		this.bind('EnterFrame', function(dt) {
			if(!this.isAlive()) {
				Crafty.e('Actor, Particles').particles(particleDestory).at( Math.floor( this.x / Game.map_grid.tile.width ), Math.floor( this.y / Game.map_grid.tile.height ) );
				this.destroy();
				this.dropItem(0.05, this.y);
			}
			if(this.isMoving == true) {
				this.y += this.speed * dt.dt / 100;
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

Crafty.c('EnemyPurple', {
	init: function() {
		this.requires('Character, spr_enemy_purple, Solid, ItemDrop');
		this.isMoving = true;
		this.speed = 25;
		this.bind('EnterFrame', function(dt) {
			if(!this.isAlive()) {
				Crafty.e('Actor, Particles').particles(particleDestory).at( Math.floor( this.x / Game.map_grid.tile.width ), Math.floor( this.y / Game.map_grid.tile.height ) );
				this.destroy();
				this.dropItem(0.1, this.y);
			}
			if(this.isMoving == true) {
				this.y += this.speed * dt.dt / 100;
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
