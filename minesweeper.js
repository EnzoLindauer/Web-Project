const matrix = [];

function generateMap(i,j){// i and j passed as arguements , they indicate the dimensions of the minesweeper map , passed per difficulty selection, I is rows and J is columns


    // i is rows, j is columns
for (let k = 0; k < i; k++) {
    matrix[k] = [];
    for (let p = 0; p < j; p++) {
        matrix[k][p] = 0;  // Initialize with zeros or any default value
        }
      }
      //console.log(matrix);


if (j === 9) {//easy, 10 mines
    
    for(let k = 0; k < 10; k++ ){
       let bombIndexI = getRandomInt(0,i-1);
       let bombIndexJ = getRandomInt(0,j-1);
       //console.log(bombIndexJ+ " j");
       //console.log(bombIndexI+ "I ");
        if (matrix[bombIndexI][bombIndexJ] === -1) {
            k--;
            continue;
    
        }

        matrix[bombIndexI][bombIndexJ] = -1;
        incrementSurrounding(bombIndexI, bombIndexJ);


    }
    


}else if(j === 16){//normal, 40 mines

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




}



 

function getRandomInt(min, max) {
    min = Math.ceil(min);    // Round up to include the min value
    max = Math.floor(max);    // Round down to include the max value
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function incrementSurrounding(i, j){

    let index_value;
    for(let x = -1; x < 2; x++){

        for(let y = -1; y < 2; y++){

            if((i + x >= 0  && i + x < matrix.length) && (j + y >= 0 &&  + y < matrix[0].length)){//if in the bound
                //console.log(i+x + " i+x");
                //console.log(i+y+ " i+y");
                index_value = matrix[i + x][j + y];
                if(!(index_value === matrix[i][j] || index_value === -1)){// if not in the bound or not bomb

                    matrix[i + x][i + y]++;
                }
            }
            
        }
    }
    
}
  
generateMap(9,9);
console.log(matrix);