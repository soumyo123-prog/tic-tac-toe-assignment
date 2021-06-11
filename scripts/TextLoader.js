const details = document.querySelector('.details');
const board = document.querySelector('.board');
const logo = document.querySelector('.logo');

logo.style.display = 'block';

const clearBoard = () => {
    while(board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

const addChildren = (...args) => {
    for (let i=1; i<args.length; i++) {
        args[0].appendChild(args[i]);
    }
}

const goBack = (pageNum) => {
    if (pageNum === 1) {
        createOptionsForm();

        gameState.type = null;
        gameState.scores = null;
        x = null;
        y = null;
    } else {
        createChooseForm(gameState.type, false);
        gameState.moves = null;
    }
}

const onChooseSingle = () => {
    createChooseForm("single", true);

    gameState.type = "single";
    gameState.scores = {
        bot : 0,
        player : 0
    }
}

const onChooseMulti = () => {
    createChooseForm("multi", true);

    gameState.type = "multi";
    gameState.scores = {
        player1 : 0,
        player2 : 0
    }
}

const onChooseX = () => {
    createNumForm();
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
}

const onChooseO = () => {
    createNumForm();
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
}

const onChooseNumConfirm = () => {
    const numForm = document.querySelector('.number-of-games');
    numForm.classList.add('fade');

    setTimeout(() => {
        const numGames = document.querySelector('#numGames');

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
    }, 250);
}

const createOptionsForm = () => {
    clearBoard();

    const optionForm = document.createElement('div');
    optionForm.className = 'option-form';

    const singleLabel = document.createElement('label');
    singleLabel.setAttribute('for', 'single-player');
    singleLabel.innerHTML = 'Single Player'
    const br = document.createElement('br');
    const singleInput = document.createElement('input');
    singleInput.setAttribute('type', 'checkbox');
    singleInput.setAttribute('id', 'single-player');
    singleLabel.onclick = onChooseSingle;

    const multiLabel = document.createElement('label');
    multiLabel.setAttribute('for', 'multi-player');
    multiLabel.innerHTML = 'Multi Player'
    const multiInput = document.createElement('input');
    multiInput.setAttribute('type', 'checkbox');
    multiInput.setAttribute('id', 'multi-player');
    multiLabel.onclick = onChooseMulti;

    addChildren(optionForm, singleLabel, br, singleInput, multiLabel, multiInput);
    board.appendChild(optionForm);
}
createOptionsForm();

const createChooseFormHelper = (type) => {
    clearBoard();

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = `<i class="fas fa-backward"></i>`;
    backButton.onclick = () => {
        goBack(1);
    }

    const chooseForm = document.createElement('div');
    chooseForm.className = 'choose-form';
    chooseForm.innerHTML = `${type === 'multi' ? "Choose move for Player 1 : <br>" : ""}`;
    
    const labelX = document.createElement('label');
    labelX.setAttribute('for', 'x');
    labelX.textContent = 'X';
    labelX.onclick = onChooseX;
    const br = document.createElement('br');
    const inputX = document.createElement('input');
    inputX.type = 'checkbox';
    inputX.id = 'x';

    const labelO = document.createElement('label');
    labelO.setAttribute('for', 'o');
    labelO.textContent = 'O';
    labelO.onclick = onChooseO;
    const inputO = document.createElement('input');
    inputO.type = 'checkbox';
    inputO.id = 'o';

    addChildren(chooseForm, labelX, br, inputX, labelO, inputO);
    board.appendChild(backButton);
    board.appendChild(chooseForm);
}

const createChooseForm = (type, isForwarding) => {
    if (isForwarding) {
        const optionsForm = document.querySelector('.option-form');
        optionsForm.classList.add('fade');

        setTimeout(() => {
            createChooseFormHelper(type);
        }, 250);

    } else {
        createChooseFormHelper(type);
    }
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

const createNumForm = () => {
    const chooseForm = document.querySelector('.choose-form');
    chooseForm.classList.add('fade');

    setTimeout(() => {
        clearBoard();

        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = `<i class="fas fa-backward"></i>`;
        backButton.onclick = () => {
            goBack(2);
        }

        const numGames = document.createElement('div');
        numGames.className = 'number-of-games';

        const labelNum = document.createElement('label');
        labelNum.setAttribute('for', 'numGames');
        labelNum.textContent = "Choose Number of Games :";
        const inputNum = document.createElement('input');
        inputNum.id = 'numGames';
        inputNum.type = 'number';
        inputNum.min = 1;
        inputNum.value = 1;
        const numConfirm = document.createElement('button');
        numConfirm.className = 'numgamesConfirm';
        numConfirm.innerHTML = '<i class="fas fa-arrow-right"></i>';
        numConfirm.onclick = onChooseNumConfirm;

        addChildren(numGames, labelNum, inputNum, numConfirm);
        board.appendChild(backButton);
        board.appendChild(numGames);
    }, 250);
}

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
                <div class="player-1-turn">${type === "single" ? "Computer's Turn" : "P1's Turn"}</div>
            </div>
            <div class = "player-2">
                <div class = "player-2-avatar"></div>
                <div class="player-score-2">${type === "single" ? "Player" : "P2"} : 0</div>
                <div class="player-2-move"></div>
                <div class="player-2-turn">${type === "single" ? "Player's Turn" : "P2's Turn"}</div>
            </div>
        </div>
    `
}