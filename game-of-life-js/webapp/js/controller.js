var gameOfLife;
var paper;
var nextGenerationTimeout; 

$(document).ready(function() {
	gameOfLife = new GameOfLife(30, 30);

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
	
	createDrawArea();
	createViewObjects();
	drawGameOfLife();
});

function createDrawArea(gameOfLifeSizeX, gameOfLifeSizeY){
	if(paper != undefined){
		paper.remove();
	}
	paper = Raphael(document.getElementById("drawArea"), gameOfLifeSizeX * 10 + 20, gameOfLifeSizeY * 10 + 20);
}

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
	var rect = paper.rect(0, 0, gameOfLife.sizeX * 10, gameOfLife.sizeY * 10, 2);
	rect.attr("fill", "#F3FAEE");
	rect.attr("stroke", "#FBFBFB");
	rect.click(function(event) {
		drawRect(event.layerX, event.layerY);
	});

	for ( var i = 0; i < gameOfLife.sizeX; i++) {
		for ( var j = 0; j < gameOfLife.sizeY; j++) {
			if (gameOfLife.grid[i][j].alive == true) {
				drawRect(i * 10, j * 10);
			}
		}
	}

	drawNextGeneration();
}

function drawNextGeneration() {
	gameOfLife.nextGeneration();
	nextGenerationTimeout = setTimeout("drawGameOfLife()", 200);
}

function resizeGrid(newX, newY){
	clearTimeout(nextGenerationTimeout);
	gameOfLife.resize(newX, newY);
	createDrawArea(newX, newY);
    drawGameOfLife();
}

function createViewObjects() {
	ControlsView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		
		render: function(){
			var template = _.template( $("#controlsTemplate").html(), {sizeX: gameOfLife.sizeX, sizeY: gameOfLife.sizeY} );
			this.el.html( template );
		},
		
		events: {
            "click input[id=buttonSetGridSize]": "doSearch"
        },
        
        doSearch: function( event ){
        	var newX = $("#inputSizeX").val();
        	var newY = $("#inputSizeY").val();
        	resizeGrid(newX, newY);
        }
	});
	
	var controlsView = new ControlsView({ el: $("#controls") });
}