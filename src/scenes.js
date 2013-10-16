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
      spr_enemy:      [1, 1]
    });

    Crafty.scene('LevelOne');
  })
});

Crafty.scene('LevelOne', function() {

  var enemySpawn = 0;

 // Player initalize
 Crafty.e('Player').at(15, 35);

 console.log("start");
 Crafty.e("Delay").delay(function() {
  console.log("1000ms later");
  Crafty.e('Enemy').at( ( ( Math.random() * 31 ) + 1), 0 ).setName("enemy");
}, 1000, 20);


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