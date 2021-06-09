const isNotPlayable = () => {
    for (let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if (layout[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

const findScore = (moves) => {
    for (let r=0; r<3; r++) {
        if (layout[r][0] === layout[r][1] && layout[r][1] === layout[r][2]) {
            if (layout[r][0] === moves.bot) {
                return 10;
            } else {
                return -10;
            }
        }
    }

    for (let c=0; c<3; c++) {
        if (layout[0][c] === layout[1][c] && layout[1][c] === layout[2][c]) {
            if (layout[0][c] === moves.bot) {
                return 10;
            } else {
                return -10;
            }
        }
    }

    if (layout[0][0] === layout[1][1] && layout[1][1] === layout[2][2]) {
        if (layout[0][0] === moves.bot) {
            return 10;
        } else {
            return -10;
        }
    }

    if (layout[0][2] === layout[1][1] && layout[1][1] === layout[2][0]) {
        if (layout[0][2] === moves.bot) {
            return 10;
        } else {
            return -10;
        }
    }
    return 0;
}

const miniMax = (depth, maximizerTurn, moves) => {
    const score = findScore(moves);
    if (score === 10 || score === -10) {
        return score === 10 ? score - depth : score + depth;
    }
    if (isNotPlayable()) {
        return 0;
    }

    if (maximizerTurn) {
        let maxScore = -1000;

        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (layout[i][j] === "") {
                    layout[i][j] = moves.bot;
                    const currScore = miniMax(depth+1, false, moves);
                    layout[i][j] = "";

                    maxScore = Math.max(maxScore, currScore);
                }
            }
        }
        return maxScore;

    } else {
        let minScore = 1000;

        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (layout[i][j] === "") {
                    layout[i][j] = moves.player;
                    const currScore = miniMax(depth+1, true, moves);
                    layout[i][j] = "";

                    minScore = Math.min(minScore, currScore);
                }
            }
        }
        return minScore;
    }
}

const findBestMove = (moves) => {
    let best = -1000;
    let values = null;

    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (layout[i][j] === "") {

                layout[i][j] = moves.bot;
                const curr = miniMax(0, false, moves);
                layout[i][j] = "";

                if (curr > best) {
                    best = curr;
                    values = {i,j};
                }
            }
        }
    }

    return {
        row : values.i,
        col : values.j
    };
}