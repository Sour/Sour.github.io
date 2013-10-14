Crafty.scene('Game', function() {

  // Player 
  this.player = Crafty.e('PlayerCharacter').at(15, 35);

  Crafty.e("2D, DOM, FPS, Text")
  .attr({maxValues:10})
  .bind("MessureFPS",function(fps) { 
    this.text("FPS"+fps.value );
  });
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
      spr_wall:  [0, 0],
      spr_background: [1, 0],
      spr_target:[2, 0],
      spr_player:[3, 0],
      spr_plasma:[0, 1]
    });

    Crafty.scene('Game');

  })
});