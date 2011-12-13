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
	createDrawArea();
	drawGameOfLife();
});

/**
 * Creates the starting positions for the blocks
 * in the game.
 * @return
 */
function initGame(){
	/*gameOfLife.grid[16][17].alive = true;
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
	gameOfLife.grid[13][13].alive = true;*/
}

/**
 * Creates the graphics area
 * 
 * @param gameOfLifeSizeX
 * @param gameOfLifeSizeY
 * @return
 */
function createDrawArea(){
	if(paper != undefined){
		paper.remove();
	}
	paper = Raphael(document.getElementById('drawArea'), gameOfLife.sizeX * 10, gameOfLife.sizeY * 10);
	paper.setSize(gameOfLife.sizeX * 10, gameOfLife.sizeY * 10);
}

/**
 * Draws a cell on the grid
 * 
 * @param x
 * @param y
 * @return
 */
function drawRect(x, y) {
	var x = Math.floor(x / 10) * 10;
	var y = Math.floor(y / 10) * 10;
 
	var rect = paper.rect(x, y, 10, 10, 2);
	rect.attr("stroke", "#84CB5E");
	rect.attr("fill", "#446135");
}

function modifyCellAt(x, y){
	var x = Math.floor(x / 10);
	var y = Math.floor(y / 10);
	
	var cell = gameOfLife.grid[x][y];
	cell.alive = !cell.alive;
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
	
	gridBackground = paper.rect(0, 0, gameOfLife.sizeX * 10, gameOfLife.sizeY * 10, 0);
	gridBackground.attr("stroke", "#F3FAEE");
	gridBackground.attr("fill", "#F3FAEE");
	gridBackground.click(function(event) {
		modifyCellAt(event.layerX, event.layerY);
		drawRect(event.layerX, event.layerY);
	});
	
	for ( var i = 0; i < gameOfLife.sizeX; i++) {
		for ( var j = 0; j < gameOfLife.sizeY; j++) {
			if (gameOfLife.grid[i][j].alive == true) {
				drawRect(i * 10, j * 10);
			}
		}
	}
}

function createNextGeneration(){
	gameOfLife.nextGeneration();
	drawGameOfLife();
	drawNextGeneration();
}

/**
 * Creates timer for creating the next
 * generation.
 * 
 * @return
 */
function drawNextGeneration() {	
	nextGenerationTimeout = setTimeout("createNextGeneration()", 200);
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
	createDrawArea();
    drawNextGeneration();
}

function startGame(){
	createNextGeneration();
}

function stopGame(){
	clearTimeout(nextGenerationTimeout);
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
            "click input[id=buttonSetGridSize]": "resize",
            "click input[id=buttonPlay]": "play",
            "click input[id=buttonStop]": "stop"
        },
        
        resize: function( event ){
        	var newX = $("#inputSizeX").val();
        	var newY = $("#inputSizeY").val();
        	resizeGrid(newX, newY);
        },
        
        play: function( event ){
        	startGame();
        },
        
        stop: function( event ){
        	stopGame();
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