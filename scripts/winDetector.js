const winDetector = (i,j,layout) => {
    const check = layout[i][j];

    if (i === 0) {
        if (j === 0) {
            if (layout[i+1][j] === check && layout[i+2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i+1, second : j},
                        {first : i+2, second : j}
                    ]
                };
            }

            if (layout[i][j+1] === check && layout[i][j+2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j+1},
                        {first : i, second : j+2}
                    ]
                };
            }

            if (layout[i+1][j+1] === check && layout[i+2][j+2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i+1, second : j+1},
                        {first : i+2, second : j+2}
                    ]
                };
            }

        } else if (j === 1) {
            if (layout[i+1][j] === check && layout[i+2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i+1, second : j},
                        {first : i+2, second : j}
                    ]
                };
            }

            if (layout[i][j-1] === check && layout[i][j+1] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j-1},
                        {first : i, second : j+1}
                    ]
                };
            }

        } else {
            if (layout[i+1][j] === check && layout[i+2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i+1, second : j},
                        {first : i+2, second : j}
                    ]
                };
            }

            if (layout[i][j-1] === check && layout[i][j-2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j-1},
                        {first : i, second : j-2}
                    ]
                };
            }

            if (layout[i+1][j-1] === check && layout[i+2][j-2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i+1, second : j-1},
                        {first : i+2, second : j-2}
                    ]
                };
            }
        }

    } else if (i === 1) {
        if (j==0) {
            if (layout[i][j+1] === check && layout[i][j+2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j+1},
                        {first : i, second : j+2}
                    ]
                };
            }

            if (layout[i-1][j] === check && layout[i+1][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i+1, second : j}
                    ]
                };
            }
            
        } else if (j==1) {
            if (layout[i][j+1] === check && layout[i][j-1] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j+1},
                        {first : i, second : j-1}
                    ]
                };
            }

            if (layout[i-1][j] === check && layout[i+1][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i+1, second : j}
                    ]
                };
            }

        } else {
            if (layout[i][j-1] === check && layout[i][j-2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j-1},
                        {first : i, second : j-2}
                    ]
                };
            }

            if (layout[i-1][j] === check && layout[i+1][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i+1, second : j}
                    ]
                };
            }
        }

    } else {
        if (j == 0) {
            if (layout[i-1][j] === check && layout[i-2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i-2, second : j}
                    ]
                };
            }

            if (layout[i][j+1] === check && layout[i][j+2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j+1},
                        {first : i, second : j+2}
                    ]
                };
            }

            if (layout[i-1][j+1] === check && layout[i-2][j+2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j+1},
                        {first : i-2, second : j+2}
                    ]
                };
            }

        } else if (j==1) {
            if (layout[i-1][j] === check && layout[i-2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i-2, second : j}
                    ]
                };
            }

            if (layout[i][j-1] === check && layout[i][j+1] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j-1},
                        {first : i, second : j+1}
                    ]
                };
            }

        } else {
            if (layout[i-1][j] === check && layout[i-2][j] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j},
                        {first : i-2, second : j}
                    ]
                };
            }

            if (layout[i][j-1] === check && layout[i][j-2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i, second : j-1},
                        {first : i, second : j-2}
                    ]
                };
            }

            if (layout[i-1][j-1] === check && layout[i-2][j-2] === check) {
                return {
                    won : true,
                    indexes : [
                        {first : i, second : j},
                        {first : i-1, second : j-1},
                        {first : i-2, second : j-2}
                    ]
                };
            }

        }
    }
    return {
        won : false
    };
}