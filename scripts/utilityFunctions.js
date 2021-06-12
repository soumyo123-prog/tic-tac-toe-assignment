const generateRandom = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)) + min;
}

const clearBoard = (board) => {
    while(board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

const addChildren = (...args) => {
    for (let i=1; i<args.length; i++) {
        args[0].appendChild(args[i]);
    }
}

const goBack = (pageNum, isMulti, isSingle) => {
    if (isMulti) {
        createNameForm(false);
        gameState.names = null;

    } else if (isSingle) {
        createDifficultyForm(false);
        gameState.difficulty = null;

    } else {
        if (pageNum === 1) {
            createOptionsForm();

            gameState.type = null;
            gameState.scores = null;
            x = null;
            y = null;
        } else if (pageNum === 2) {
            createChooseForm(gameState.type, false);
            gameState.moves = null;
        }
    }
}

const onChooseSingle = () => {
    createDifficultyForm(true);

    gameState.type = "single";
    gameState.scores = {
        bot : 0,
        player : 0
    };
}

const onChooseEasy = () => {
    gameState.difficulty = 'easy';
    createChooseForm("single", true);
}

const onChooseMed = () => {
    gameState.difficulty = 'medium';
    createChooseForm("single", true);
}

const onChooseHard = () => {
    gameState.difficulty = 'hard';
    createChooseForm("single", true);
}

const onChooseMulti = () => {
    createNameForm(true);

    gameState.type = "multi";
    gameState.scores = {
        player1 : 0,
        player2 : 0
    }
}

const onChooseNames = (v1, v2) => {
    createChooseForm("multi", true);

    gameState.names = {
        player1 : v1 ? v1 : "P1",
        player2 : v2 ? v2 : "P2"
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

const onChooseRandom = () => {
    const num = generateRandom(1,2);
    if (num === 1) {
        onChooseX();
    } else {
        onChooseO();
    }
}