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
		this.requires('2D, Canvas, Grid, Collision');
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
		this.requires('Twoway');
		this.enableControl();
	},
	Controls: function(speed, jump) {
		this.twoway(speed, jump);
		return this;
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
		this.requires('Actor, Solid, spr_wall')
		.collision();
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
		this.requires('Actor, Gravity, Life, Controls, spr_player, Text, DOM')
		.text(this.getLife())
		.css({ "text-align": "center" })
		.Controls(2, 5)
		.gravity('Bellow')
		.collision()
		.onHit('Target', this.targetObtained);

		this.onHit("Solid", function(hit) {
            for (var i = 0; i < hit.length; i++) {
                if (hit[i].normal.y === 1) { // we hit the top or bottom of it
                    this._up = false;
                    this._falling = true;
                }

                if (hit[i].normal.y === -1) { // we hit the top of it
                    this._falling = false;
                    this._up = false;
                    this.y = hit[i].obj.y - this.h;
                }

                if (hit[i].normal.x === 1) { // we hit the right side of it
                    this.x = hit[i].obj.x + hit[i].obj.w;
                }

                if (hit[i].normal.x === -1) { // we hit the left side of it
                    this.x = hit[i].obj.x - this.w;
                }
            }
        });
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
