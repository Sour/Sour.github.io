Crafty.scene('Loading', function() {


  Crafty.e('2D, DOM, Text')
  .text('Loading...')
  .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
  .css($text_css);
  

  //load spritemap
  Crafty.load(['assets/16x16.png'], function() {

    //load spritemap individually once they have loaded.
    Crafty.sprite(16, 'assets/16x16.png', {
      spr_wall:       [0, 0],
      spr_background: [1, 0],
      spr_target:     [2, 0],
      spr_player:     [3, 0],
      spr_plasma:     [0, 1],
      spr_enemy:      [1, 1],
      spr_life_orb:   [2, 1]
    });

    Crafty.scene('LevelOne');
  })
});

Crafty.scene('LevelOne', function() {

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
  Crafty.e('Player').at(15, 35);

  var it = 0;
  //Create enemy spawns every xxxxms
  Crafty.e("Delay").delay(function() {
    Crafty.e('Enemy').at( Math.floor( Math.random() * 30 ), 0 ).setName("enemy");
    console.log(it);
    it++;
  }, 1000, -1);


});

Crafty.scene('Victory', function() {
  Crafty.e('Grid, DOM, Text')
  .text("You have survived!")
  .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
  .css($text_css);
});

Crafty.scene('GameOver', function() {
  Crafty.e('Grid, DOM, Text')
  .text("You have lost!")
  .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
  .css($text_css);
})