function GameOfLifeApp(){
	this.DrawArea = function(gameOfLifeApp){	
		var paper = Raphael(document.getElementById('drawArea'), gameOfLife.sizeX * 10, gameOfLife.sizeY * 10);
		paper.setSize(gameOfLife.sizeX * 10, gameOfLife.sizeY * 10);
		
		function drawRect(paper, gameOfLifeApp, x, y) {
			var x = Math.floor(x / 10) * 10;
			var y = Math.floor(y / 10) * 10;
		 
			var rect = paper.rect(x, y, 10, 10, 2);
			rect.attr("stroke", "#84CB5E");
			rect.attr("fill", "#446135");
			rect.click(function(event) {
				gameOfLifeApp.modifyCellAt(event.layerX, event.layerY);
				this.remove();
			});
		}
		
		this.drawGameOfLife = function () {
			paper.clear();
			
			gridBackground = paper.rect(2, 2, gameOfLife.sizeX * 10, gameOfLife.sizeY * 10, 0);
			gridBackground.attr("stroke", "#F3FAEE");
			gridBackground.attr("fill", "#F3FAEE");
			gridBackground.click(function(event) {
				gameOfLifeApp.modifyCellAt(event.layerX, event.layerY);
				drawRect(paper, gameOfLifeApp, event.layerX, event.layerY);
			});
			
			for ( var i = 0; i < gameOfLife.sizeX; i++) {
				for ( var j = 0; j < gameOfLife.sizeY; j++) {
					if (gameOfLife.grid[i][j].alive == true) {
						drawRect(paper, gameOfLifeApp, i * 10, j * 10);
					}
				}
			}
		};
		
		var drawAreaResizable = function(gameOfLifeApp){
			$( "#drawArea" ).resizable(
					{ 	grid: 10, 
						minHeight: 300,
						minWidth: 300, 
						
						resize: function(event, ui){
							$("#inputSizeX").val(Math.floor( $('#drawArea').width() / 10)); 
							$("#inputSizeY").val(Math.floor( $('#drawArea').height() / 10));
						}, 
						
						stop: function(event, ui) { 
							gameOfLifeApp.resizeGrid( Math.floor( $('#drawArea').width() / 10),  Math.floor($('#drawArea').height() / 10 ));  
						} 
					}
			);
		}(gameOfLifeApp);
	}
	
	this.modifyCellAt = function(x, y){
		var x = Math.floor(x / 10);
		var y = Math.floor(y / 10);
		
		var cell = gameOfLife.grid[x][y];
		cell.alive = !cell.alive;
	};
	
	this.resizeGrid = function(newX, newY){
		$('#drawArea').width(newX * 10);
		$('#drawArea').height(newY * 10);
		gameOfLife.resize(newX, newY);
		drawArea.drawGameOfLife();
	};

	this.startGame = function(){
		$('#buttonPlay').attr('disabled', true);
		$('#buttonStop').attr('disabled', false);
		gameOfLifeInterval = setInterval(this.createNextGenerationAndDrawIt, 250);
	};
	
	this.createNextGenerationAndDrawIt = function(){
		if(isPreviousGenerationStillInProgress){
			return;
		}
		
		isPreviousGenerationStillInProgress = true;
		gameOfLife.nextGeneration();
		drawArea.drawGameOfLife();
		isPreviousGenerationStillInProgress = false;
	};

	this.stopGame = function(){
		$('#buttonPlay').attr('disabled', false);
		$('#buttonStop').attr('disabled', true);
		clearInterval(gameOfLifeInterval);
	};
	
	var gameOfLife = new GameOfLife(30, 30);
	var drawArea = new this.DrawArea(this);
	var gameOfLifeInterval;
	var isPreviousGenerationStillInProgress = false;
	this.gameSizeX = ko.observable(gameOfLife.sizeX);
    this.gameSizeY = ko.observable(gameOfLife.sizeY);
    
    $('#buttonStop').attr('disabled', true);
    drawArea.drawGameOfLife();
}

$(document).ready(function() {
	var gameOfLifeApp = new GameOfLifeApp();
	ko.applyBindings(gameOfLifeApp);
    
});