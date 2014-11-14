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

Crafty.c('ShieldOrb', {
	init: function() {
		this.requires('Collision')
		.collision();
		this.bind('EnterFrame', function(dt) {
			this.y += dt.dt / 15;
		});

		this.onHit('Life', function(hit) {
			this.destroy();
			console.log(hit[0]);
			hit[0].obj.obtainShield();
		});
		this.onHit('Wall', function(hit) {
			this.destroy();
		});
	},
	create: function(x, y) {
		this.addComponent( 'Actor, Collision, Solid, spr_shield_orb' )
		.name = "shield";
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

Crafty.c('Coin', {
	init: function() {
		this.requires('Collision')
		.collision();
		this.bind('EnterFrame', function(dt) {
			this.y += dt.dt / 15;
		});
		this.onHit('Life', function(hit) {
			this.destroy();
			hit[0].obj.updateScore(100);
		});
		this.onHit('Wall', function(hit) {
			this.destroy();
		});
	},
	create: function(x, y) {
		this.addComponent( 'Actor, Collision, Solid, spr_coin_small' )
		.name = "coin";
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

Crafty.c('Ammo', {
	init: function() { 
		this.requires('Collision')
		.collision();
		this.bind('EnterFrame', function(dt) {
			this.y += dt.dt / 15;
		});
		this.onHit('Life', function(hit) {
			this.destroy();
			hit[0].obj.giveAmmo(25);
		});
		this.onHit('Wall', function(hit) {
			this.destroy();
		});
	},
	create: function(x, y) {
		this.addComponent( 'Actor, Collision, Solid, spr_ammo_orb' )
		.name = "ammo";
		this.attr({
			x: x,
			y: y,
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},
	getName: function() { 
		return this.name;
	}
});