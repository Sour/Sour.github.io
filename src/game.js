Game = {

	map_grid: {
		width:  42,
		height: 32,
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
		Crafty.background('rgb(249, 223, 125)');

		Crafty.scene('Game');
	}
}