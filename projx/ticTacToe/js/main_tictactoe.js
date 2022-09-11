/*----- constants -----*/
colorLookup = {
    "0" : "white",
    "1" : "blue", //"bluecircle.png"
    "-1" : "red" //"redcross.png"
};

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const plyrMsg = document.getElementById("player-turn");
const divEls = Array.from(document.querySelectorAll("#board > div"));
const replayBtn = document.querySelector("button");
//console.log(divEls);
/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", handleSqr);
replayBtn.addEventListener("click", init);

/*----- functions -----*/

init();
// set init()
function init(){
//set board, turn, winner
    board = [
        [0, 0, 0],//column 0
        [0, 0, 0],//column 1
        [0, 0, 0] //column 2
    ];

    turn = 1;
    winner = null;

    //get render()
    render();
}

function handleSqr(event){
    //when square is clicked, update impacted state then call render
    //get index of the clicked square (col)
    let colIdx = divEls.indexOf(event.target);
    let rowIdx = divEls.indexOf(event.target);

    if(colIdx === 0 || colIdx === 3 || colIdx === 6){
        colIdx = 0;
    } else if(colIdx === 1 || colIdx === 4 || colIdx === 7){
        colIdx = 1;
    } else if(colIdx === 2 || colIdx === 5 || colIdx === 8){
        colIdx = 2;
    } else if(colIdx === -1) {
        return;
    }
    
    //get index of the clicked square (row)
    if(rowIdx === 0 || rowIdx === 1 || rowIdx === 2){
        rowIdx = 2;
    } else if(rowIdx === 3 || rowIdx === 4 || rowIdx === 5){
        rowIdx = 1;
    } else if(rowIdx === 6 || rowIdx === 7 || rowIdx === 8){
        rowIdx = 0;
    } else if(rowIdx === -1) {
        return;
    }
    // if winner true board no more clickable
    if(winner) return;

    //console.log(colIdx,rowIdx);
    //console.log(colIdx,rowIdx);
    //check if square is taken (1 or -1) if true do nothing, square no more clickable
    if(board[colIdx][rowIdx] === 1 || board[colIdx][rowIdx] === -1)return;
    //update impacted state
    board[colIdx][rowIdx] = turn;
    turn *= -1;
    //console.log(colIdx,rowIdx);
    //if winner, board no more clickable
    winner = getWinner();
    render();
}
    //set getWinner()
    function getWinner(){
        let winner = null;
        //get winner in column
        for(let colIdx = 0; colIdx <= 2; colIdx++){
            winner = checkCol(colIdx);
            //console.log(board[colIdx]);
            //if winner break out of loop
            if(winner) break;
            if(!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) return winner = "T";
        }
        return winner;
    }

    function checkCol(colIdx){
        const colArr = board[colIdx];
        for(let rowIdx = 0; rowIdx < colArr.length; rowIdx++){
            let winner = checkUp(colArr, rowIdx) || checkRight(colIdx, rowIdx) || checkDiagUp(colIdx, rowIdx) || checkDiagDown(colIdx, rowIdx);
            if (winner) return winner;
        }
        return null;
    }

    function checkUp(colArr, rowIdx){
        if (rowIdx > 0) return null;
        if(Math.abs(colArr[rowIdx] + colArr[rowIdx + 1] + colArr[rowIdx + 2]) === 3){
            return colArr[rowIdx];
        } else {
            return null;
        }
    }

    function checkRight(colIdx, rowIdx){
        if (colIdx > 0) return null;
        if(Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx]) === 3){
            return board[colIdx][rowIdx];
        } else {
            return null;
        }
    }

    function checkDiagUp(colIdx, rowIdx){
        if (colIdx != 0 || rowIdx != 0) return null;
        if(Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3){
            return board[colIdx][rowIdx];
        } else {
            return null;
        }
    }

    function checkDiagDown(colIdx, rowIdx){
        if(colIdx != 0 || rowIdx != 2) return null;
        if(Math.abs(board[0][2] + board[1][1] + board[2][0]) === 3){
            return board[colIdx][rowIdx];
        } else {
            return null;
        }
    }

//set render()
function render(){
    //render the board
    //access column Array and Index
    board.forEach(function(colArr, colIdx) {
        //console.log(colArr, colIdx);
        //access elements of the column Array and Index
        colArr.forEach(function(cellValue, rowIdx){
            //console.log(cellValue, rowIdx);
            const div = document.getElementById(`c${colIdx}r${rowIdx}`);
            //console.log(div);
            div.style.backgroundColor = colorLookup[cellValue];
        });
    });
    
    //render a msg players turn, game tie, player win
    if (winner === "T"){
        // game tie
        let tie = "It's a Tie!!!";
        plyrMsg.innerHTML = tie.toUpperCase();
        replayBtn.style.visibility = "visible";
    } else if (winner){
        //player win
        plyrMsg.innerHTML = `<span style = "color : ${colorLookup[winner]}">${colorLookup[winner].toUpperCase()}</span> WINS`;
        replayBtn.style.visibility = "visible";
    } else {
        //no winner yet, whos turn is it
        plyrMsg.innerHTML = `<span style = "color : ${colorLookup[turn]}">${colorLookup[turn].toUpperCase()}</span>'s turn`;
        replayBtn.style.visibility = "hidden";
    }
}
    
