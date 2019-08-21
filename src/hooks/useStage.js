import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);



    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => 
        //by using reduce we can create a new array
            newStage.reduce((accum, row) => {
                //This function finds a matching row that should be cleared
                //if rows contain cells that are merged, rows do not contain 0's
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    //gives us the width of the play area
                    accum.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return accum;
                }
                //if we dont find a matching row push row into the accum array
                accum.push(row)
                return accum;
            }, []);


        const updateStage = prevStage => {
            //First clear the stage from prev render
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
                );
                //then draw the new tetromino
                player.tetromino.forEach((row, y) => {
                    //for every cell in the tetromino
                    row.forEach((value, x) => {
                        //check if value isnt 0, then we'll know that were on the cell of the shape that makes up the tetromino
                        if(value !== 0) {
                            //give us coordinates of stage
                            //y value is row
                            newStage[y + player.pos.y][x + player.pos.x] = [
                                //get value of the tetromino
                                value,
                                `${player.collided ? 'merged' : 'clear'}`,
                            ]
                        };
                    });
                });
                //Then check if we collided
                if(player.collided) {
                    resetPlayer()
                    return sweepRows(newStage);
                }

                return newStage;
        };

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer]);


    return [stage, setStage, rowsCleared];
};