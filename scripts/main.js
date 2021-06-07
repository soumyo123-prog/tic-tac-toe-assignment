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
        return `
            <div class="final-winner">
                Congratulations ! <br>
                Player ${winner} Won the Game
            </div>
        `
    }   
}

const finalWinnerFinder = () => {
    const s1 = gameState.scores.player1;
    const s2 = gameState.scores.player2;

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

    gameState.scores[player === 1 ? "player1" : "player2"] += 1;
    console.log(gameState.scores);

    const s1 = document.querySelector('.player-score-1');
    const s2 = document.querySelector('.player-score-2');
    
    if (player === 1) {
        s1.innerHTML = "P1 : " + (Number(s1.innerHTML.replace("P1 : ","")) + 1);
    } else {
        s2.innerHTML = "P2 : " + (Number(s2.innerHTML.replace("P2 : ","")) + 1);
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
    console.log(gameState.gamesCompleted, gameState.numberOfGames);
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
    if (gameState.type === 'multi') {
        t1 = document.querySelector('.player-turn-1');
        t2 = document.querySelector('.player-turn-2');

        turn = gameState.moves.player1 === "X" ? 1 : 2;
        initialTurn = turn;

        changeTurn();
    }
}

const setOnClickListenersLayout = () => {
    for(let i=0; i<9; i++) {
        grids[i].onclick = (e) => {
            if (e.target.innerHTML === "") {
                
                let fill = null;
                if (gameState.type === "multi") {
                    if (turn === 1) {
                        fill = gameState.moves.player1;
                        turn = 2;
                    } else {
                        fill = gameState.moves.player2;
                        turn = 1;
                    }
                }

                moves += 1;

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

    startGame();
}