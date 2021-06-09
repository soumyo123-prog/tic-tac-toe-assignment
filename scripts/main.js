const grids = document.getElementsByClassName('grid');
const resetButton = document.querySelector('.reset-game-button');
let t1 = null, t2 = null;

let layout = [["","",""],["","",""],["","",""]];

let turn = null, initialTurn = null;
let moves = 0;

let gameState = {
    numberOfGames : 1,
    gamesCompleted : 0,
    type : null,
    scores : null,
    moves : null
}

resetButton.onclick = () => {
    reset();
}

const reset = () => {
    window.location.reload();
}

const finalWinnerText = (winner) => {
    if ((winner) === 0) {
        return `
            <div class="final-winner">
                The Game Was a Tie
            </div>
        `
    } else {
        if (gameState.type === "multi") {
            return `
                <div class="final-winner">
                    Congratulations ! <br>
                    Player ${winner + " has"} Won the Game
                </div>
            `
        } else {
            return `
                <div class="final-winner">
                    Congratulations ! <br>
                    ${winner === 1 ? "Computer has" : "Player has"} Won the Game
                </div>
            `
        }
    }   
}

const finalWinnerFinder = () => {
    const s1 = gameState.type === "multi" ? gameState.scores.player1 : gameState.scores.bot;
    const s2 = gameState.type === "multi" ? gameState.scores.player2 : gameState.scores.player;

    if (s1 > s2) {
        board.innerHTML = finalWinnerText(1);
    } else if (s2 > s1) {
        board.innerHTML = finalWinnerText(2);
    } else {
        board.innerHTML = finalWinnerText(0);
    }  
    
    setTimeout(() => {
        reset();
    }, 2000);
}

const changeStyleOnWin = (player, indexes) => {
    let currIndex = null;

    for (let i=0; i<3; i++) {
        currIndex = 3*indexes[i].first + indexes[i].second;
        grids[currIndex].style.color = "blue";
    }

    const s1 = document.querySelector('.player-score-1');
    const s2 = document.querySelector('.player-score-2');

    if (gameState.type === "multi") {
        gameState.scores[player === 1 ? "player1" : "player2"] += 1;
    } else {
        gameState.scores[player === 1 ? "bot" : "player"] += 1;
    }
    
    if (player === 1) {
        s1.innerHTML = (gameState.type === "multi" ? "P1 " : "Computer ")+" : "+gameState.scores[gameState.type === "multi" ? "player1" : "bot"];
    } else {
        s2.innerHTML = (gameState.type === "multi" ? "P2 " : "Player ")+" : "+gameState.scores[gameState.type === "multi" ? "player1" : "player"];
    }

    setTimeout(() => {
        gameOver();
    }, 1000);
}

const gameOver = () => {
    const gameNumber = document.querySelector('.game-number');

    layout = [["","",""],["","",""],["","",""]];

    for (let i=0; i<9; i++) {
        grids[i].innerHTML = "";
        grids[i].style.color = "black";
    }

    gameState.gamesCompleted += 1;
    if (gameState.gamesCompleted === gameState.numberOfGames) {
        finalWinnerFinder();

    } else {
        gameNumber.innerHTML = 'Game : ' + (gameState.gamesCompleted+1) + ' / ' + gameState.numberOfGames;
        turn = initialTurn;
        changeTurn();

        moves = 0;
    }
}

const changeTurn = () => {
    if (turn === 1) {
        t1.style.backgroundColor = '#f5c542';
        t2.style.backgroundColor = 'white';
    } else {
        t2.style.backgroundColor = '#f5c542';
        t1.style.backgroundColor = 'white';
    }
}

const startGame = () => {
    t1 = document.querySelector('.player-turn-1');
    t2 = document.querySelector('.player-turn-2');

    if (gameState.type === 'multi') {
        turn = gameState.moves.player1 === "X" ? 1 : 2;
        initialTurn = turn;

        changeTurn();
        setOnClickListenersMulti();

    } else {
        turn = gameState.moves.player === "X" ? 2 : 1;
        initialTurn = turn;

        if (turn === 1) {
            const {row,col} = findBestMove(gameState.moves);
            layout[row][col] = "X";
            grids[3*row + col].innerHTML = "X";
            turn = 2;
            moves += 1;
        }

        changeTurn();
        setOnClickListenersSingle();
    }
}

const setOnClickListenersMulti = () => {
    for(let i=0; i<9; i++) {
        grids[i].onclick = (e) => {
            if (e.target.innerHTML === "") {
                
                let fill = null;
                moves += 1;

                if (gameState.type === "multi") {
                    if (turn === 1) {
                        fill = gameState.moves.player1;
                        turn = 2;
                    } else {
                        fill = gameState.moves.player2;
                        turn = 1;
                    }
                }

                layout[Math.floor(i/3)][i%3] = fill;
                e.target.innerHTML = fill;

                const currTurn = turn === 1 ? 2 : 1;
                const winObj = winDetector(Math.floor(i/3), i%3, layout);

                if (winObj.won) {
                    changeStyleOnWin(currTurn, winObj.indexes);
                } else {
                    changeTurn();

                    if (moves === 9) {
                        gameOver();
                    }
                }
            }
        }
    }
}

const callBot = () => {
    const {row,col} = findBestMove(gameState.moves);
    layout[row][col] = gameState.moves.bot;
    grids[row*3 + col].innerHTML = gameState.moves.bot;

    moves += 1;
    
    const winObj = winDetector(row,col,layout);
    if (winObj.won) {
        changeStyleOnWin(turn, winObj.indexes);

    } else {
        if (moves === 9) {
            gameOver();
        } else {
            turn = turn === 1 ? 2 : 1;
            changeTurn();
        }
    }
}

const setOnClickListenersSingle = () => {
    for (let i=0; i<9; i++) {
        grids[i].onclick = (e) => {
            if (e.target.innerHTML === "") {
                layout[Math.floor(i/3)][i%3] = gameState.moves.player;
                e.target.innerHTML = gameState.moves.player;
                moves += 1;

                const winObj = winDetector(Math.floor(i/3),i%3,layout);
                if (winObj.won) {
                    changeStyleOnWin(turn, winObj.indexes);

                } else {
                    if (moves === 9) {
                        gameOver();
                    } else {
                        turn = turn === 1 ? 2 : 1;
                        changeTurn();
                        callBot();
                    }
                }
            }
        }
    }
}