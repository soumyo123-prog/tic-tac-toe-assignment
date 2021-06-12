const takeRandomMove = () => {
    const available = [];

    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (layout[i][j] === "") {
                available.push({i,j});
            }
        }
    }

    const randNum = generateRandom(0, available.length-1);
    return {
        row : available[randNum].i,
        col : available[randNum].j
    }
}