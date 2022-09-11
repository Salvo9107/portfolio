
// Starting point at line 2457 -> init()

/*----- constants -----*/

// Object for all chess pieces (black and white)
const PIECES = {
    id : {
        //BLACK (-b)
        'tb': "url('chessPieces/black/tb.png')", // t-turm
        'sb': "url('chessPieces/black/sb.png')", // s-springer
        'lb': "url('chessPieces/black/lb.png')", // l-läufer
        'db': "url('chessPieces/black/db.png')", // d-dame
        'kb': "url('chessPieces/black/kb.png')", // k-könig
        'bb': "url('chessPieces/black/bb.png')", // b-bauer
    
        //WHITE (-w)
        'tw': "url('chessPieces/white/tw.png')",
        'sw': "url('chessPieces/white/sw.png')",
        'lw': "url('chessPieces/white/lw.png')",
        'dw': "url('chessPieces/white/qw.png')",
        'kw': "url('chessPieces/white/kw.png')",
        'pw': "url('chessPieces/white/pw.png')", // p-pawn
        '': '',
    },
    countTurnsForEnpassant: 0,
    isSelected: false,
    arrStartPos: [],
    divStartPos: [],
    arrMovedTo: [],
    arrPossibleMoves: [],
    arrPossibleAttacs: [],
    arrEnpassant: [],
    arrSelectedPiece: [],
    arrAllMoves: [],
    
    // DISPLAY SELECTED SQUARE
    selectSqr: function(divEls, arrBoard, colIdx, rowIdx, arrStartPos){
        if(arrBoard[colIdx][rowIdx] === "") return;
        const divStartPos = arrStartPos.map((startDiv) => document.getElementById(startDiv));     
        console.log('divStartPos', divStartPos);
        if(!sqrSelected(divEls)){
            console.log('square selected', !sqrSelected(divEls));
            divStartPos[0].classList.add('select');
        }  
    },
    // DISPLAY UNSELECTD SQUARE
    deSelectSqr: function(divEls, arrBoard, colIdx, rowIdx, arrStartPos){
        const divStartPos = arrStartPos.map((startDiv) => document.getElementById(startDiv));   
        console.log('are sqr selected', sqrSelected(divEls));
        if(sqrSelected(divEls)){
            divStartPos[0].classList.remove('select');
        }
    },
    // GET ALL INFORMATION OF THE SELECTED PIECE
    inspectPiece: function(arrBoard, colIdx, rowIdx, selectSquare, arrAllMoves){
        const pieceOnBoard = arrBoard[colIdx][rowIdx];
        let PIECE_OBJECT = this[pieceOnBoard];
        console.log(colIdx, rowIdx, arrBoard, pieceOnBoard);
        if (!arrBoard[colIdx][rowIdx]){
            this.setToDeselected();
            return;
        } else {
            let PIECE_ID = PIECE_OBJECT.id = `${arrBoard[colIdx][rowIdx]}-c${colIdx}r${rowIdx}`;
        }
        console.log(`selected Piece: ${this.isSelected}`);
        const piecePosCol = this.getPositionCol(arrBoard, colIdx, rowIdx);
        const piecePosRow = this.getPositionRow(arrBoard, colIdx, rowIdx);
        this.getIsFirstMove(PIECE_OBJECT, arrBoard, colIdx, rowIdx);
        // console.log(this, arrBoard, colIdx, rowIdx);
        // console.log(`${PIECE_ID} is first Move: ${PIECE_OBJECT.isFirstMove}`);
        this.getIdxOfObstacleOnPath(arrBoard, colIdx, rowIdx);
        this.getStepsToBoundary(arrBoard, colIdx, rowIdx);
        // this.getAllpossibleMoves(divEls, PIECE_OBJECT, arrBoard, piecePosCol, piecePosRow, arrAllMoves);
        this.arrPossibleMoves = PIECE_OBJECT.movePossibilities(piecePosCol, piecePosRow);
        this.arrPossibleAttacs = PIECE_OBJECT.attacPossibilities(arrBoard, piecePosCol, piecePosRow);
        console.log('arrPossibleMoves', this.arrPossibleMoves, 'arrPossibleAttacs', this.arrPossibleAttacs);
        // console.log('PIECE_OBJECT',PIECE_OBJECT);
        return this.arrAllMoves;
    },
    // START MOVES FUNCTIONS =============================================================================================================
    // BLACK PIECES 
    movePossibilitiesTop_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol}r${parsedPosRow += 1}`);
        }

        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        this.arrMoveToEmptySqrs(arrDivs);
    },
    movePossibilitiesDiagUpRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            // console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            // console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesDiagDownRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesBottom_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol}r${parsedPosRow -= 1}`);
        }
        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        PIECES.arrMoveToEmptySqrs(arrDivs);
    },
    movePossibilitiesDiagDownLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            // console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesDiagUpLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    // WHITE PIECES MOVES
    movePossibilitiesTop_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol}r${parsedPosRow -= 1}`);
        }
        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        PIECES.arrMoveToEmptySqrs(arrDivs);
    },
    movePossibilitiesDiagUpRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesDiagDownRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesBottom_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol}r${parsedPosRow += 1}`);
        }
        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        PIECES.arrMoveToEmptySqrs(arrDivs);
    },
    movePossibilitiesDiagDownLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    movePossibilitiesDiagUpLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            console.log(arrDivs);
            this.arrMoveToEmptySqrs(arrDivs);
        }
    },
    // FOR BOTH
    movePossibilitiesLeft: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow}`);
        }
        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        PIECES.arrMoveToEmptySqrs(arrDivs);
    },
    movePossibilitiesRight: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceSteps){
        let arrSquares = [];
        for(let i = 0; i < pieceSteps; i++){
            arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow}`);
        }
        let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
        PIECES.arrMoveToEmptySqrs(arrDivs);
    },
    // CASTLING
    castlingLeft: function(castlingId){
        return PIECES.arrPossibleMoves.push(castlingId);
    },
    castlingRight: function(castlingId){
        return PIECES.arrPossibleMoves.push(castlingId);
    },
    // END MOVE FUNCTIONS =============================================================================================================
    
    // START CAPTURE FUNCTIONS =============================================================================================================
    // BLACK PIECES 
    attacPossibilitiesUp_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxUp < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxUp < 0 || PIECE_OBJECT.enemyIdxUp < PIECE_OBJECT.obstacleIdxUp){
                arrSquares.push(`c${parsedPosCol}r${parsedPosRow + (pieceStepsToEnemy + 1)}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagUpRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        }
        console.log('possible attacs', this.arrPossibleAttacs);
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxRigth < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxRight < 0 || PIECE_OBJECT.enemyIdxRigth < PIECE_OBJECT.obstacleIdxRight){
                arrSquares.push(`c${parsedPosCol + (pieceStepsToEnemy + 1)}r${parsedPosRow}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagDownRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        }
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesBottom_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxBottom < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxBottom < 0 || PIECE_OBJECT.enemyIdxBottom > PIECE_OBJECT.obstacleIdxBottom){
                arrSquares.push(`c${parsedPosCol}r${parsedPosRow - (pieceStepsToEnemy + 1)}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagDownLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        }
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxLeft < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxLeft < 0 || PIECE_OBJECT.enemyIdxLeft > PIECE_OBJECT.obstacleIdxLeft){
                arrSquares.push(`c${parsedPosCol - (pieceStepsToEnemy + 1)}r${parsedPosRow}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagUpLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_BLACK(attacArrDivs);
        }
        console.log('possible attacs', this.arrPossibleAttacs);
        return this.arrPossibleAttacs;
    },

    // WHITE PIECES MOVES
    attacPossibilitiesUp_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxUp < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxUp < 0 || PIECE_OBJECT.enemyIdxUp > PIECE_OBJECT.obstacleIdxUp){
                arrSquares.push(`c${parsedPosCol}r${parsedPosRow - (pieceStepsToEnemy + 1)}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagUpRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        }
        console.log('possible attacs', this.arrPossibleAttacs);
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxRigth < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxRight < 0 || PIECE_OBJECT.enemyIdxRigth < PIECE_OBJECT.obstacleIdxRight){
                arrSquares.push(`c${parsedPosCol + (pieceStepsToEnemy + 1)}r${parsedPosRow}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagDownRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsRight){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryRight){
            for(let i = 0; i < pieceStepsRight; i++){
                arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        }
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesBottom_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.enemyIdxBottom < 0){
            return;
        } else {
            if(PIECE_OBJECT.obstacleIdxBottom < 0 || PIECE_OBJECT.enemyIdxBottom < PIECE_OBJECT.obstacleIdxBottom){
                arrSquares.push(`c${parsedPosCol}r${parsedPosRow + (pieceStepsToEnemy + 1)}`);
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                return this.arrPossibleAttacs;
            } else {
                return;
            }
        }
    },
    attacPossibilitiesDiagDownLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsBottom, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryBottom === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsBottom; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryBottom > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        }
        return this.arrPossibleAttacs;
    },
    attacPossibilitiesLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsToEnemy){
        let arrSquares = [];
        if(PIECE_OBJECT.obstacleIdxLeft > PIECE_OBJECT.enemyIdxLeft || PIECE_OBJECT.enemyIdxLeft === -1){
            return;
        } else {
            arrSquares.push(`c${parsedPosCol - (pieceStepsToEnemy + 1)}r${parsedPosRow}`);
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
            return this.arrPossibleAttacs;
        }
    },
    attacPossibilitiesDiagUpLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
        let arrSquares = [];
        if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsUp; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
            for(let i = 0; i < pieceStepsLeft; i++){
                arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                // console.log(arrSquares);
            }
            let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
            this.arrAttacTakenSqr_WHITE(attacArrDivs);
        }
        console.log('possible attacs', this.arrPossibleAttacs);
        return this.arrPossibleAttacs;
    },
    // END CAPTURE FUNCTIONS =============================================================================================================
    
    // DISPLAY ALL POSSIBLE MOVES / ATTACS
    showSteps: function(arrPossibleMoves, arrPossibleAttacs){
        this.showStepsMove(arrPossibleMoves);
        this.showStepsAttac(arrPossibleAttacs);
    },
    showStepsMove: function(arrPossibleMoves){
        console.log(arrPossibleMoves);
        if(!this.arrPossibleMoves){
            return;
        } else {
            for(let i = 0; i < arrPossibleMoves.length; i++){
                document.getElementById(arrPossibleMoves[i]).classList.add('move-possibilities');
                this.arrAllMoves.unshift(arrPossibleMoves[i]);
            }
        }      
    },
    showStepsAttac: function (arrPossibleAttacs){
        if(!this.arrPossibleAttacs){
            return;
        } else {
            for(let i = 0; i < arrPossibleAttacs.length; i++){
                document.getElementById(arrPossibleAttacs[i]).classList.add('attac');  
                this.arrAllMoves.unshift(arrPossibleAttacs[i]);
            }
        }
    },

    //DELETE STEPS
    deleteSteps: function(arrPossibleMoves, arrPossibleAttacs){
        this.deleteStepsMove(arrPossibleMoves);
        this.deleteStepsAttac(arrPossibleAttacs);
    },
    deleteStepsMove: function(arrPossibleMoves){
        if(!this.arrPossibleMoves){
            return;
        } else {
            for(let i = 0; i < arrPossibleMoves.length; i++){
                document.getElementById(arrPossibleMoves[i]).classList.remove('move-possibilities');
            }
        }
        
    },
    deleteStepsAttac: function (arrPossibleAttacs){
        if(!this.arrPossibleAttacs){
            return;
        } else {
            for(let i = 0; i < arrPossibleAttacs.length; i++){
                document.getElementById(arrPossibleAttacs[i]).classList.remove('attac');  
            }
            // if(turn === 1 && PIECE_OBJECT.id[0] !== 'b'){
            //     if(PIECES.arrEnpassant.length){
            //         PIECES.arrEnpassant.shift();
            //         console.log('arrEnpassant', PIECES.arrEnpassant);
            //         return PIECES.arrEnpassant;
            //     }
            // } else if(turn === -1 && PIECE_OBJECT.id[0] !== 'p'){
            //     if(PIECES.arrEnpassant.length){
            //         PIECES.arrEnpassant.shift();
            //         console.log('arrEnpassant', PIECES.arrEnpassant);
            //         return PIECES.arrEnpassant;
            //     }
            // }
        }
    },
    
    
    getId: function(){},

    getPositionCol: function(arr, colIdx, rowIdx){
        const pieceOnBoard = arr[colIdx][rowIdx];
        let PIECE_OBJECT = this[pieceOnBoard];
        PIECE_OBJECT.positionCol = parseInt(colIdx);
        return colIdx;
    },
    getPositionRow: function(arr, colIdx, rowIdx){
        const pieceOnBoard = arr[colIdx][rowIdx];
        let PIECE_OBJECT = this[pieceOnBoard];
        PIECE_OBJECT.positionRow = parseInt(rowIdx);
        return rowIdx;
    },
    getIdxOfObstacleOnPath: function(arr, positionCol, positionRow){
        let parsedPositionCol = parseInt(positionCol);
        let parsedPositionRow = parseInt(positionRow);
        const pieceOnBoard = arr[parsedPositionCol][parsedPositionRow];
        let PIECE_OBJECT = this[pieceOnBoard];
        let colArr = arr[parsedPositionCol];
        switch(pieceOnBoard.includes('b')){
            case true:
                this.getIdxEnemyUp_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyBottom_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyLeft_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyRight_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);

                this.getStepsBtwEnemy(pieceOnBoard, PIECE_OBJECT); 

                this.getIdxObstacleUp_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleBottom_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleLeft_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleRight_BLACK(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);

                this.getStepsBtwObstacle(pieceOnBoard, PIECE_OBJECT); 
                break;     
                                    
            case false:
                this.getIdxEnemyUp_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyBottom_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyLeft_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxEnemyRight_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);

                this.getStepsBtwEnemy(pieceOnBoard, PIECE_OBJECT); 

                this.getIdxObstacleUp_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleBottom_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleLeft_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);
                this.getIdxObstacleRight_WHITE(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr);

                this.getStepsBtwObstacle(pieceOnBoard, PIECE_OBJECT); 
                break;   
                
            case '':
                return;
        }
    },

    // GET INDEX FOR BLACK PIECES =============================================================================================================
    getIdxEnemyUp_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow + 1; i < colArr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(colArr[i].includes('w')){
                PIECE_OBJECT.enemyIdxUp = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxUp = -1;
            }
        }
    },
    getIdxEnemyBottom_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(colArr[i].includes('w')){
                PIECE_OBJECT.enemyIdxBottom = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxBottom = -1;
            }
        }
    },
    getIdxEnemyLeft_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('w')){
                PIECE_OBJECT.enemyIdxLeft = i;
                // console.log(PIECE_OBJECT.enemyIdxLeft);
                break;
            } else {
                PIECE_OBJECT.enemyIdxLeft = -1;
            }
        }
        if(parsedPositionCol === 0){
            PIECE_OBJECT.enemyIdxLeft = -1;
        }
    },
    getIdxEnemyRight_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){ 
        for(let i = parsedPositionCol + 1; i < arr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('w')){
                PIECE_OBJECT.enemyIdxRigth = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxRigth = -1;
            }
        }
        if(parsedPositionCol === 7){
            PIECE_OBJECT.enemyIdxRigth = -1;
        }
    },

    getIdxObstacleUp_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow + 1; i < colArr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('bb'));
            if(colArr[i].includes('b')){
                PIECE_OBJECT.obstacleIdxUp = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxUp = -1;
            }
        }
    },
    getIdxObstacleBottom_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('bb'));
            if(colArr[i].includes('b')){
                PIECE_OBJECT.obstacleIdxBottom = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxBottom = -1;
            }
        }
    },
    getIdxObstacleLeft_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('b')){
                PIECE_OBJECT.obstacleIdxLeft = i;
                console.log(PIECE_OBJECT.obstacleIdxLeft);
                break;
            } else {
                PIECE_OBJECT.obstacleIdxLeft = -1;
            }
        }
    },
    getIdxObstacleRight_BLACK: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol + 1; i < arr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('b')){
                PIECE_OBJECT.obstacleIdxRight = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxRight = -1;
            }
        }     
    },

    // GET INDEX FOR WHITE PIECES =============================================================================================================
    getIdxEnemyUp_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('bb'));
            if(colArr[i].includes('b')){
                PIECE_OBJECT.enemyIdxUp = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxUp = -1;
            }
        }
    },
    getIdxEnemyBottom_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow + 1; i < colArr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('bb'));
            if(colArr[i].includes('b')){
                PIECE_OBJECT.enemyIdxBottom = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxBottom = -1;
            }
        }
    },
    getIdxEnemyLeft_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('b')){
                PIECE_OBJECT.enemyIdxLeft = i;
                console.log(PIECE_OBJECT.enemyIdxLeft);
                break;
            } else {
                PIECE_OBJECT.enemyIdxLeft = -1;
            }
        }
        if(parsedPositionCol === 0){
            PIECE_OBJECT.enemyIdxLeft = -1;
        }
    },
    getIdxEnemyRight_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol + 1; i < arr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('b')){
                PIECE_OBJECT.enemyIdxRigth = i;
                break;
            } else {
                PIECE_OBJECT.enemyIdxRigth = -1;
            }
        }
        if(parsedPositionCol === 7){
            PIECE_OBJECT.enemyIdxRigth = -1;
        }
    },

    getIdxObstacleUp_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(colArr[i].includes('w')){
                PIECE_OBJECT.obstacleIdxUp = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxUp = -1;
            }
        }
    },
    getIdxObstacleBottom_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionRow + 1; i < colArr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(colArr[i].includes('w')){
                PIECE_OBJECT.obstacleIdxBottom = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxBottom = -1;
            }
        }
    },
    getIdxObstacleLeft_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol - 1; i > -1; i--){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('w')){
                PIECE_OBJECT.obstacleIdxLeft = i;
                console.log(PIECE_OBJECT.obstacleIdxLeft);
                break;
            } else {
                PIECE_OBJECT.obstacleIdxLeft = -1;
            }
        }
    },
    getIdxObstacleRight_WHITE: function(arr, parsedPositionCol, parsedPositionRow, pieceOnBoard, PIECE_OBJECT, colArr){
        for(let i = parsedPositionCol + 1; i < arr.length; i++){
            // console.log(i, colArr[i], colArr[i].includes('w'));
            if(arr[i][parsedPositionRow].includes('w')){
                PIECE_OBJECT.obstacleIdxRight = i;
                break;
            } else {
                PIECE_OBJECT.obstacleIdxRight = -1;
            }
        } 
    },

    // =============================================================================================================
    // CALCULATE STEPS TO ENEMY / OWN PIECE
    getStepsBtwEnemy: function(pieceOnBoard, PIECE_OBJECT){
        switch (pieceOnBoard.includes('b')) {
            case true:
                this.getStepsEnemyUp_BLACK(pieceOnBoard, PIECE_OBJECT);
                this.getStepsEnemyBottom_BLACK(pieceOnBoard, PIECE_OBJECT);
                this.getStepsEnemyLeft(pieceOnBoard, PIECE_OBJECT);
                this.getStepsEnemyRight(pieceOnBoard, PIECE_OBJECT);
                break;
                case false:
                    this.getStepsEnemyUp_WHITE(pieceOnBoard, PIECE_OBJECT);
                    this.getStepsEnemyBottom_WHITE(pieceOnBoard, PIECE_OBJECT);
                    this.getStepsEnemyLeft(pieceOnBoard, PIECE_OBJECT);
                    this.getStepsEnemyRight(pieceOnBoard, PIECE_OBJECT);
                    break;
                    case '':
                        console.log('nothing');
                        return;
        }
    },
    getStepsEnemyUp_BLACK: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxUp > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwEnemyUp = (PIECE_OBJECT.enemyIdxUp - PIECE_OBJECT.positionRow) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyUp = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyUp;
    },
    getStepsEnemyBottom_BLACK: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxBottom > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwEnemyBottom = (PIECE_OBJECT.positionRow - PIECE_OBJECT.enemyIdxBottom) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyBottom = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyBottom;
    },
    getStepsEnemyLeft: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxLeft > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            // console.log(PIECE_OBJECT.positionCol, PIECE_OBJECT.enemyIdxLeft);
            PIECE_OBJECT.stepsBtwEnemyLeft = (PIECE_OBJECT.positionCol - PIECE_OBJECT.enemyIdxLeft) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyLeft = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyLeft;
    },
    getStepsEnemyRight: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxRigth > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            console.log(PIECE_OBJECT.positionCol, PIECE_OBJECT.enemyIdxRigth);
            PIECE_OBJECT.stepsBtwEnemyRight = (PIECE_OBJECT.enemyIdxRigth - PIECE_OBJECT.positionCol) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyRight = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyRight;
    },
    getStepsEnemyUp_WHITE: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxUp > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwEnemyUp = (PIECE_OBJECT.positionRow - PIECE_OBJECT.enemyIdxUp) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyUp = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyUp;
    },
    getStepsEnemyBottom_WHITE: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.enemyIdxBottom > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwEnemyBottom = (PIECE_OBJECT.enemyIdxBottom - PIECE_OBJECT.positionRow) - 1;
        } else {
            PIECE_OBJECT.stepsBtwEnemyBottom = false;
        }
        return PIECE_OBJECT.stepsBtwEnemyBottom;
    },

    getStepsBtwObstacle: function(pieceOnBoard, PIECE_OBJECT){
        // console.log('inside getStepsBtwObstacle', pieceOnBoard);
        switch (pieceOnBoard.includes('b')) {
            case true:
                this.getStepsObstacleUp_BLACK(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleBottom_BLACK(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleLeft(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleRight(pieceOnBoard, PIECE_OBJECT);
                break;
            case false:
                this.getStepsObstacleUp_WHITE(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleBottom_WHITE(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleLeft(pieceOnBoard, PIECE_OBJECT);
                this.getStepsObstacleRight(pieceOnBoard, PIECE_OBJECT);
                break;
            case '':
                console.log('nothing');
                return;
        }
    },
    getStepsObstacleUp_BLACK: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxUp > -1){
            // console.log('inside getStepsBtwObstacle ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwObstacleUp = (PIECE_OBJECT.obstacleIdxUp - PIECE_OBJECT.positionRow) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleUp = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleUp;
    },
    getStepsObstacleBottom_BLACK: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxBottom > -1){
            PIECE_OBJECT.stepsBtwObstacleBottom = (PIECE_OBJECT.positionRow - PIECE_OBJECT.obstacleIdxBottom) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleBottom = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleBottom;       
    },
    getStepsObstacleLeft: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxLeft > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            // console.log(PIECE_OBJECT.positionCol, PIECE_OBJECT.obstacleIdxLeft);
            PIECE_OBJECT.stepsBtwObstacleLeft = (PIECE_OBJECT.positionCol - PIECE_OBJECT.obstacleIdxLeft) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleLeft = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleLeft;
    },
    getStepsObstacleRight: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxRight > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            // console.log(PIECE_OBJECT.positionCol, PIECE_OBJECT.obstacleIdxRight);
            PIECE_OBJECT.stepsBtwObstacleRight = (PIECE_OBJECT.obstacleIdxRight - PIECE_OBJECT.positionCol) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleRight = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleRight;
    },
    getStepsObstacleUp_WHITE: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxUp > -1){
            // console.log('inside getStepsBtwEnemy ->  inside if', 'pieceOnBoard is BB');
            PIECE_OBJECT.stepsBtwObstacleUp = (PIECE_OBJECT.positionRow - PIECE_OBJECT.obstacleIdxUp) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleUp = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleUp;
    },
    getStepsObstacleBottom_WHITE: function(pieceOnBoard, PIECE_OBJECT){
        if(PIECE_OBJECT.obstacleIdxBottom > -1){
            PIECE_OBJECT.stepsBtwObstacleBottom = (PIECE_OBJECT.obstacleIdxBottom - PIECE_OBJECT.positionRow) - 1;
        } else {
            PIECE_OBJECT.stepsBtwObstacleBottom = false;
        }
        return PIECE_OBJECT.stepsBtwObstacleBottom;       
    },

    // =============================================================================================================    

    // GET STEPS TO BOUNDARYS
    getStepsToBoundary: function(arr, positionCol, positionRow){
        const pieceOnBoard = arr[positionCol][positionRow];
        let PIECE_OBJECT = this[pieceOnBoard];
        let numColInArr = arr.length - 1;
        let numRowInArr = arr[0].length - 1;
        PIECE_OBJECT.stepsToBoundaryLeft = positionCol - 0;
        PIECE_OBJECT.stepsToBoundaryRight = numColInArr - positionCol;

        switch (pieceOnBoard.includes('b')) {
            case true:
                PIECE_OBJECT.stepsToBoundaryTop = numRowInArr - positionRow;
                PIECE_OBJECT.stepsToBoundaryBottom = positionRow - 0;
                break;
            case false:
                PIECE_OBJECT.stepsToBoundaryTop = positionRow - 0;
                PIECE_OBJECT.stepsToBoundaryBottom = numRowInArr - positionRow;
                break;
        }
    },

    // ============================================================================================================= 

    getIsFirstMove: function(PIECE_OBJECT, arr, positionCol, positionRow){
        let parsedPosCol = parseInt(positionCol);
        let parsedPosRow = parseInt(positionRow);
        const pieceOnBoard = arr[parsedPosCol][parsedPosRow];
        switch (pieceOnBoard === 'bb' && parsedPosRow === 1 || pieceOnBoard === 'pw' && parsedPosRow === 6) {
            case true:
                PIECE_OBJECT.isFirstMove = true;
                break;
                
            case false:
                PIECE_OBJECT.isFirstMove = false;
                break;
            
            }
    },
    // =============================================================================================================
    // SELECT PIECE
    setToSelected: function(){
        this.isSelected = true;
        PIECES.divStartPos = PIECES.arrStartPos.map((startDiv) => document.getElementById(startDiv));
        // console.log(PIECES.divStartPos[0]);
    },
    // UNSELECT PIECE
    setToDeselected: function(){
        this.isSelected = false;
        PIECES.divStartPos[0].removeAttribute('style');
    },
        
    // DISPLAY MOVE / ATTAC ON BOARD
    move: function(arr, divsMove, arrStartPos){
        let startRow = parseInt(arrStartPos[0][3]);
        let startCol = parseInt(arrStartPos[0][1]);
        let moveRow = parseInt(divsMove.id[3]);
        let moveCol = parseInt(divsMove.id[1]);
        PIECES.arrMovedTo.unshift(`c${moveCol}r${moveRow}`);
        let pieceOnBoard = arr[startCol][startRow];
        let PIECE_OBJECT = this[pieceOnBoard];
        let numSteps = moveRow - startRow;
        console.log(PIECE_OBJECT.id[0]);
        console.log(moveCol, moveRow);

        // Promote Piece
        if(pieceOnBoard === "bb" && moveRow === 7){
            pieceOnBoard = PIECE_OBJECT.promote();
        } else if(pieceOnBoard === "pw" && moveRow === 0){
            pieceOnBoard = PIECE_OBJECT.promote();
        }
        // move Pieces for Castling Black
        if(startRow === 0){
            if(PIECE_OBJECT.castlingLeftBool && moveCol === 2){
                arr[startCol][startRow] = '';
                arr[moveCol][moveRow] = pieceOnBoard;
                arr[0][0] = '';
                arr[3][0] = 'tb';
            }
            if(PIECE_OBJECT.castlingRightBool && moveCol === 6){
                arr[startCol][startRow] = '';
                arr[moveCol][moveRow] = pieceOnBoard;
                arr[7][0] = '';
                arr[5][0] = 'tb';
            }
        // move Pieces for Castling White
        } else if(startRow === 7){
            if(PIECE_OBJECT.castlingLeftBool && moveCol === 2){
                arr[startCol][startRow] = '';
                arr[moveCol][moveRow] = pieceOnBoard;
                arr[0][7] = '';
                arr[3][7] = 'tw';
            }
            if(PIECE_OBJECT.castlingRightBool && moveCol === 6){
                arr[startCol][startRow] = '';
                arr[moveCol][moveRow] = pieceOnBoard;
                arr[7][7] = '';
                arr[5][7] = 'tw';
            }
        }
        if(Math.abs(numSteps) === 2 && PIECE_OBJECT.id[0] === 'b'){
            PIECES.arrEnpassant.push(`c${moveCol}r${moveRow - 1}`);    
            console.log('arrEnpassant', PIECES.arrEnpassant);
        } else if(Math.abs(numSteps) === 2 && PIECE_OBJECT.id[0] === 'p'){
            PIECES.arrEnpassant.push(`c${moveCol}r${moveRow + 1}`);    
            console.log('arrEnpassant', PIECES.arrEnpassant);
        }
        arr[startCol][startRow] = '';
        arr[moveCol][moveRow] = pieceOnBoard;
    },
    attac: function(arr, divsMove, arrStartPos){
        let startRow = parseInt(arrStartPos[0][3]);
        let startCol = parseInt(arrStartPos[0][1]);
        let moveRow = parseInt(divsMove.id[3]);
        let moveCol = parseInt(divsMove.id[1]);
        let attDivIdEnpassant = `c${moveCol}r${moveRow}`;
        const pieceOnBoard = arr[startCol][startRow];
        // const enemyPieceOnBoard = arr[moveCol][moveRow];
        let PIECE_OBJECT = this[pieceOnBoard];
        console.log(PIECE_OBJECT);
        arr[startCol][startRow] = '';
        arr[moveCol][moveRow] = '';
        if(attDivIdEnpassant === PIECES.arrEnpassant[0]){
            console.log('a');
            if(turn === 1){
                console.log('b');
                arr[moveCol][moveRow - 1] = '';
            } else if(turn === -1){
                console.log('c');
                console.log(moveRow);
                arr[moveCol][moveRow + 1] = '';
                console.log(moveRow);
            }
        }
        arr[moveCol][moveRow] = pieceOnBoard;
    },

    // CHECK IF SQUARE IS TAKEN
    arrMoveToEmptySqrs: function(arrDivs){
        for(let i of arrDivs){
            if(i.style[0] !== 'background-image'){
                PIECES.arrPossibleMoves.push(i.id);
            } else {
                break;
            }
        }
    },
    arrAttacTakenSqr_WHITE: function(arrDivs){
        for(let i of arrDivs){
            console.log('i',i.getAttribute('style')[42],i.getAttribute('style'));
            let pieceColor = i.getAttribute('style')[42];
            if(pieceColor === 'b'){
                return PIECES.arrPossibleAttacs.push(i.id);
            } else if(pieceColor === 'w'){
                break;
            }
        }
    },
    arrAttacTakenSqr_BLACK: function(arrDivs){
        for(let i of arrDivs){
            let pieceColor = i.getAttribute('style')[42];
            if(pieceColor === 'w'){
                return PIECES.arrPossibleAttacs.push(i.id);
            } else if(pieceColor === 'b'){
                break;
            }
        }
    },
    
    bb : {
        id: '',
        positionCol: '',
        positionRow: '',
        enemyIdxUp: '',
        obstacleIdxUp: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyRight: '',
        stepsBtwObstacleUp: '',
        isFirstMove: true,
        didDoubleStep: false,
        enPassant: false,
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            console.log(this);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let twoSteps = 2;
            let oneStep = 1;

            if (this.isFirstMove){
                console.log(parsedPosCol, parsedPosRow);
                PIECES.movePossibilitiesTop_BLACK(this, parsedPosCol, parsedPosRow, twoSteps);
            }
            if(!this.isFirstMove && this.stepsToBoundaryTop > 0){
                PIECES.movePossibilitiesTop_BLACK(this, parsedPosCol, parsedPosRow, oneStep);
            } else {
                return PIECES.arrPossibleMoves;
            }
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let stepsToEnemyDiag = 1;

            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                this.attacPossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                this.attacPossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            return PIECES.arrPossibleAttacs;
        },
        attacPossibilitiesDiagUpRight_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
            let arrSquares = [];
            if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsRight; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow += 1}`);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            }
            console.log('possible attacs', this.arrPossibleAttacs);
            return this.arrPossibleAttacs;
        },
        attacPossibilitiesDiagUpLeft_BLACK: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
            let arrSquares = [];
            if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                    console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsLeft; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow += 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_BLACK(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            }
            console.log('possible attacs', this.arrPossibleAttacs);
            return this.arrPossibleAttacs;
        },
        enPassant: function(enPassantId){
            if(this.enemyIdxLeft !== -1 || this.enemyIdxRigth !== -1 ){
                return PIECES.arrPossibleAttacs.push(enPassantId);
            }
        },
        promote: function(){
            let promotePiece = prompt(`Select a piece (Queen, Tower, Bishop, Knight)`);
            console.log(typeof(promotePiece), isNaN(promotePiece), promotePiece);
            while(!promotePiece || !isNaN(promotePiece)){
                promotePiece = prompt(`Select a piece (Queen, Tower, Bishop, Knight)`);
            }
            let lowercaseLettersPromotedPiece = promotePiece.toLowerCase();
        
            if(lowercaseLettersPromotedPiece.includes('d')){   
                lowercaseLettersPromotedPiece = 'db';
            }else if(lowercaseLettersPromotedPiece.includes('t')){
                lowercaseLettersPromotedPiece = 'tb';
            }else if(lowercaseLettersPromotedPiece.includes('l')){
                lowercaseLettersPromotedPiece = 'lb';
            }else if(lowercaseLettersPromotedPiece.includes('s')){
                lowercaseLettersPromotedPiece = 'sb';
            }
            return lowercaseLettersPromotedPiece;
        },
        arrAttacTakenSqr_BLACK: function(arrDivs){
            for(let i of arrDivs){
                // console.log(i.getAttribute('style'));
                if(i.style[0] === 'background-image'){
                    console.log('i',i.getAttribute('style'));
                    let pieceColor = i.getAttribute('style')[42];
                    // console.log(pieceColor);
                    if(pieceColor === 'w'){
                        return PIECES.arrPossibleAttacs.push(i.id);
                    } else if(pieceColor === 'b'){
                        break;
                    }
                } else {
                    return;
                }
            }
        },
    },
    pw : {
        id: '',
        positionCol: '',
        positionRow: '',
        enemyIdxUp: '',
        obstacleIdxUp: '',
        stepsBtwEnemyUp: '',
        stepsBtwObstacleUp: '',
        isFirstMove: true,
        didDoubleStep: false,
        enPassant: false,
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let twoSteps = 2;
            let oneStep = 1;
            if (this.isFirstMove){
                PIECES.movePossibilitiesTop_WHITE(this, parsedPosCol, parsedPosRow, twoSteps);
            }
            if(!this.isFirstMove && this.stepsToBoundaryTop > 0){
                PIECES.movePossibilitiesTop_WHITE(this, parsedPosCol, parsedPosRow, oneStep);
                return PIECES.arrPossibleMoves;
            } else {
                return PIECES.arrPossibleMoves;
            }
        },
        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let stepsToEnemyDiag = 1;

            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                this.attacPossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                this.attacPossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            return PIECES.arrPossibleAttacs;
        },
        attacPossibilitiesDiagUpRight_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsRight){
            let arrSquares = [];
            if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                console.log(attacArrDivs);
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryRight){
                for(let i = 0; i < pieceStepsRight; i++){
                    arrSquares.push(`c${parsedPosCol += 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                console.log(attacArrDivs);
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            }
            console.log('possible attacs', this.arrPossibleAttacs);
            return this.arrPossibleAttacs;
        },
        attacPossibilitiesDiagUpLeft_WHITE: function(PIECE_OBJECT, parsedPosCol, parsedPosRow, pieceStepsUp, pieceStepsLeft){
            let arrSquares = [];
            if(PIECE_OBJECT.stepsToBoundaryTop === PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop < PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsUp; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            } else if(PIECE_OBJECT.stepsToBoundaryTop > PIECE_OBJECT.stepsToBoundaryLeft){
                for(let i = 0; i < pieceStepsLeft; i++){
                    arrSquares.push(`c${parsedPosCol -= 1}r${parsedPosRow -= 1}`);
                    // console.log(arrSquares);
                }
                let arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
                let attacArrDivs = arrDivs.filter((div) => div.style[0] === 'background-image');
                this.arrAttacTakenSqr_WHITE(attacArrDivs);
                if(PIECES.arrEnpassant.length){
                    this.enPassant(PIECES.arrEnpassant[0]);
                }
            }
            console.log('possible attacs', this.arrPossibleAttacs);
            return this.arrPossibleAttacs;
        }, 
        arrAttacTakenSqr_WHITE: function(arrDivs){
            console.log(arrDivs);
            for(let i of arrDivs){
                // console.log('i',i.getAttribute('style')[43]);
                // console.log('i',i.id);
                console.log(i.getAttribute('style')[42] === 'b');
                if(i.getAttribute('style')[42] === 'b'){
                    return PIECES.arrPossibleAttacs.push(i.id);
                } else if(i.getAttribute('style')[54] === 'b'){
                    // i.removeAttribute('style');
                    i.removeAttribute('background-image');
                    // return PIECES.arrPossibleAttacs.push(i.id);
                } else {
                    break;
                }
            }
        },
        enPassant: function(enPassantId){
            if(this.enemyIdxLeft !== -1 || this.enemyIdxRigth !== -1 ){
                return PIECES.arrPossibleAttacs.push(enPassantId);
            }
        },
        promote: function(){
            let promotePiece = prompt(`Select a piece (Queen, Tower, Bishop, Knight)`);
            console.log(typeof(promotePiece), isNaN(promotePiece), promotePiece);
            while(!promotePiece || !isNaN(promotePiece)){
                promotePiece = prompt(`Select a piece (Queen, Tower, Bishop, Knight)`);
            }
            let lowercaseLettersPromotedPiece = promotePiece.toLowerCase();
        
            if(lowercaseLettersPromotedPiece.includes('d')){   
                lowercaseLettersPromotedPiece = 'dw';
            }else if(lowercaseLettersPromotedPiece.includes('t')){
                lowercaseLettersPromotedPiece = 'tw';
            }else if(lowercaseLettersPromotedPiece.includes('l')){
                lowercaseLettersPromotedPiece = 'lw';
            }else if(lowercaseLettersPromotedPiece.includes('s')){
                lowercaseLettersPromotedPiece = 'sw';
            }
            return lowercaseLettersPromotedPiece;
        },
    },
    tb : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesTop_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop);
            PIECES.movePossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom);
            PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryRight);            
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesUp_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyUp);
            PIECES.attacPossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyBottom);
            PIECES.attacPossibilitiesLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyLeft);
            PIECES.attacPossibilitiesRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyRight);
            return PIECES.arrPossibleAttacs;
        },
    },
    tw : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsBtwObstacleBottom: '',
        stepsBtwObstacleLeft: '',
        stepsBtwObstacleRight: '',
        
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesTop_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop);
            PIECES.movePossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom);
            PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryRight);           
            return PIECES.arrPossibleMoves;
        },
        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesUp_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyUp);
            PIECES.attacPossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyBottom);
            PIECES.attacPossibilitiesLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyLeft);
            PIECES.attacPossibilitiesRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyRight);
            return PIECES.arrPossibleAttacs;
            
        },
    },
    sb : {
        id: '',
        positionCol: '',
        positionRow: '',
        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',
        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let arrDivs = [];        
            let arrSquares = [];

            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow + 2}`);
            }
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow + 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow - 2}`);
            }
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow - 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow - 1}`);
            }
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow + 1}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow - 1}`);
            }
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow + 1}`);
            }
            arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            this.arrMoveToEmptySqrs(arrDivs);
            return PIECES.arrPossibleMoves;
        },
        arrMoveToEmptySqrs: function(arrDivs){
            for(let i of arrDivs){
                // bug: after moving a piece the square from which the piece move keeps the 'style' attribute
                console.log(i,'has Attribute style?',!i.hasAttribute('style'));
                if(!i.hasAttribute('style')){
                    PIECES.arrPossibleMoves.push(i.id);
                // solution: remove 'style' attribute after move any piece
                } else if (i.hasAttribute('style') && !i.getAttribute('style').length){
                    i.removeAttribute('style');
                    console.log(i,'has Attribute style?',!i.hasAttribute('style'));
                    PIECES.arrPossibleMoves.push(i.id);
                }
            }
        },
        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);    
            let arrDivs = [];        
            let arrSquares = [];
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow + 2}`);
            }
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow + 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow - 2}`);
            }
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow - 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow - 1}`);
            }
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow + 1}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow - 1}`);
            }
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow + 1}`);
            }
            arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            this.arrAttacTakenSqr(arrDivs);
            return PIECES.arrPossibleAttacs;
            
        },
        arrAttacTakenSqr: function(arrDivs){
            arrDivs.forEach((div) => {
                if(div.hasAttribute('style')){
                    console.log('div',div.getAttribute('style')[42]);
                    let pieceColor = div.getAttribute('style')[42];
                    if(pieceColor === 'w'){
                        PIECES.arrPossibleAttacs.push(div.id);
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            });
        },
    },
    sw : {
        id: '',
        positionCol: '',
        positionRow: '',
        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',
        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let arrDivs = [];        
            let arrSquares = [];

            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow - 2}`);
            }
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow - 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow + 2}`);
            }
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow + 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow + 1}`);
            }
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow - 1}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow + 1}`);
            }
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow - 1}`);
            }
            arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            this.arrMoveToEmptySqrs(arrDivs);
            return PIECES.arrPossibleMoves;
        },
        arrMoveToEmptySqrs: function(arrDivs){
            for(let i of arrDivs){
                // bug: after moving a piece the square from which the piece move keeps the 'style' attribute
                console.log(i,'has Attribute style?',!i.hasAttribute('style'));
                if(!i.hasAttribute('style')){
                    PIECES.arrPossibleMoves.push(i.id);
                // solution: remove 'style' attribute after move any piece
                } else if (i.hasAttribute('style') && !i.getAttribute('style').length){
                    i.removeAttribute('style');
                    console.log(i,'has Attribute style?',!i.hasAttribute('style'));
                    PIECES.arrPossibleMoves.push(i.id);
                }
            }
        },
        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);    
            let arrDivs = [];        
            let arrSquares = [];
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow - 2}`);
            }
            if(this.stepsToBoundaryTop > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow - 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryLeft > 0){
                arrSquares.push(`c${parsedPosCol - 1}r${parsedPosRow + 2}`);
            }
            if(this.stepsToBoundaryBottom > 1 && this.stepsToBoundaryRight > 0){
                arrSquares.push(`c${parsedPosCol + 1}r${parsedPosRow + 2}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow + 1}`);
            }
            if(this.stepsToBoundaryLeft > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol - 2}r${parsedPosRow - 1}`);
            }
            //=======================================================================
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryBottom > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow + 1}`);
            }
            if(this.stepsToBoundaryRight > 1 && this.stepsToBoundaryTop > 0){
                arrSquares.push(`c${parsedPosCol + 2}r${parsedPosRow - 1}`);
            }
            arrDivs = arrSquares.map((sqr) => document.getElementById(sqr));
            this.arrAttacTakenSqr(arrDivs);
            return PIECES.arrPossibleAttacs;
            
        },
        arrAttacTakenSqr: function(arrDivs){
            arrDivs.forEach((div) => {
                console.log('div', div, div.getAttribute('style'));
                if(div.hasAttribute('style')){
                    let pieceColor = div.getAttribute('style')[42];
                    console.log('div.getAttribute = ', pieceColor);
                    if(pieceColor === 'b'){
                        PIECES.arrPossibleAttacs.push(div.id);
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            });
        },
    },
    lb : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);          
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);
            PIECES.attacPossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            return PIECES.arrPossibleAttacs;
        },
    },
    lw : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);            
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);
            PIECES.attacPossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            return PIECES.arrPossibleAttacs;
        },
    },
    db : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesTop_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop);
            PIECES.movePossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom);
            PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryRight);  
            PIECES.movePossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);         
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesUp_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyUp);
            PIECES.attacPossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyBottom);
            PIECES.attacPossibilitiesLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyLeft);
            PIECES.attacPossibilitiesRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyRight);
            PIECES.attacPossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);
            PIECES.attacPossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            return PIECES.arrPossibleAttacs;
        },
    },
    dw : {
        id: '',
        positionCol: '',
        positionRow: '',

        enemyIdxUp: '',
        enemyIdxBottom: '',
        enemyIdxLeft: '',
        enemyIdxRigth: '',
        stepsBtwEnemyUp: '',
        stepsBtwEnemyBottom: '',
        stepsBtwEnemyLeft: '',
        stepsBtwEnemyRight: '',

        obstacleIdxUp: '',
        obstacleIdxBottom: '',
        obstacleIdxLeft: '',
        obstacleIdxRight: '',
        stepsBtwObstacleUp: '',
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.movePossibilitiesTop_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop);
            PIECES.movePossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom);
            PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryRight);  
            PIECES.movePossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            PIECES.movePossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.movePossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);     
            return PIECES.arrPossibleMoves;
        },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            PIECES.attacPossibilitiesUp_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyUp);
            PIECES.attacPossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyBottom);
            PIECES.attacPossibilitiesLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyLeft);
            PIECES.attacPossibilitiesRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsBtwEnemyRight);

            PIECES.attacPossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryBottom, this.stepsToBoundaryLeft);
            PIECES.attacPossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryRight);
            PIECES.attacPossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, this.stepsToBoundaryTop, this.stepsToBoundaryLeft);
            return PIECES.arrPossibleAttacs;
        },
    },
    kw : {
        id: '',
        positionCol: '',
        positionRow: '',
        countStepsDone: 0,
        enemyIdxUp: '',
        obstacleIdxUp: '',
        stepsBtwEnemyUp: '',
        stepsBtwObstacleUp: '',
        isFirstMove: true,
        castlingLeftBool: false,
        castlingRightBool: false,
        enPassant: false,
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let oneStep = 1;   
            if(this.stepsToBoundaryTop > 0){
                PIECES.movePossibilitiesTop_WHITE(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryBottom > 0){
                PIECES.movePossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, oneStep);  
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, oneStep, oneStep); 
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(!this.countStepsDone && board[0][7] === 'tw' && board[1][7] === '' && board[2][7] === '' && board[3][7] === ''){
                this.castlingLeftBool = true;
                PIECES.castlingLeft('c2r7');
            }
            if(!this.countStepsDone && board[5][7] === '' && board[6][7] === ''&& board[7][7] === 'tw'){
                this.castlingRightBool = true;
                PIECES.castlingRight('c6r7');
            }
            this.countStepsDone++;
            return PIECES.arrPossibleMoves;       

            
        },
        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let stepsToEnemyVertHori = 0;
            let stepsToEnemyDiag = 1;
            PIECES.attacPossibilitiesUp_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesBottom_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesLeft_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesRight_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryRight > 0){
                PIECES.attacPossibilitiesDiagDownRight_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.attacPossibilitiesDiagDownLeft_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                PIECES.attacPossibilitiesDiagUpRight_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.attacPossibilitiesDiagUpLeft_WHITE(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            return PIECES.arrPossibleAttacs;
        }, 
    },
    kb : {
        id: '',
        positionCol: '',
        positionRow: '',
        countStepsDone: 0,
        enemyIdxUp: '',
        obstacleIdxUp: '',
        stepsBtwEnemyUp: '',
        stepsBtwObstacleUp: '',
        isFirstMove: true,
        castlingLeftBool: false,
        castlingRightBool: false,
        stepsToBoundaryTop: '',
        stepsToBoundaryBottom: '',
        stepsToBoundaryLeft: '',
        stepsToBoundaryRight: '',
        movePossibilities: function(positionCol, positionRow){
            // console.log(`c${positionCol}r${positionRow}`);
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let oneStep = 1;   
            if(this.stepsToBoundaryTop > 0){
                PIECES.movePossibilitiesTop_BLACK(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryBottom > 0){
                PIECES.movePossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesLeft(this, parsedPosCol, parsedPosRow, oneStep);
            }
            if(this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesRight(this, parsedPosCol, parsedPosRow, oneStep);  
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.movePossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, oneStep, oneStep); 
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryRight > 0){
                PIECES.movePossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, oneStep, oneStep);
            }
            if(!this.countStepsDone && board[0][0] === 'tb' && board[1][0] === '' && board[2][0] === '' && board[3][0] === ''){
                this.castlingLeftBool = true;
                PIECES.castlingLeft('c2r0');
            }
            if(!this.countStepsDone && board[5][0] === '' && board[6][0] === ''&& board[7][0] === 'tb'){
                this.castlingRightBool = true;
                PIECES.castlingRight('c6r0');
            }
            this.countStepsDone++;
            return PIECES.arrPossibleMoves;
        },
        // castlingLeft: function(castlingId){
        //     return PIECES.arrPossibleMoves.push(castlingId);
        // },
        // castlingRight: function(castlingId){
        //     return PIECES.arrPossibleMoves.push(castlingId);
        // },

        attacPossibilities: function(arr, positionCol, positionRow){
            let parsedPosCol = parseInt(positionCol);
            let parsedPosRow = parseInt(positionRow);
            let stepsToEnemyVertHori = 0;
            let stepsToEnemyDiag = 1;
            PIECES.attacPossibilitiesUp_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesBottom_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesLeft_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            PIECES.attacPossibilitiesRight_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyVertHori);
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryRight > 0){
                PIECES.attacPossibilitiesDiagDownRight_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryBottom > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.attacPossibilitiesDiagDownLeft_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryRight > 0){
                PIECES.attacPossibilitiesDiagUpRight_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            if(this.stepsToBoundaryTop > 0 && this.stepsToBoundaryLeft > 0){
                PIECES.attacPossibilitiesDiagUpLeft_BLACK(this, parsedPosCol, parsedPosRow, stepsToEnemyDiag, stepsToEnemyDiag);
            }
            return PIECES.arrPossibleAttacs;
        }, 
    },
};

