Crafty.scene('LevelOne', function() {


 // Player 
 this.player = Crafty.e('Player').at(15, 35);

//test Enemy
 this.enemy = Crafty.e('Enemy').at(15,10);

});

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