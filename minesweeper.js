const matrix = [];
const bomblocale = [];
const map = document.getElementById("map");
let diffptr;
let time_started = false;// MAKE SURE TO RESET THESE ELEMENTS UPON A WIN OR A LOSS
let marked = [];
let time_count = 0;
let bomb_count = 0;
let tile_count = 0;

function resetLocalStorage() {

    localStorage.removeItem('MinesweeperScores');

  }

function pauseTimer() {
    clearInterval(timerInterval); // Stops the timer
    time_started = false; // Allows the timer to be started again if needed
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

function resetTimer() {
    clearInterval(timerInterval); 
    time_started = false; 
    time_elapsed = 0; 
    time_count = 0;
    document.getElementById("time-count").textContent = 0;
    document.getElementById("bombs-left").textContent = '';
  }

function startTimer() {
    timerInterval = setInterval(() => {
      time_count++;
      document.getElementById('time-count').textContent = time_count;
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, 1000);
  }

  function initializeScores(){

    if(!localStorage.getItem('MinesweeperScores')){

        fetch('minesweeper.json').then(response => response.json()).then(file => {

            localStorage.setItem('MinesweeperScores', JSON.stringify(file));
        }
        ).catch(error => console.log(error));
    }
  }


    function displayScores() {
        const scores = JSON.parse(localStorage.getItem('MinesweeperScores'));
        //Olex dont worry the '?' is just an if else so if it is = 999 then display 0 else display normally
        
        document.querySelector('#beginner-score-1').textContent = scores.beginner[0] === 999 ? 0 : scores.beginner[0];
        document.querySelector('#beginner-score-2').textContent = scores.beginner[1] === 999 ? 0 : scores.beginner[1];
        document.querySelector('#beginner-score-3').textContent = scores.beginner[2] === 999 ? 0 : scores.beginner[2];
      
        
        document.querySelector('#intermediate-score-1').textContent = scores.intermediate[0] === 999 ? 0 : scores.intermediate[0];
        document.querySelector('#intermediate-score-2').textContent = scores.intermediate[1] === 999 ? 0 : scores.intermediate[1];
        document.querySelector('#intermediate-score-3').textContent = scores.intermediate[2] === 999 ? 0 : scores.intermediate[2];
      
        
        document.querySelector('#expert-score-1').textContent = scores.expert[0] === 999 ? 0 : scores.expert[0];
        document.querySelector('#expert-score-2').textContent = scores.expert[1] === 999 ? 0 : scores.expert[1];
        document.querySelector('#expert-score-3').textContent = scores.expert[2] === 999 ? 0 : scores.expert[2];
      }
      

  function updateScores(difficulty, timeTaken){

    const scores = JSON.parse(localStorage.getItem('MinesweeperScores'));
    
    scores[difficulty].push(timeTaken);
    scores[difficulty].sort((a,b) => a-b);
    console.log(scores[difficulty]);
    scores[difficulty] = scores[difficulty].slice(0,3);

    localStorage.setItem('MinesweeperScores', JSON.stringify(scores));
    displayScores();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initializeScores();
    displayScores();

  });


function createBomblocale(mineammount){
    //makes bombLocale store the i and j indices of the bombs , matrix of mineammount by 2 , as coordinates are i an j
    bomblocale.length = mineammount;
    for (let k = 0; k < mineammount; k++) {
        bomblocale[k] = [];
        for (let p = 0; p < 2; p++) {
            bomblocale[k][p] = parseInt(0);  // Initialize with zeros or any default value
            }
          }

           //console.log(bomblocale);

}




function generateMap(i,j){// i and j passed as arguements , they indicate the dimensions of the minesweeper map , passed per difficulty selection, I is rows and J is columns

    if(time_count !== 0){
        resetTimer();
    }
    

    // i is rows, j is columns
for (let k = 0; k < i; k++) {
    matrix[k] = [];
    for (let p = 0; p < j; p++) {
        matrix[k][p] = parseInt(0);  // Initialize with zeros or any default value
        }
      }
      //console.log(matrix);

for (let k = 0; k < matrix.length; k++) {
        marked[k] = [];
        for (let p = 0; p < matrix[0].length; p++) {
            marked[k][p] = parseInt(0);  // Initialize with zeros
        }
    }


      

if (j === 9) {//easy, 10 mines
    bomb_count = 10;
    diffptr  = "beginner";
    
}else if(j === 16){//normal, 40 mines
    bomb_count = 40;
    diffptr  = "intermediate";
    
}else{//expert 99 mines
    bomb_count = 99;
    diffptr = "expert";
}
tile_count = ((i * j) - bomb_count + 2);
document.querySelector('#bombs-left').textContent = bomb_count;
createBomblocale(bomb_count);

for(let k = 0; k < parseInt(bomb_count); k++ ){
    let bombIndexI = getRandomInt(0,i-1);
    let bombIndexJ = getRandomInt(0,j-1);
    
     if (parseInt(matrix[bombIndexI][bombIndexJ]) === parseInt(-1)) {
         k--;
         continue;
 
     }

      //store locations of bombs in bomblocale
      bomblocale[k][0] = parseInt(bombIndexI);
      bomblocale[k][1] = parseInt(bombIndexJ);

     matrix[bombIndexI][bombIndexJ] = parseInt(-1);
     incrementSurrounding(parseInt(bombIndexI), parseInt(bombIndexJ));
 }
 //console.log(bomblocale);

printMap(i, j);


}

function printMap(i, j){

   
    clearMap();
    const table = document.createElement("table"); // this will create the general table

    for(let x = 0; x < i; x++){
        const row = document.createElement("tr");// this will represent the row at x in the table
        row.id = `${x}`;
        for(let y = 0; y < j; y++){

            const cell = document.createElement("td");// this will be the single cell
            cell.id = `${x}-${y}`;// the id will contain the coordinates of the cell seperated by a "-"
            row.appendChild(cell);

            cell.onclick = function() {// this will allow this cell to call this specific function with the parameters being its coords
                clickEvent(x, y);
            };
            cell.oncontextmenu = function(event) {

                event.preventDefault();
                flagEvent(x,y);
            }
        }
        table.appendChild(row);
    }
    const map = document.getElementById("map"); // MUST HAVE THE DIV ID BE MAP THAT WILL BE WHERE WE PLACE THE MAP
    map.appendChild(table);

}

function flagEvent(i, j){

    const cell = document.getElementById(`${i}-${j}`);

    if(!cell.classList.contains('flagged')){//this is where you will incrememnt and decrement the bomb counter
        
        
        console.log(bomb_count);
        
        
        if(marked[i][j] !== 1){

            if(bomb_count >= 0){

                bomb_count--;
            }

            if(bomb_count >= 0){
            
            document.querySelector('#bombs-left').textContent = bomb_count;
            cell.style.backgroundImage = `url(/cellassets/flag.png)`;
            cell.classList.add('flagged');
        }
        
        
        }
    }else{

            if(bomb_count === - 1){

                bomb_count = 0;
            }

            cell.style.backgroundImage = "none";
            cell.style.backgroundImage = `url(/cellassets/hover.png)`;
            cell.classList.remove('flagged');
            bomb_count++;
            document.querySelector('#bombs-left').textContent = bomb_count;
        
    }
}

function handleWin() {
    updateScores(diffptr, time_count);
    resetTimer();
    alert("Congratulations! You've won!");
    revealBombs();
    makeUnclickable();
}

  

  function clickEvent(i, j) {
    // this will give us the specific cell that we want the event to be attached to
// my idea is to do BFS search and at each element the style will change and it will stop when it reaches the bound or a value that is not 0
    if (!time_started) {
        startTimer();
        time_started = true;
    }
    
    const cell = document.getElementById(`${i}-${j}`);


    // If this is a bomb, end the game
    if (matrix[i][j] === -1) {
        endGameLoss();
        resetTimer();
        return;
    }

    // Reveal the cell if it's not a bomb
    if (matrix[i][j] !== 0) { // Numbered cell
        cell.style.backgroundImage = "none";
        cell.style.backgroundImage = `url(/assets/${matrix[i][j]}.png)`;
        cell.onclick = null; // Prevent re-clicking
        tile_count--;
        
        // Check for win after decrementing
        if (tile_count === 0) handleWin();
    } else { // If it's an empty cell, clear surrounding cells
        clearEvent(i, j);
    }
    console.log(tile_count);
}


function clearEvent(i, j) {
    const queue = [[i, j]];

    if(matrix[i][j] !== 1)
    tile_count--; // Decrement for the first cell

    marked[i][j] = parseInt(1); // Mark starting cell as visited
    const cell = document.getElementById(`${i}-${j}`);
    cell.style.backgroundImage = "none";
    cell.style.backgroundImage = "url('/cellassets/clicked.png')";

    
    if (tile_count === 0) handleWin(); 

    while (queue.length > 0) {
        const [currentX, currentY] = queue.shift();

        // Define neighbors
        const directions = [
            [0, 1],   // right
            [1, 0],   // down
            [0, -1],  // left
            [-1, 0]   // up
        ];

        for (const [dx, dy] of directions) {
            const newX = currentX + dx;
            const newY = currentY + dy;

            if (inBound(newX, newY) && marked[newX][newY] !== parseInt(1) && matrix[newX][newY] !== parseInt(-1)) {

                marked[newX][newY] = parseInt(1); 
                const neighborCell = document.getElementById(`${newX}-${newY}`);

                if (matrix[newX][newY] === 0) {

                    queue.push([newX, newY]);
                    neighborCell.style.backgroundImage = "none";
                    neighborCell.style.backgroundImage = "url('/cellassets/clicked.png')";
                    
                    

                } else if (matrix[newX][newY] > 0) { 
                    neighborCell.style.backgroundImage = "none";
                    neighborCell.style.backgroundImage = `url(/assets/${matrix[newX][newY]}.png)`;
                    
                    
                }

                neighborCell.onclick = null;
                
                tile_count--;
                console.log(time_count);
                if (tile_count === 0) handleWin();
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
function endGameLoss(){//invoke when the player clicks on bomb
    //print to user that they lost , and reveal all bombs using the bomblocale matrix, 
    //make the play area uninteractable as the player lost and needs to start anew
    for(let i = 0 ; i < bomblocale.length; i++){

        let currentBombIndexI = bomblocale[i][0];
        let currentBombIndexJ = bomblocale[i][1];
       

        let currentBomb  = document.getElementById(`${currentBombIndexI}-${currentBombIndexJ}`);
        if(currentBomb === null){
            console.log(currentBombIndexI);
            console.log(currentBombIndexJ);
        }

        currentBomb.style.backgroundImage = "none";
        currentBomb.style.backgroundImage = "url('/assets/bomb.png')";

    }
    makeUnclickable();
    
}
function makeUnclickable(){// makes minefield unclickable , invoke upon victory or loss
    var tiles = document.querySelectorAll("td");
    tiles.forEach(function(currentTile) {
      currentTile.addEventListener('click', function(clickEvent) {

        clickEvent.preventDefault(); // prevents the default behaviour , so clicking wont do anything
        clickEvent.stopPropagation(); // to prevent side effects when going up the dom tree, i believe in our case its redundant but just in case

      });

      currentTile.style.pointerEvents = 'none'; //makes the mouse effectively ignore the tile
      currentTile.style.opacity = '0.5'; // make the tile dimmer as a visual indicator that the tile is unclickable

    });
  }
  


function revealBombs(){

    
    for(let i = 0 ; i < bomblocale.length ; i++ ){
        
        let currentBombIndexJ = bomblocale[i][1];
        let currentBombIndexI = bomblocale[i][0];
        
       
        let currentBomb  = document.getElementById(`${currentBombIndexI}-${currentBombIndexJ}`);

        currentBomb.style.backgroundImage = "none";
        currentBomb.style.backgroundImage = "url('/assets/bomb.png')";

    }


}


function handleVisibilityChange() {
    if (document.hidden) {
      console.log("Page is hidden");
      // Perform any actions needed when the page is not visible
      pauseTimer(); // Example: pause the timer if game needs to be paused
    } else {
      console.log("Page is visible");
      // Perform any actions needed when the page becomes visible
      startTimer(); // Example: resume the timer if the game should continue
    }
  }
  
  // Add event listener for visibility change
  




  
function clearMap() {
    
    const map = document.getElementById("map");
    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }
   
}