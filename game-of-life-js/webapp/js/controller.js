var gameOfLife;
var paper;

$(document).ready(function() {
	gameOfLife = new GameOfLife(30, 30);
	paper = Raphael(document.getElementById("drawArea"), 320, 320);

	gameOfLife.grid[16][17].alive = true;
	gameOfLife.grid[15][17].alive = true;
	gameOfLife.grid[14][17].alive = true;

	gameOfLife.grid[2][1].alive = true;
	gameOfLife.grid[3][2].alive = true;
	gameOfLife.grid[1][3].alive = true;
	gameOfLife.grid[2][3].alive = true;
	gameOfLife.grid[3][3].alive = true;

	gameOfLife.grid[12][11].alive = true;
	gameOfLife.grid[13][12].alive = true;
	gameOfLife.grid[11][13].alive = true;
	gameOfLife.grid[12][13].alive = true;
	gameOfLife.grid[13][13].alive = true;

	var InputSizeX = Backbone.View.extend( {
		el : $("#sizeX"),
		render : function() {
			alert(this.gameOfLife.sizeX);
			$(this.el).value(this.gameOfLife.sizeX);
			return this;
		}
	});

	createViewObjects();
	drawGameOfLife();
});

function drawRect(x, y) {
	x = Math.floor(x / 10) * 10;
	y = Math.floor(y / 10) * 10;

	var rect = paper.rect(x, y, 10, 10, 2);
	rect.attr("stroke", "#84CB5E");
	rect.attr("fill", "#446135");
}

function log(object) {
	var output = '';
	for (property in object) {
		output += property + ': ' + object[property] + '; ';
	}
	alert(output);
}

function drawGameOfLife() {
	paper.clear();
	var rect = paper.rect(0, 0, 300, 300, 2);
	rect.attr("fill", "#F3FAEE");
	rect.attr("stroke", "#FBFBFB");
	rect.click(function(event) {
		drawRect(event.layerX, event.layerY);
	});

	for ( var i = 0; i < 30; i++) {
		for ( var j = 0; j < 30; j++) {
			if (gameOfLife.grid[i][j].alive == true) {
				drawRect(i * 10, j * 10);
			}
		}
	}

	drawNextGeneration();
}

function drawNextGeneration() {
	gameOfLife.nextGeneration();
	var t = setTimeout("drawGameOfLife()", 200);
}

function createViewObjects() {
	ControlsView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		
		render: function(){
			var template = _.template( $("#controlsTemplate").html(), {} );
			this.el.html( template );
		},
		
		events: {
            "click input[type=button]": "doSearch"
        },
        
        doSearch: function( event ){
            // Button clicked, you can access the element that was clicked with event.currentTarget
            alert( "Search for " + $("#inputSizeX").val() );
        }
	});
	
	var controlsView = new ControlsView({ el: $("#controls") });
}