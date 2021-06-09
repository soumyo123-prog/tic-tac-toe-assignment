const winDetector = (i,j,layout) => {

    const check = layout[i][j];
    const indices = [];
    let won = false;

    for (let r=0; r<3; r++) {
        if (layout[r][0] === check && layout[r][1] === check && layout[r][2] === check) {
            won = true;
            indices.push({first : r, second : 0});
            indices.push({first : r, second : 1});
            indices.push({first : r, second : 2});
            break;
        }
    }

    if (!won) {
        for (let c=0; c<3; c++) {
            if (layout[0][c] === check && layout[1][c] === check && layout[2][c] === check) {
                won = true;
                indices.push({first : 0, second : c});
                indices.push({first : 1, second : c});
                indices.push({first : 2, second : c});
                break;
            }
        }
    }

    if (!won) {
        if (layout[0][0] === check && layout[1][1] === check && layout[2][2] === check) {
            won = true;
            indices.push({first : 0, second : 0});
            indices.push({first : 1, second : 1});
            indices.push({first : 2, second : 2});
        }

        if (!won) {
            if (layout[0][2] === check && layout[1][1] === check && layout[2][0] === check) {
                won = true;
                indices.push({first : 0, second : 2});
                indices.push({first : 1, second : 1});
                indices.push({first : 2, second : 0});
            }
        }
    }
    
    if (won) {
        return {
            won,
            indexes : indices
        }
    }
    
    return {won}
}