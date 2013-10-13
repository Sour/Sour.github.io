Crafty.scene('Game', function() {

  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Wall').at(x, y);
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile
        Crafty.e('Floor').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }

  // Generate up to five villages on the map in random locations
  var max_targets = 5;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.009) {
        if (Crafty('Target').length < max_targets && !this.occupied[x][y]) {
          Crafty.e('Target').at(x, y);
        }
      }
    }
  }

  Crafty.e("2D, DOM, FPS, Text")
  .attr({maxValues:10})
  .bind("MessureFPS",function(fps) { 
    this.text("FPS"+fps.value );
  });

  this.show_victory = this.bind('TargetObtained', function() {
    if (!Crafty('Target').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('TargetObtained', this.show_victory);
});

Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
  .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
  .css($text_css) 
  .text('All Targets Obtained!')

  // Watch for the player to press a key, then restart the game
  //  when a key is pressed
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown');
});

Crafty.scene('Loading', function() {

  Crafty.e('2D, DOM, Text')
  .text('Loading...')
  .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
  .css($text_css);
  

  //load spritemap
  Crafty.load(['assets/16x16.gif'], function() {

    //load spritemap individually once they have loaded.
    Crafty.sprite(16, 'assets/16x16.png', {
      spr_wall:  [0, 0],
      spr_floor: [1, 0],
      spr_target:[0, 1],
      spr_player:[0, 2]
    });

    Crafty.scene('Game');

  })
});