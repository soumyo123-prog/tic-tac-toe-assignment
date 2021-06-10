const resetGame = () => {
    const optionsForm = `
        <div class="option-form">
            <label for="single-player">Single Player</label><br>
            <input type="checkbox" id="single-player">

            <label for="multi-player"> Multi Player </label>
            <input type="checkbox" id="multi-player">
        </div>
    `

    logo.style.display = 'block';
    details.innerHTML = "";
    board.innerHTML = optionsForm;
    
    gameState = {
        numberOfGames : 1,
        gamesCompleted : 0,
        type : null,
        scores : null,
        moves : null
    }

    turn = null, initialTurn = null;
    t1 = null, t2 = null;
    x = null, o = null;

    loadText();
}