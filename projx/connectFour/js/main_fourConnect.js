console.log('ready');
/*----- constants -----*/
const colorLookup = {
    "0": "white", //empty
    "1": "purple", //player1
    "-1": "green",  //player2
};

const playerLookup = {
    "1": "inputName1",
    "-1": "inputName2"
};


/*----- app's state (variables) -----*/
let board, turn, winner, inputName1, inputName2;


/*----- cached element references -----*/
const msgEl = document.getElementById("msg");
const markerEls = [...document.querySelectorAll("#markers > div")]; // OR markerEls = Array.from(document.querySelectorAll("#markers > div")];
const replayBtn = document.querySelector("button");



/*----- event listeners -----*/
document.getElementById("markers")
    .addEventListener("click", handleDrop);

replayBtn.addEventListener("click", init);



/*----- functions -----*/
init();

function handleDrop(event){
    //let a = event.target;
    //a marker has been clicked, update all
    //impacted state, call render
    
    //get the index of the clicked marker (col)
    const colIdx = markerEls.indexOf(event.target);
    if (colIdx === -1 || winner) return;
    const colArr = board[colIdx];
    //Find the first open cell (0) in the colArr
    const rowIdx = colArr.indexOf(0);
    //console.log(rowIdx);
    if (rowIdx === -1)return;
    colArr[rowIdx] = turn;
    turn *= -1;
    //console.log(colArr[rowIdx]);
    winner = getWinner();
    render();
}

function getWinner(){
    let winner = null;
    for (let colIdx = 0; colIdx <= 6; colIdx++){        
        winner = checkCol(colIdx);
        if (winner) break;
    }
    // TODO: Add tie logic
    return winner;
}

function checkCol(colIdx){
    const colArr = board[colIdx];
    for (let rowIdx = 0; rowIdx < colArr.length; rowIdx++){
        let winner = checkUp(colArr, rowIdx) || checkRight(colIdx, rowIdx) 
            || checkDiag(colIdx, rowIdx, 1) || checkDiag(colIdx, rowIdx, -1);
        if (winner) return winner;
    }
    return null;
}

function checkUp(colArr, rowIdx){
    //Boundary check
    if(rowIdx > 2) return null;
    if(Math.abs(colArr[rowIdx] + colArr[rowIdx + 1] 
        + colArr[rowIdx + 2] + colArr[rowIdx + 3]) === 4) {
        return colArr[rowIdx];
    } else {
        return null;
    }
}

function checkRight(colIdx, rowIdx){
    //Boundary check
    if(colIdx > 3) return null;
    const total = board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx]
    + board[colIdx + 3][rowIdx];
    if(Math.abs(total) === 4) {
        return board[colIdx][rowIdx];
    } else {
        return null;
    }
}

function checkDiag(colIdx, rowIdx, dir){
    //Boundary check
    if(dir > 0 && colIdx > 3 || dir > 0 && rowIdx > 2) return null;
    if(dir < 0 && colIdx > 3 || dir < 0 && rowIdx < 3) return null;
    const total = board[colIdx][rowIdx] + board[colIdx + 1][rowIdx + dir] + board[colIdx + 2][rowIdx + dir * 2]
    + board[colIdx + 3][rowIdx + dir * 3];
    if(Math.abs(total) === 4) {
        return board[colIdx][rowIdx];
    } else {
        return null;
    }
}

function init(){

    // Initialize all state

    board = [
        [0, 0, 0, 0, 0, 0],  // Colomn 0
        [0, 0, 0, 0, 0, 0],  // Colomn 1
        [0, 0, 0, 0, 0, 0],  // Colomn 2
        [0, 0, 0, 0, 0, 0],  // Colomn 3
        [0, 0, 0, 0, 0, 0],  // Colomn 4
        [0, 0, 0, 0, 0, 0],  // Colomn 5
        [0, 0, 0, 0, 0, 0]   // Colomn 6
    ];

    turn = 1;
    winner = null;
    inputName1 = prompt('PLAYER 1, Please enter your name here');
    inputName2 = prompt('PLAYER 2, Please enter your name here');
    setPlayerName(inputName1, inputName2);
    render();
}

function setPlayerName(player1, player2){
    playerLookup["1"] = player1;
    playerLookup["-1"] = player2;
}

function render(){
    // render the board
    board.forEach(function (colArr, colIdx){
        //console.log(colIdx,colArr);
        // iterate over the colArr to access the cell
        //<conditional expression> ? <truthy val> : <falsey val>;
        markerEls[colIdx].style.visibility = colArr.includes(0) ? "visible" : "hidden";

        colArr.forEach(function(cellValue, rowIdx){
            //console.log(rowIdx,cellValue);
            // select the correct div for this cellValue
            const div = document.getElementById(`c${colIdx}r${rowIdx}`);
            div.style.backgroundColor = colorLookup[cellValue];
            //console.log(div);
        });
    });

    // Render a message
    if (winner === "T"){
        msgEl.textContent = "It's a Tie!!!";
    } else if (winner){
        // a player has won
        msgEl.innerHTML = `<span style="color: ${colorLookup[winner]}">${playerLookup[winner].toUpperCase()}</span> Wins!`;
        
    } else {
        // no winner jet, show who's next
        msgEl.innerHTML = `<span style="color: ${colorLookup[turn]}">${playerLookup[turn].toUpperCase()}</span>'s Turn!`;
    }   
    //set button for replay to visible or hidden IF winner is true (no longer null)
    replayBtn.style.visibility = winner ? "visible" : "hidden";
}



