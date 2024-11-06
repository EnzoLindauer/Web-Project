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



var mineAmmount ;
if (j === 9) {//easy, 10 mines
    mineAmmount = 10;
}else if(j === 16){//normal, 40 mines
<<<<<<< HEAD

    for(let k = 0; k < 40; k++ ){
        let bombIndexI = getRandomInt(0,i-1);
        let bombIndexJ = getRandomInt(0,j-1);
        
         if (matrix[bombIndexI][bombIndexJ] === -1) {
             k--;
             continue;
     
         }
 
         matrix[bombIndexI][bombIndexJ] = -1;
         incrementSurrounding(bombIndexI, bombIndexJ);
 
 
     }
     

}else{//expert/ 99 mines

    for(let k = 0; k < 99; k++ ){
        let bombIndexI = getRandomInt(0,i-1);
        let bombIndexJ = getRandomInt(0,j-1);
        
         if (matrix[bombIndexI][bombIndexJ] === -1) {
             k--;
             continue;
     
         }
 
         matrix[bombIndexI][bombIndexJ] = -1;
         incrementSurrounding(bombIndexI, bombIndexJ);
 
 
 
     }
     
     

}

printMap(i, j);
=======
    mineAmmount = 40;
}else{//expert 99 mines
    mineAmmount = 99;
}

for(let k = 0; k < parseInt(mineAmmount); k++ ){
    let bombIndexI = getRandomInt(0,i-1);
    let bombIndexJ = getRandomInt(0,j-1);
    
     if (parseInt(matrix[bombIndexI][bombIndexJ]) === parseInt(-1)) {
         k--;
         continue;
 
     }

     matrix[bombIndexI][bombIndexJ] = parseInt(-1);
     incrementSurrounding(parseInt(bombIndexI), parseInt(bombIndexJ));




 }


>>>>>>> 4046e473761f64fbf9bab87dc69c4ea632001f57


}

function printMap(i, j){

    const table = document.createElement("table");

    for(let x = 0; x < i; x++){
        const row = document.createElement("tr");
        row.id = `${x}`;
        for(let y = 0; y < j; y++){

            const cell = document.createElement("td");
            cell.id = `${x}-${y}`;
            row.appendChild(cell);

            cell.style.border = "1px solid black";
            cell.style.padding = "10px";
        }
        table.appendChild(row);
    }
    const map = document.getElementById("map"); // MUST HAVE THE DIV ID BE MAP THAT WILL BE WHERE WE PLACE THE MAP
    map.appendChild(table);
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
  
generateMap(9,9);
console.log(matrix);