const resetGame = () => {
    board.style.display = 'flex';
    board.style.justifyContent = 'center';
    board.style.allignItems = 'center';
    logo.style.display = 'block';
    details.innerHTML = "";
    
    gameState = {
        numberOfGames : 1,
        gamesCompleted : 0,
        type : null,
        scores : null,
        moves : null,
        names : null,
        difficulty : null
    }

    turn = null;
    initialTurn = null;
    t1 = null; 
    t2 = null;

    createOptionsForm();
}