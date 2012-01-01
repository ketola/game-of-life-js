function GameOfLife(sizeX, sizeY) {
	this.sizeX = sizeX;
	this.sizeY = sizeY;

	this.grid = function(sizeX, sizeY) {
		var g = new Array(sizeX);
		for ( var i = 0; i < sizeX; i++) {
			g[i] = new Array(sizeY);
			for ( var j = 0; j < sizeY; j++) {
				g[i][j] = new Cell();
			}
		}
		return g;
	}(sizeX, sizeY);

	function Cell() {
		this.alive = false;
	}

	function getNeighbourCells(grid, x, y) {
		var neighbors = new Array(8);
		
		neighbors[0] = getCell(grid, x + 1, y - 1);
		neighbors[1] = getCell(grid, x + 1, y);
		neighbors[2] = getCell(grid, x + 1, y + 1);

		neighbors[3] = getCell(grid, x, y - 1);
		neighbors[4] = getCell(grid, x, y + 1);
		
		neighbors[5] = getCell(grid, x - 1, y - 1);
		neighbors[6] = getCell(grid, x - 1, y);
		neighbors[7] = getCell(grid, x - 1, y + 1);

		return neighbors;
	}
	
	function getCell(grid, x, y){
		if(grid[x] != undefined && grid[x][y] != undefined){
			return grid[x][y];
		}
		return null;
	}

	function countLivingCells(cellArray) {
		var count = 0;
		for ( var i = cellArray.length - 1; i >= 0; --i) {
			if (cellArray[i] != undefined && cellArray[i].alive) {
				count++;
			}
		}
		return count;
	}
	
	this.resize = function(newX, newY){
		var newGrid = new Array(newX);
		
		for ( var i = 0; i < newX; i++) {
			newGrid[i] = new Array(newY);	
			for ( var j = 0; j < newY; j++) {
				var cell = (this.grid[i] != undefined ? this.grid[i][j] : undefined);
				if(cell != undefined){
					newGrid[i][j] = cell;
				} else {
					newGrid[i][j] = new Cell();
				}
			}
		}
		
		this.grid = newGrid;
		this.sizeX = newX;
		this.sizeY = newY;
	};

	this.nextGeneration = function() {
		var changingCells = new Array(10);
		
		for ( var x = 0; x < this.sizeX; x++) {
			for ( var y = 0; y < this.sizeY; y++) {
				var cell = this.grid[x][y];
				var neighbours = getNeighbourCells(this.grid, x, y);
				var livingNeighbours = countLivingCells(neighbours);

				if (cell.alive && isUnderpopulation(livingNeighbours)) {
					changingCells.push(cell);
				}

				if (cell.alive && isOverPopulation(livingNeighbours)) {
					changingCells.push(cell);
				}

				if (!cell.alive && isReproduction(livingNeighbours)) {
					changingCells.push(cell);
				}
			}
		}
		
		var changingCellsSize = changingCells.length;
		
		for(var i = 0; i <= changingCellsSize; i++){
			var changingCell = changingCells[i];
			if(changingCell != null) {
				changingCell.alive = !changingCell.alive;
			}
			
		}
	};

	function isUnderpopulation(livingNeighbours) {
		return livingNeighbours < 2;
	}

	function isOverPopulation(livingNeighbours) {
		return livingNeighbours > 3;
	}

	function isReproduction(livingNeighbours) {
		return livingNeighbours == 3;
	}
}