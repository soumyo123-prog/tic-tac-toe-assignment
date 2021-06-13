const details = document.querySelector('.details');
const board = document.querySelector('.board');
const logo = document.querySelector('.logo');

logo.style.display = 'block';

const onChooseNumConfirm = () => {
    const numForm = document.querySelector('.number-of-games');
    numForm.classList.add('fade');

    const back = document.querySelector('.back-button');
    back.disabled = true;

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
        p2.style.backgroundImage = "url('/assets/human1.jpg')";

        gameState.numberOfGames = Number(numGames.value);
        startGame();
    }, 250);
}

const createOptionsForm = () => {
    clearBoard(board);

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

const createDifficultyFormHelper = () => {
    clearBoard(board);

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = `<i class="fas fa-backward"></i>`;
    backButton.onclick = () => {
        goBack(1);
    }

    const difficultyForm = document.createElement('div');
    difficultyForm.className = 'difficulty-form';

    const labelEasy = document.createElement('label');
    labelEasy.setAttribute('for', 'easy'); 
    labelEasy.textContent = 'Easy';
    labelEasy.onclick = onChooseEasy;
    const br1 = document.createElement('br');
    const inputEasy = document.createElement('input');
    inputEasy.type = 'checkbox';
    inputEasy.id = 'easy';

    const labelMed = document.createElement('label');
    labelMed.setAttribute('for', 'medium'); 
    labelMed.textContent = 'Medium';
    labelMed.onclick = onChooseMed;
    const br2 = document.createElement('br');
    const inputMed = document.createElement('input');
    inputMed.type = 'checkbox';
    inputMed.id = 'medium';

    const labelHard = document.createElement('label');
    labelHard.setAttribute('for', 'hard'); 
    labelHard.textContent = 'Hard';
    labelHard.onclick = onChooseHard;
    const inputHard = document.createElement('input');
    inputHard.type = 'checkbox';
    inputHard.id = 'hard';

    addChildren(difficultyForm, labelEasy, br1, inputEasy, labelMed, br2, inputMed, labelHard, inputHard);
    board.appendChild(backButton);
    board.appendChild(difficultyForm);
}

const createDifficultyForm = (forward) => {
    const optionsForm = document.querySelector('.option-form');
    if (optionsForm) {
        optionsForm.classList.add('fade');
    }

    if (forward) {
        setTimeout(() => {
            createDifficultyFormHelper();
        },250);
    } else {
        createDifficultyFormHelper();
    }
}

const createNameFormHelper = () => {
    clearBoard(board);

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = `<i class="fas fa-backward"></i>`;
    backButton.onclick = () => {
        goBack(1);
    }

    const nameForm = document.createElement('div');
    nameForm.className = 'name-form';
    nameForm.textContent = "Choose Names for Players :"
    
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.placeholder = "Player One";
    input1.id = "player-1-name";
    input1.maxLength = 8;

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.placeholder = "Player Two";
    input2.id = "player-2-name";
    input2.maxLength = 8;

    const confirmName = document.createElement('button');
    confirmName.innerHTML = `<i class="fas fa-arrow-right"></i>`;
    confirmName.className = "player-names-confirm";
    confirmName.onclick = () => {
        onChooseNames(input1.value, input2.value);
    }

    addChildren(nameForm, input1, input2, confirmName);
    board.appendChild(backButton);
    board.appendChild(nameForm);
}

const createNameForm = (forward) => {
    const optionsForm = document.querySelector('.option-form');
    if (optionsForm) {
        optionsForm.classList.add('fade');
    }

    if (forward) {
        setTimeout(() => {
            createNameFormHelper();
        },250);
    } else {
        createNameFormHelper();
    }
}

const createChooseFormHelper = (type) => {
    clearBoard(board);

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerHTML = `<i class="fas fa-backward"></i>`;
    backButton.onclick = () => {
        goBack(1, type === "multi" ? true : false, type === "single" ? true : false);
    }

    const chooseForm = document.createElement('div');
    chooseForm.className = 'choose-form';
    chooseForm.innerHTML = `${type === 'multi' ? `Choose move for ${gameState.names.player1} : <br>` : ""}`;
    
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

    const br1 = document.createElement('br');
    const labelRandom = document.createElement('label');
    labelRandom.setAttribute('for','random');
    labelRandom.textContent = 'Random';
    labelRandom.onclick = onChooseRandom;
    const inputRandom = document.createElement('input');
    inputRandom.type = 'checkbox';
    inputRandom.id = 'random';

    addChildren(chooseForm, labelX, br, inputX, labelO, inputO, br1, labelRandom, inputRandom);
    board.appendChild(backButton);
    board.appendChild(chooseForm);
}

const createChooseForm = (type, forward) => {
    if (type === "single") {
        const difficulty = document.querySelector('.difficulty-form');
        if (difficulty) {
            difficulty.classList.add('fade');
        }
        
    } else {
        const nameForm = document.querySelector('.name-form');
        if (nameForm) {
            nameForm.classList.add('fade');
        }
    }

    if (forward) {
        const back = document.querySelector('.back-button');
        back ? back.disabled = true : null;

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

    const back = document.querySelector('.back-button');
    back.disabled = true;

    setTimeout(() => {
        clearBoard(board);

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
                <div class="player-score-1">${type === "single" ? "Computer" : `${gameState.names.player1}`} : 0</div>
                <div class="player-1-move"></div>
                <div class="player-1-turn">${type === "single" ? "Computer's Turn" : `${gameState.names.player1}'s Turn`}</div>
            </div>
            <div class = "player-2">
                <div class = "player-2-avatar"></div>
                <div class="player-score-2">${type === "single" ? "Human" : `${gameState.names.player2}`} : 0</div>
                <div class="player-2-move"></div>
                <div class="player-2-turn">${type === "single" ? "Human's Turn" : `${gameState.names.player2}'s Turn`}</div>
            </div>
        </div>
    `
}