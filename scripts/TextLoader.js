const details = document.querySelector('.details');
const board = document.querySelector('.board');
const single = document.querySelector('label[for="single-player"]');
const multi = document.querySelector('label[for="multi-player"]');
const logo = document.querySelector('.logo');
const optionsForm = document.querySelector('.options-form');

let x = null;
let o = null;
let numGames = null;

logo.style.display = 'block';

const chooseForm = (type) => { 
    return `
        <button class="back-button">
            <i class="fas fa-backward"></i>
        </button>
        <div class="choose-form">
            ${type === 'multi' ? "Choose move for Player 1 : <br>" : ""}

            <label for="x"> X </label> <br>
            <input type="checkbox" id="x">

            <label for="o"> O </label>
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
    <button class="back-button">
        <i class="fas fa-backward"></i>
    </button>
    <div class="number-of-games">
        <label for="numGames"> Choose Number of Games : </label>
        <input type="number" id="numGames" min="1" value="1">
        <button class="numgamesConfirm"> 
            <i class="fas fa-arrow-right"></i>
        </button>
    </div>
`

const changeStartedDetails = (games, type) => {
    return `
        <div class="game-number">
            Game : 1 / ${games}
        </div>
        <div class="player-cards">
            <div class = "player-1">
                <div class = "player-1-avatar"></div>
                <div class="player-score-1">${type === "single" ? "Computer" : "P1"} : 0</div>
                <div class="player-1-move"></div>
            </div>
            <div class = "player-2">
                <div class = "player-2-avatar"></div>
                <div class="player-score-2">${type === "single" ? "Player" : "P2"} : 0</div>
                <div class="player-2-move"></div>
            </div>
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

const goBack = (pageNum) => {
    if (pageNum === 1) {
        board.innerHTML = `
        <div class="option-form">
            <label for="single-player">Single Player</label><br>
            <input type="checkbox" id="single-player">

            <label for="multi-player"> Multi Player </label>
            <input type="checkbox" id="multi-player">
        </div>
        `

        gameState.type = null;
        gameState.scores = null;
        x = null;
        y = null;
    }
}

const setOnClickListenersMove = () => {
    const backButton = document.querySelector('.back-button');
    backButton.onclick = () => {
        goBack(1);
    }

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

        board.style.display = 'grid';
        board.style.gridTemplateRows = '1fr 1fr 1fr';
        board.style.gridTemplateColumns = '1fr 1fr 1fr';

        board.innerHTML = startedBoard;
        details.innerHTML = changeStartedDetails(numGames.value, gameState.type);
        logo.style.display = 'none';

        const p1 = document.querySelector('.player-1-avatar');
        const p2 = document.querySelector('.player-2-avatar');
        const m1 = document.querySelector('.player-1-move');
        const m2 = document.querySelector('.player-2-move');

        if (gameState.type === "single") {
            p1.style.backgroundImage = "url('/assets/robot.png')";

            if (gameState.moves.bot === "X") {
                m1.innerHTML = "X";
                m1.style.color = 'var(--pink)'; 
                m2.innerHTML = "O";
                m2.style.color = 'var(--yellow)'; 
            } else {
                m1.innerHTML = "O";
                m1.style.color = 'var(--yellow)'; 
                m2.innerHTML = "X";
                m2.style.color = 'var(--pink)'; 
            }

        } else {
            p1.style.backgroundImage = "url('/assets/human.png')";

            if (gameState.moves.player1 === "X") {
                m1.innerHTML = "X";
                m1.style.color = 'var(--pink)'; 
                m2.innerHTML = "O";
                m2.style.color = 'var(--yellow)'; 
            } else {
                m1.innerHTML = "O";
                m1.style.color = 'var(--yellow)'; 
                m2.innerHTML = "X";
                m2.style.color = 'var(--pink)'; 
            }
        }
        p2.style.backgroundImage = "url('/assets/human.png')";

        gameState.numberOfGames = Number(numGames.value);
        startGame();
    }
}