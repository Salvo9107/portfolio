/*----- constants -----*/
const imgLookup = {
    0: {
        // default starting img
        imgUrl: "https://media2.giphy.com/media/MdSVuhz4ZKEMNHOTPX/giphy.gif?cid=ecf05e47bwskmzmsgrdfccxf9hz8w8xtpvek3mfp3y759wsl&rid=giphy.gif&ct=g"
    },
    r: {
        // img for rock
        imgUrl: "img/rock.png",
        // move rock can beat
        beats: "s"
    },
    p: {
        // img for paper
        imgUrl: "img/paper.png",
        // move paper can beat
        beats: "r"
    },
    s: {
        // img for scissors
        imgUrl: "img/scissors2.png",
        // move scissors can beat
        beats: "p"
    }
};
/*----- app's state (variables) -----*/
let winner, scores, imgPlayerMove, imgCpuMove, randomNumPLAYER, randomNumCPU;
/*----- cached element references -----*/
const btn = document.querySelector('main button');
const replayBtn = document.getElementById('replay');

// object for the cached score elements
const scoreEls = {
    p: document.getElementById('p-score'),
    t: document.getElementById('t-score'),
    c: document.getElementById('c-score'),
};

// object for the cached result elements
const resultEls = {
    p: document.getElementById('p-result'),
    c: document.getElementById('c-result'),
}

// msg element used to display who won
const msg = document.getElementById('msg-element');

/*----- event listeners -----*/
replayBtn.addEventListener('click', init);
btn.addEventListener('click', function handleMove(){
    // handleMove function will randomly (between 1 and 3, on dependance of total num of imgs) get a num for p and c move
    let possibleMoves = Object.keys(imgLookup).length;
    randomNumPLAYER = getRandomNum((possibleMoves / possibleMoves), possibleMoves);
    randomNumCPU = getRandomNum((possibleMoves / possibleMoves), possibleMoves);
    // if winner is true, stop the game else check if the next round winner is true
    if(winner)return;
    getWinnerRound(randomNumPLAYER, randomNumCPU);
    render();
});
/*----- functions -----*/
init();

function init(){
    winner = null;
    scores = {
        p: 0,
        c: 0,
        t: 0
    };
    randomNumPLAYER = 0;
    randomNumCPU = 0;
    render();
}

function render(){
    // render player score, cpu score, ties
    for (let score in scores){
        scoreEls[score].textContent = scores[score];
    }
    // scoreEls.p.innerHTML = scores.p;
    // // render cpu score
    // scoreEls.c.innerHTML = scores.c;
    // // render ties
    // scoreEls.t.innerHTML = scores.t;
    
    // render img for PLAYER
    imgPlayerMove = Object.values(imgLookup)[randomNumPLAYER].imgUrl;
    resultEls.p.src = imgPlayerMove;
    // render img for CPU
    imgCpuMove = Object.values(imgLookup)[randomNumCPU].imgUrl;
    resultEls.c.src = imgCpuMove;

    // render replay button display none
    replayBtn.style.display = "none";

    // render border around the imgs white
    for (let result in resultEls){
        resultEls[result].style.borderColor = "white";
    }
    
    if(winner){
        if(winner === `Player`){
            msg.innerHTML = `${winner.toUpperCase()} wins the Game!`;
            resultEls.p.src = "https://media4.giphy.com/media/JQQwgVUMDIyAM/giphy.gif?cid=ecf05e47444e5y0jp7ns2jo5ayeegsk8pldx7txy6b0rkj8j&rid=giphy.gif&ct=g";
            resultEls.c.src = "https://media2.giphy.com/media/KbZEMiWBFdynuQUobJ/giphy.gif?cid=790b7611c99bdbeb07d648ce566395a42edc8c07dbe922d2&rid=giphy.gif&ct=g";
            resultEls.p.style.borderColor = "grey";
        } else if(winner === `Cpu`){
            msg.innerHTML = `${winner.toUpperCase()} wins the Game!`;
            resultEls.c.src = "https://media4.giphy.com/media/JQQwgVUMDIyAM/giphy.gif?cid=ecf05e47444e5y0jp7ns2jo5ayeegsk8pldx7txy6b0rkj8j&rid=giphy.gif&ct=g"       
            resultEls.p.src = "https://media2.giphy.com/media/KbZEMiWBFdynuQUobJ/giphy.gif?cid=790b7611c99bdbeb07d648ce566395a42edc8c07dbe922d2&rid=giphy.gif&ct=g";
            resultEls.c.style.borderColor = "grey";
        }

        replayBtn.style.display = "block";
    }
}

function getRandomNum(min, max){
    return move = Math.floor(Math.random() * (max - min) + min);
}

// getWinnerRound contains adding points logic  
// parameter(num): p move and c move
function getWinnerRound(lookupPLAYERmoveIndex, lookupCPUmoveIndex){
    let winner = null;
    // for winning this round reach winningPoints
    const winningPoints = 3;

    // determin which move the p does
    const playerMove = Object.keys(imgLookup)[lookupPLAYERmoveIndex];
    // determin which move p can beat to win
    const movePlayerCanBeat = Object.values(imgLookup)[lookupPLAYERmoveIndex].beats;

    // determin which move the c does
    const cpuMove = Object.keys(imgLookup)[lookupCPUmoveIndex];
    // determin which move c can beat to win
    const moveCpuCanBeat = Object.values(imgLookup)[lookupCPUmoveIndex].beats;

    // if move the p can beat === move c did -> p scores 1 point
    if(movePlayerCanBeat === cpuMove){
        scores.p += 1;
    // if move the c can beat === move p did -> c scores 1 point
    }else if(moveCpuCanBeat === playerMove){
        scores.c += 1;
    // else its a tie
    }else{
        scores.t += 1;
    }
    // if points to win are reached, winner found
    checkWinner(winningPoints);
    return winner;
}

// checkWinner contains winner logic  
function checkWinner(pointsToWin){
    if(scores.p === pointsToWin){
        winner = `Player`;
        return winner;
    }else if(scores.c === pointsToWin){
        winner = `Cpu`;
        return winner;
    }
}

