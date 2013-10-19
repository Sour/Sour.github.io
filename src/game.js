Game = {

	map_grid: {
		width:  31,
		height: 40,
		tile: {
			width:  16,
			height: 16
		}
	},

	width: function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},

	height: function() {
		return this.map_grid.height * this.map_grid.tile.height;
	},

	start: function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(50, 50, 50)');
		var Delay;
		Crafty.scene('Loading');
	}
}
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }