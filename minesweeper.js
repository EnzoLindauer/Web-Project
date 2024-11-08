const matrix = [];

function generateMap(i,j){// i and j passed as arguements , they indicate the dimensions of the minesweeper map , passed per difficulty selection, I is rows and J is columns


    // i is rows, j is columns
for (let k = 0; k < i; k++) {
    matrix[k] = [];
    for (let p = 0; p < j; p++) {
        matrix[k][p] = parseInt(0);  // Initialize with zeros or any default value
        }
      }
      //console.log(matrix);



var mineAmount ;
if (j === 9) {//easy, 10 mines
    mineAmount = 10;
}else if(j === 16){//normal, 40 mines
    mineAmount = 40;
}else{//expert 99 mines
    mineAmount = 99;
}

for(let k = 0; k < parseInt(mineAmount); k++ ){
    let bombIndexI = getRandomInt(0,i-1);
    let bombIndexJ = getRandomInt(0,j-1);
    
     if (parseInt(matrix[bombIndexI][bombIndexJ]) === parseInt(-1)) {
         k--;
         continue;
 
     }

     matrix[bombIndexI][bombIndexJ] = parseInt(-1);
     incrementSurrounding(parseInt(bombIndexI), parseInt(bombIndexJ));




 }

printMap(i, j);


}

function printMap(i, j){

    const table = document.createElement("table"); // this will create the general table

    for(let x = 0; x < i; x++){
        const row = document.createElement("tr");// this will represent the row at x in the table
        row.id = `${x}`;
        for(let y = 0; y < j; y++){

            const cell = document.createElement("td");// this will be the single cell
            cell.id = `${x}-${y}`;// the id will contain the coordinates of the cell seperated by a "-"
            row.appendChild(cell);


            cell.onclick = function() {// this will allow this cell to call this specfic function with the parameters being its coords
                clickEvent(x, y);
            };
        }
        table.appendChild(row);
    }
    const map = document.getElementById("map"); // MUST HAVE THE DIV ID BE MAP THAT WILL BE WHERE WE PLACE THE MAP
    map.appendChild(table);

}

function clickEvent(i,j){ // this will give us the specific cell that we want the event to be attached to
// my idea is to do BFS search and at each element the style will change and it will stop when it reaches the bound or a value that is not 0
    const cell = document.getElementById(`${i}-${j}`);
    
    if(matrix[i][j] === - 1){// end the game

        cell.style.backgroundColor = "black";
    }else if(matrix[i][j] !== 0){//this cell would have a bomb next to it so just show this cell

        cell.style.backgroundColor = "red";
        cell.textContent = matrix[i][j];
        cell.onclick = null;
    }else{//this cell has no bomb next to it therefore you will have to BFS and show all cells that are also = 0

        clearEvent(i, j);
    }
}

function clearEvent(i, j) {
    const queue = [[i, j]];
    const marked = [];
    
    // Initialize marked array
    for (let k = 0; k < matrix.length; k++) {
        marked[k] = [];
        for (let p = 0; p < matrix[0].length; p++) {
            marked[k][p] = 0;  // Initialize with zeros
        }
    }
    
    marked[i][j] = 1; // Start position marked as visited
    const cell = document.getElementById(`${i}-${j}`);
    cell.style.backgroundColor = "blue";
    
    while (queue.length > 0) {
        const [currentX, currentY] = queue.shift();
        console.log(`Visiting cell (${currentX}, ${currentY}) with value: ${matrix[currentX][currentY]}`);
        
        // Define direct neighbors (up, down, left, right)
        const directions = [
            [0, 1],   // right
            [1, 0],   // down
            [0, -1],  // left
            [-1, 0]   // up
        ];
        
        for (const [dx, dy] of directions) {
            const newX = currentX + dx;
            const newY = currentY + dy;
            
            if (inBound(newX, newY) && marked[newX][newY] === 0) {
                marked[newX][newY] = 1;  // Mark as visited
                const cell = document.getElementById(`${newX}-${newY}`);
                cell.style.backgroundColor = "blue"; // this is going to be where we want to make the changes.
                
                if (matrix[newX][newY] === 0) {
                    queue.push([newX, newY]);  // Continue BFS only for cells with 0
                }else{// seperate call for cells that are not 0

                    cell.textContent = matrix[newX][newY];
                }

                cell.onclick = null;
            }
        }
    }
}


function inBound(i, j){

    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}
 

function getRandomInt(min, max) {
    min = Math.ceil(min);    // Round up to include the min value
    max = Math.floor(max);    // Round down to include the max value
    return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
  }

function incrementSurrounding(i, j){

    let index_value;
    for(let x = -1; x < 2; x++){

        for(let y = -1; y < 2; y++){

            if((i + x >= 0  && (i + x) < matrix.length) && (j + y >= 0 &&  j+ y < matrix[0].length)){//if in the bound
                //console.log(i+x + " i+x");
                //console.log(i+y+ " i+y");
                index_value = parseInt(matrix[i + x][j + y]);
                if(!(parseInt(index_value) === parseInt(matrix[i][j]) || parseInt(index_value) === parseInt(-1))){// if not in the bound or not bomb

                    matrix[i + x][j + y]++;
                }
            }
            
        }
    }
    
}
  