const PLAYER = {
    "1": "inputName1",
    "-1": "inputName2"
};


/**=============================================================================================================================== */


/*----- app's state (variables) -----*/
let board, turn, winner, inputName1, inputName2, squaresClicked;

/*----- cached element references -----*/
const msgEl = document.getElementById('msg-el');
const btn = document.querySelector('button');
const divEls = Array.from(document.querySelectorAll('div'));

/*----- event listeners -----*/
divEls.forEach(div => {
    div.addEventListener('click', handleDrop);
});

btn.addEventListener('click', ()=> {
    let answerReplay = prompt('Are you sure you want to restart the game?');
    while(!answerReplay || !isNaN(answerReplay)){
        answerReplay = prompt('Are you sure you want to restart the game?');
    }
    let answerReplayLowercase = answerReplay.toLowerCase();

    if(answerReplayLowercase.includes('y')){
        winner = turn * -1;
        alert(`${PLAYER[turn * -1]} wins the game!`);
        init();
    } else if(answerReplayLowercase.includes('n')) {
        alert('The game goes on.');
    }
});

/*----- functions -----*/
init();

function handleDrop(event){
    // if(!event.target.innerHTML)return;
    const selectSquare = event.target;
    let colArrDOM = selectSquare.id[1];
    let rowIdxDOM = selectSquare.id[3];
    let pieceOnBoard = board[colArrDOM][rowIdxDOM];
    
    let PIECE_OBJECT = PIECES[pieceOnBoard];
    
    if(!PIECES.isSelected){
        choosePiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT);
    } else {
        dropPiece(board, selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT);
        console.log('selected Piece', PIECES.arrSelectedPiece);
    }
    // console.log(PIECES.divStartPos[0]);
    render();
}

function choosePiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT){
    PIECES.arrStartPos.unshift(selectSquare.id);
    console.log('arrStartPos', PIECES.arrStartPos);
    PIECES.setToSelected();
    PIECES.selectSqr(divEls, board, colArrDOM, rowIdxDOM, PIECES.arrStartPos);
    PIECES.inspectPiece(board, colArrDOM, rowIdxDOM, selectSquare, PIECES.arrAllMoves);
    console.log('PIECE_OBJECT',PIECE_OBJECT);
    // PIECES.arrSelectedPiece.unshift(PIECE_OBJECT.id);
    console.log('selected Piece', PIECES.arrSelectedPiece);
    // PIECES.setToSelected();
    PIECES.showSteps(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    let areMovePossibilitiesShown = divEls.some(divEl => divEl.classList.contains('move-possibilities'));
    console.log('moves shown', areMovePossibilitiesShown);
    console.log('arrAllmoves',PIECES.arrAllMoves);
    console.log('piece selected', PIECES.isSelected);
}

function dropPiece(board, selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT){
    if(PIECES.arrStartPos[0] === selectSquare.id){
        console.log(PIECE_OBJECT);
        console.log('selected Piece', PIECES.arrSelectedPiece);
        deSelectPiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT);
    } else if(PIECES.arrPossibleMoves && PIECES.arrPossibleMoves.includes(selectSquare.id)){
        console.log(PIECE_OBJECT);
        console.log('selected Piece', PIECES.arrSelectedPiece);
        movePiece(board, selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT);
        turn *=-1;
    } else if(PIECES.arrPossibleAttacs && PIECES.arrPossibleAttacs.includes(selectSquare.id)){
        console.log(PIECE_OBJECT);
        console.log('selected Piece', PIECES.arrSelectedPiece);
        capturePiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT);
        turn *=-1;
    }
}
function deSelectPiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT){
    PIECES.deleteSteps(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    PIECES.deSelectSqr(divEls, board, colArrDOM, rowIdxDOM, PIECES.arrStartPos);
    emptyAllArr(PIECE_OBJECT);
    console.log('divStartPos', PIECES.divStartPos, 'arrPosMove', PIECES.arrPossibleMoves, 'arrPossAtt', PIECES.arrPossibleAttacs, 'arrStartPos', PIECES.arrStartPos, 'arrAllMoves', PIECES.arrAllMoves);
    PIECES.setToDeselected();
    console.log(PIECES.isSelected);
}
function movePiece(board, selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT){
    // console.log(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    console.log('arrStartPos', PIECES.arrStartPos);
    PIECES.inspectPiece(board, colArrDOM, rowIdxDOM, selectSquare);
    PIECES.move(board, selectSquare, PIECES.arrStartPos);
    PIECES.deleteSteps(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    // console.log(PIECES.arrStartPos);
    PIECES.deSelectSqr(divEls, board, colArrDOM, rowIdxDOM, PIECES.arrStartPos);
    emptyAllArr(PIECE_OBJECT);
    emptyArrEnpassant();
    console.log('divStartPos', PIECES.divStartPos, 'arrPosMove', PIECES.arrPossibleMoves, 'arrPossAtt', PIECES.arrPossibleAttacs, 'arrStartPos', PIECES.arrStartPos, 'arrAllMoves', PIECES.arrAllMoves);
    // console.log(PIECES.arrStartPos);
    PIECES.setToDeselected();
    // console.log(PIECES.divStartPos[0].removeAttribute('style'));
    console.log(PIECES.arrEnpassant, turn);
}
function capturePiece(selectSquare, colArrDOM, rowIdxDOM, PIECE_OBJECT){
    console.log(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    PIECES.inspectPiece(board, colArrDOM, rowIdxDOM, selectSquare, PIECES.arrAllMoves);
    PIECES.attac(board, selectSquare, PIECES.arrStartPos);
    PIECES.deleteSteps(PIECES.arrPossibleMoves, PIECES.arrPossibleAttacs);
    console.log('divStartPos', PIECES.divStartPos, 'arrPosMove', PIECES.arrPossibleMoves, 'arrPossAtt', PIECES.arrPossibleAttacs, 'arrStartPos', PIECES.arrStartPos, 'arrAllMoves', PIECES.arrAllMoves);
    PIECES.deSelectSqr(divEls, board, colArrDOM, rowIdxDOM, PIECES.arrStartPos);
    emptyAllArr(PIECE_OBJECT);
    emptyArrEnpassant();
    PIECES.setToDeselected();
}

function sqrSelected(squares){
    let areSelected = squares.some((square) => square.classList.contains('select'));
    return areSelected;
}   
// TODO func for empty every arr
function emptyAllArr(PIECE_OBJECT){
    emptyPossibleMoves();
    emptyPossibleAttacs();
    emptyStartPos();
    emptyAllMoves();
}

function emptyPossibleMoves(){
    if(PIECES.arrPossibleMoves){
        PIECES.arrPossibleMoves.length = 0;
        return PIECES.arrPossibleMoves;
    } else {
        return;
    }
}
function emptyPossibleAttacs(){
    if(PIECES.arrPossibleAttacs){
        PIECES.arrPossibleAttacs.length = 0;
        return PIECES.arrPossibleAttacs;
    } else {
        return;
    }
}
function emptyArrEnpassant(){
    if(!PIECES.arrEnpassant.length) {
        return;
    } else {
        PIECES.countTurnsForEnpassant++;
        console.log('countTurnsForEnpassant', PIECES.countTurnsForEnpassant);
        if(PIECES.countTurnsForEnpassant === 2){
            console.log('arrEnpassant', PIECES.arrEnpassant);
            PIECES.arrEnpassant.shift();
            PIECES.countTurnsForEnpassant = 0;
            console.log('arrEnpassant', PIECES.arrEnpassant);
        }
    }
}

function emptyStartPos(){
    if(PIECES.arrStartPos){
        PIECES.arrStartPos.length = 0;
        return PIECES.arrStartPos;
    } else {
        return;
    }
}
function emptyAllMoves(){
    if(PIECES.arrAllMoves){
        PIECES.arrAllMoves.length = 0;
        return PIECES.arrAllMoves;
    } else {
        return;
    }
}

function init(){
    /*
    The init() holds an array holding 8 array that can contain 8 values.
    The array represent the chessboard.
    */
    board = [
        ['tb', 'bb', '', '', '', '', 'pw', 'tw'], // col0
        ['sb', 'bb', '', '', '', '', 'pw', 'sw'], // col1
        ['lb', 'bb', '', '', '', '', 'pw', 'lw'], // col2
        ['db', 'bb', '', '', '', '', 'pw', 'dw'], // col3
        ['kb', 'bb', '', '', '', '', 'pw', 'kw'], // col4
        ['lb', 'bb', '', '', '', '', 'pw', 'lw'], // col5
        ['sb', 'bb', '', '', '', '', 'pw', 'sw'], // col6
        ['tb', 'bb', '', '', '', '', 'pw', 'tw'], // col7
    ];
    turn = -1;
    winner = null;
    inputName1 = prompt('PLAYER 1, Please enter your name here');
    inputName2 = prompt('PLAYER 2, Please enter your name here');
    setPlayerName(inputName1, inputName2);
    render();
}

function setPlayerName(player1, player2){
    PLAYER["1"] = player1;
    PLAYER["-1"] = player2;
}

function render(){
    board.forEach((colArr, colIdx) => {
        colArr.forEach((rowValue, rowIdx) => {
            const divEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            divEl.style.backgroundImage = PIECES.id[rowValue];
        });
    });

    if (winner){
        // a player has won
        msgEl.innerHTML = `${PLAYER[turn * -1]} Wins!`;
    } else {
        // no winner jet, show who's next
        msgEl.innerHTML = `${PLAYER[turn]}'s Turn!`;
    }
    //set button for replay to visible or hidden IF winner is true (no longer null)
    // btn.style.visibility = winner ? "visible" : "hidden";
}