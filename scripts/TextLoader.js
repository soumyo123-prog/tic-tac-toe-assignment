const details = document.querySelector('.details');
const board = document.querySelector('.board');
const single = document.querySelector('label[for="single-player"]');
const multi = document.querySelector('label[for="multi-player"]');
const logo = document.querySelector('.logo');

let x = null;
let o = null;
let numGames = null;

logo.style.display = 'block';

const chooseForm = (type) => { 
    return `
        <div class="choose-form">
            Choose between X or O (for Player ${type === 'single' ? "" : '- 1'}) : <br>

            <label for="x"> X (makes first move) </label> <br>
            <input type="checkbox" id="x">

            <label for="o"> O (makes second move) </label>
            <input type="checkbox" id="o">
        </div>
    `
}

const startedBoard = `
    <div class="grid grid-1"></div>
    <div class="grid grid-2"></div>
    <div class="grid grid-3"></div>
    <div class="grid grid-4"></div>
    <div class="grid grid-5"></div>
    <div class="grid grid-6"></div>
    <div class="grid grid-7"></div>
    <div class="grid grid-8"></div>
    <div class="grid grid-9"></div>
`

const numGamesConfirm = `
    <div class="number-of-games">
        Select the Number of Games : <br>
        <label for="numGames"> Choose Number of Games </label>
        <input type="number" id="numGames" min="1" value="1">
        <button class="numgamesConfirm"> Next </button>
    </div>
`

const changeStartedDetails = (games, type) => {
    return `
        <div class="game-number">
            Game : 1 / ${games}
        </div>
        <div class="scores">
            <div class="player-score-1">${type === "single" ? "Computer" : "P1"} : 0</div>
            <div class="player-score-2">${type === "single" ? "Player" : "P2"} : 0</div>
        </div>
        <div class="turn">
            <div class="player-turn-1">${type === "single" ? "Computer" : "P1"}</div>
            <div class="player-turn-2">${type === "single" ? "Player" : "P2"}</div>
        </div>
    `
}

single.onclick = () => {
    board.innerHTML = chooseForm("single");
    x = document.querySelector('label[for="x"]');
    y = document.querySelector('label[for="o"]');

    gameState.type = "single";
    gameState.scores = {
        bot : 0,
        player : 0
    }

    setOnClickListenersMove();
}

multi.onclick = () => {
    board.innerHTML = chooseForm("multi");
    x = document.querySelector('label[for="x"]');
    y = document.querySelector('label[for="o"]');

    gameState.type = "multi";
    gameState.scores = {
        player1 : 0,
        player2 : 0
    }

    setOnClickListenersMove();
}

const setOnClickListenersMove = () => {
    x.onclick = () => {
        board.innerHTML = numGamesConfirm;
        numGames = document.getElementById('numGames');

        if (gameState.type === "single") {
            gameState.moves = {
                bot : "O",
                player : "X"
            }
        } else {
            gameState.moves = {
                player1 : "X",
                player2 : "O"
            }
        }

        setNumGames();
    }
    
    y.onclick = () => {
        board.innerHTML = numGamesConfirm;
        numGames = document.getElementById('numGames');

        if (gameState.type === "single") {
            gameState.moves = {
                bot : "X",
                player : "O"
            }
        } else {
            gameState.moves = {
                player1 : "O",
                player2 : "X"
            }
        }

        setNumGames();
    }
}

const setNumGames = () => {
    const confirmNum = document.querySelector('.numgamesConfirm');
    confirmNum.onclick = () => {
        board.innerHTML = startedBoard;
        details.innerHTML = changeStartedDetails(numGames.value, gameState.type);
        logo.style.display = 'none';

        gameState.numberOfGames = Number(numGames.value);
        startGame();
    }
}