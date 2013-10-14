Crafty.scene('Game', function() {



  var options = {
    maxParticles: 150,
    size: 16,
    sizeRandom: 0,
    speed: 1,
    speedRandom: 1.2,
    // Lifespan in frames
    lifeSpan: 29,
    lifeSpanRandom: 7,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 0,
    angleRandom: 34,
    startColour: [255, 131, 0, 1],
    startColourRandom: [48, 50, 45, 0],
    endColour: [245, 35, 0, 0],
    endColourRandom: [60, 60, 60, 0],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 10,
    // How many frames should this last
    duration: -1,
    // Will draw squares instead of circle gradients
    fastMode: false,
    gravity: { x: 0, y: 1 },
    // sensible values are 0-3
    jitter: 0
}

Crafty.e("Actor, 2D,Canvas,Particles").particles(options).at(15,36);


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