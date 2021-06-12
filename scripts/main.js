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
    moves : null,
    names : null
}

const reset = () => {
    resetGame();
}

resetButton.onclick = () => {
    reset();
}

const finalWinnerText = (winner) => {
    board.style.display = 'flex';
    board.style.justifyContent = 'center';
    board.style.allignItems = 'center';

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
        grids[currIndex].style.color = "white";
        grids[currIndex].style.backgroundColor = 'var(--green)';
    }

    const s1 = document.querySelector('.player-score-1');
    const s2 = document.querySelector('.player-score-2');

    if (gameState.type === "multi") {
        gameState.scores[player === 1 ? "player1" : "player2"] += 1;
    } else {
        gameState.scores[player === 1 ? "bot" : "player"] += 1;
    }
    
    if (player === 1) {
        s1.innerHTML = (gameState.type === "multi" ? `${gameState.names.player1} ` : "Computer ")+" : "+gameState.scores[gameState.type === "multi" ? "player1" : "bot"];
    } else {
        s2.innerHTML = (gameState.type === "multi" ? `${gameState.names.player2} ` : "Player ")+" : "+gameState.scores[gameState.type === "multi" ? "player1" : "player"];
    }

    setTimeout(() => {
        gameOver();
    }, 1000);
}

const gameOver = () => {
    const gameNumber = document.querySelector('.game-number');

    for (let i=0; i<9; i++) {
        grids[i].innerHTML = "";
        grids[i].style.color = "black";
        grids[i].style.backgroundColor = 'var(--color2)'
    }

    gameState.gamesCompleted += 1;
    if (gameState.gamesCompleted === gameState.numberOfGames) {
        finalWinnerFinder();

    } else {
        gameNumber.innerHTML = 'Game : ' + (gameState.gamesCompleted+1) + ' / ' + gameState.numberOfGames;
        turn = initialTurn;
        startGame();
    }
}

const changeTurn = () => {
    const p1 = document.querySelector('.player-1-turn');
    const p2 = document.querySelector('.player-2-turn');
    const move1 = document.querySelector('.player-1');
    const move2 = document.querySelector('.player-2');

    if (turn === 1) {
        p1.style.display = 'block';
        p2.style.display = 'none';
        move1.style.border = '3px solid white';
        move2.style.border = 'none';
    } else {
        p1.style.display = 'none';
        p2.style.display = 'block';
        move1.style.border = 'none';
        move2.style.border = '3px solid white';
    }
}

const startGame = () => {
    moves = 0;
    t1 = document.querySelector('.player-1');
    t2 = document.querySelector('.player-2');

    layout = [["","",""],["","",""],["","",""]];

    for (let i=0; i<9; i++) {
        grids[i].innerHTML = "";
        grids[i].style.color = "black";
    }

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
            grids[3*row + col].style.color = 'var(--pink)';

            turn = 2;
            moves += 1;
        }

        changeTurn();
        setOnClickListenersSingle();
    }
    setOnHoverHandlers();
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

                e.target.classList.remove('hover-X');
                e.target.classList.remove('hover-O');

                const currTurn = turn === 1 ? 2 : 1;
                if (currTurn === 1) {
                    if (gameState.moves.player1 === "O") {
                        e.target.style.color = 'var(--yellow)';
                    } else {
                        e.target.style.color = 'var(--pink)';
                    }
                } else {
                    if (gameState.moves.player2 === "O") {
                        e.target.style.color = 'var(--yellow)';
                    } else {
                        e.target.style.color = 'var(--pink)';
                    }
                }

                const winObj = winDetector(Math.floor(i/3), i%3, layout);
                if (winObj.won) {
                    removeEventListenerMulti();
                    changeStyleOnWin(currTurn, winObj.indexes);
                } else {
                    changeTurn();

                    if (moves === 9) {
                        setTimeout(() => {
                            gameOver();
                        },500);
                    }
                }
            }
        }
    }
}

const removeEventListenerMulti = () => {
    for (let i=0; i<9; i++) {
        grids[i].onclick = null;
    }
}

const callBot = () => {
    let row = null, col = null;

    const values = findBestMove(gameState.moves);
    row = values.row, col = values.col;
    layout[row][col] = gameState.moves.bot;

    grids[row*3 + col].innerHTML = `<span>${gameState.moves.bot}</span>`;

    if (gameState.moves.bot === "X") {
        grids[3*row + col].style.color = 'var(--pink)';
    } else {
        grids[3*row + col].style.color = 'var(--yellow)';
    }

    moves += 1;
    
    const winObj = winDetector(row,col,layout);
    if (winObj.won) {
        changeStyleOnWin(turn, winObj.indexes);

    } else {
        if (moves === 9) {
            setTimeout(() => {
                gameOver();
            },500);
        } else {
            turn = 2;
            changeTurn();
            setOnClickListenersSingle()
        }
    }
}

const removeEventListenerSingle = () => {
    for (let i=0; i<9; i++) {
        grids[i].onclick = null;
    }
}

const setOnClickListenersSingle = () => {
    for (let i=0; i<9; i++) {
        grids[i].onclick = (e) => {
            if (e.target.innerHTML === "") {
                layout[Math.floor(i/3)][i%3] = gameState.moves.player;
                e.target.innerHTML = `<span>${gameState.moves.player}</span>`;
                moves += 1;

                e.target.classList.remove('hover-X');
                e.target.classList.remove('hover-O');

                if (gameState.moves.player === "X") {
                    e.target.style.color = 'var(--pink)';
                } else {
                    e.target.style.color = 'var(--yellow)';
                }

                const winObj = winDetector(Math.floor(i/3),i%3,layout);
                if (winObj.won) {
                    changeStyleOnWin(turn, winObj.indexes);

                } else {
                    if (moves === 9) {
                        setTimeout(() => {
                            gameOver();
                        },500);
                    } else {
                        turn = 1;
                        changeTurn();
                        removeEventListenerSingle();
                        setTimeout(() => {
                            callBot();
                        }, 1000);
                    }
                }
            }
        }
    }
}

const checkMovesAndAssignClass = (e) => {
    if (gameState.type === 'single') {
        if (turn === 2) {
            if (gameState.moves.player === "X") {
                e.classList.add('hover-X');
            } else {
                e.classList.add('hover-O');
            }

        }
        
    } else {
        if (turn === 1) {
            if (gameState.moves.player1 === "X") {
                e.classList.add('hover-X');
            } else {
                e.classList.add('hover-O');
            }

        } else {
            if (gameState.moves.player2 === "X") {
                e.classList.add('hover-X');
            } else {
                e.classList.add('hover-O');
            }
        }
    }
}

const setOnHoverHandlers = () => {
    for (let i=0; i<9; i++) {
        grids[i].onmouseenter = (e) => {
            if (e.target.innerHTML === "") {
                checkMovesAndAssignClass(e.target);
            } 
        }

        grids[i].onmouseleave = (e) => {
            e.target.classList.remove('hover-X');
            e.target.classList.remove('hover-O');
        }
    }
}