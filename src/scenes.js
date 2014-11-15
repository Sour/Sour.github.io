Crafty.scene('Loading', function() {


	Crafty.e('2D, DOM, Text')
	.text('Loading...')
	.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
	.css($text_css);


  //load spritemap

  Crafty.load(['assets/16x16.png'], function() {

    //load spritemap individually once they have loaded.
    Crafty.sprite(16, 'assets/16x16.png', {
    	spr_plasma_small:    [0, 0],
    	spr_plasma_large:    [1, 0],
    	spr_laser:           [2, 0],
      spr_shield_orb:      [4, 0],
      spr_life_orb:        [5, 0],
      spr_ammo_orb:        [6, 0],
    	spr_coin_small:      [7, 0],
      spr_coin_medium:     [8, 0],
      spr_coin_large:      [9, 0],
      spr_enemy_purple:    [1, 1],
    	spr_enemy_grey:      [2, 1],
      spr_enemy_yellow:    [3, 1],
      spr_enemy_red:       [4, 1],
      spr_enemy_green:     [5, 1]
    });

    Crafty.sprite(48, 32, 'assets/16x16.png', {
    	spr_player_dual:          [0, 1],
      spr_player_single:        [0, 2],
      spr_player_dual_shield:   [1, 1],
      spr_player_single_shield: [1, 2],
      spr_player_dual_power:    [2, 1],
      spr_player_single_power:  [2, 2]
    });

    Crafty.scene('LevelOne');
})
});

Crafty.scene('LevelOne', function() {
  //create boundries for canvas.
  for (var x = -2; x <= Game.map_grid.width + 1; x++) {
  	for (var y = -1; y <= Game.map_grid.height; y++) {
  		var at_edge = x == -2 || x == Game.map_grid.width + 1 || y == -2 || y == Game.map_grid.height + 1;

  		if (at_edge) {
  			Crafty.e('Wall').at(x, y);
  		} 
  	}
  }

  // Create Player Object
  Crafty.e('PlayerSingle').at(14, 35);

  var it = 0;
  //Create enemy spawns every xxxxms
  Game.gameDelay = Crafty.e("Delay").delay(function() {
  	Crafty.e('EnemyGrey').at( Math.floor( Math.random() * 30 ), 0 ).setName("enemy");
  	console.log(it);
  	it++;
  }, 1000, 24);

  setTimeout(function() {
  	Crafty.e('Grid, DOM, Text')
	   .text("You have survived level one!")
	   .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
	   .css($text_css);
  	setTimeout(function() { 
  		Crafty.scene('LevelTwo');
  	}, 5000);
  }, 30000);
});

Crafty.scene('LevelTwo', function() {
  //create boundries for canvas.
  for (var x = -1; x <= Game.map_grid.width; x++) {
  	for (var y = -1; y <= Game.map_grid.height; y++) {
  		var at_edge = x == -1 || x == Game.map_grid.width || y == -1 || y == Game.map_grid.height;

  		if (at_edge) {
  			Crafty.e('Wall').at(x, y);
  		} 
  	}
  }

  // Create Player Object
  Crafty.e('PlayerDual').at(15, 35);

  var it = 0;
  //Create enemy spawns every xxxxms
  Game.gameDelay = Crafty.e("Delay").delay(function() {
  	if( Math.random() < 0.2 ) {
  		Crafty.e('EnemyPurple').at( Math.floor( Math.random() * 30 ), 0 ).setName("enemy");
  	} else {
  		Crafty.e('EnemyGrey').at( Math.floor( Math.random() * 30 ), 0 ).setName("enemy");
  	}
  	
  	console.log(it);
  	it++;
  }, 1000, 49);

  setTimeout(function() {

  	Crafty.e('Grid, DOM, Text')
	.text("You have survived level two!")
	.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
	.css($text_css);

  	setTimeout(function() { 
  		Crafty.scene('Victory');
  	}, 5000);
  }, 55000);
});

Crafty.scene('Victory', function() {
	Crafty.e('Grid, DOM, Text')
	.text("You have won!")
	.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
	.css($text_css);
});

Crafty.scene('GameOver', function() {
	Game.Delay.destroy();
	Crafty.e('Grid, DOM, Text')
	.text("You have lost!")
	.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
	.css($text_css);
})
