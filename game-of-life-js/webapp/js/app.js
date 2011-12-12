/**
 * Game of life 'engine'
 */
var gameOfLife;

/**
 * Graphics background
 */
var paper;
var gridBackground;

/**
 * Timeout variable drawing the next generation
 */
var nextGenerationTimeout;

$(document).ready(function() {
	gameOfLife = new GameOfLife(30, 30);
	initGame();
	createViewObjects();
	createDrawArea(gameOfLife.sizeX, gameOfLife.sizeY);
	drawGameOfLife();
});

/**
 * Creates the starting positions for the blocks
 * in the game.
 * @return
 */
function initGame(){
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
}

/**
 * Creates the graphics area
 * 
 * @param gameOfLifeSizeX
 * @param gameOfLifeSizeY
 * @return
 */
function createDrawArea(gameOfLifeSizeX, gameOfLifeSizeY){
	if(paper != undefined){
		paper.remove();
	}
	paper = Raphael(document.getElementById('drawArea'), gameOfLifeSizeX * 10, gameOfLifeSizeY * 10);
	paper.setSize(gameOfLifeSizeX * 10, gameOfLifeSizeY * 10);
	
	gridBackground = paper.rect(0, 0, gameOfLifeSizeX * 10, gameOfLifeSizeY * 10, 0);
	gridBackground.click(function(event) {
		drawRect(event.layerX, event.layerY);
	});
}

/**
 * Draws a cell on the grid
 * 
 * @param x
 * @param y
 * @return
 */
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

/**
 * Draws the current generation on the grid.
 * 
 * @return
 */
function drawGameOfLife() {
	paper.clear();
	
	for ( var i = 0; i < gameOfLife.sizeX; i++) {
		for ( var j = 0; j < gameOfLife.sizeY; j++) {
			if (gameOfLife.grid[i][j].alive == true) {
				drawRect(i * 10, j * 10);
			}
		}
	}

	drawNextGeneration();
}

/**
 * Creates timer for creating the next
 * generation.
 * 
 * @return
 */
function drawNextGeneration() {
	gameOfLife.nextGeneration();
	nextGenerationTimeout = setTimeout("drawGameOfLife()", 200);
}

/**
 * Rezizes the grid.
 * 
 * @param newX
 * @param newY
 * @return
 */
function resizeGrid(newX, newY){
	$('#drawArea').width(newX * 10);
	$('#drawArea').height(newY * 10);
	clearTimeout(nextGenerationTimeout);
	gameOfLife.resize(newX, newY);
	createDrawArea(newX, newY);
    drawGameOfLife();
}

/**
 * Creates listener for the controls.
 * 		Controls contain operations to resize the grid
 * 
 * Makes the grid resizable with jquery-ui.
 * 
 * @return
 */
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
            "click input[id=buttonSetGridSize]": "resize"	
        },
        
        resize: function( event ){
        	var newX = $("#inputSizeX").val();
        	var newY = $("#inputSizeY").val();
        	resizeGrid(newX, newY);
        }
	});
	
	var controlsView = new ControlsView({ el: $("#controls") });
	
	$( "#drawArea" ).resizable(
			{ 	grid: 10, 
				
				resize: function(event, ui){
					$("#inputSizeX").val(Math.floor( $('#drawArea').width() / 10)); 
					$("#inputSizeY").val(Math.floor( $('#drawArea').height() / 10));
				}, 
				
				stop: function(event, ui) { 
					resizeGrid( Math.floor( $('#drawArea').width() / 10),  Math.floor($('#drawArea').height() / 10 ));  
				} 
			}
	);
}