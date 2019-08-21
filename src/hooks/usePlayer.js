import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer ] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,

    });
    //function rotates the tetromino
    const rotate = (matrix, direction) => {
        //make the rows to columns 
        const rotatedTetro = matrix.map((_, index) => 
        matrix.map(col => col[index]),
        )
        //Reverse each row to get a rotated matrix
        if(direction > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse()
    };

    const playerRotate = (stage, direction) => {
        //gets a deep clone of player without changing it in state
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);
    
        const pos = clonedPlayer.pos.x;
        let offset = 1;
            //this function will check detection if the tetromino is colliding with another tetromino to the left or right
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0})) {
            //keeps track of the number of steps we are moving to the side back and forth
            clonedPlayer.pos.x += offset;
            //creates the back and forth movement of the tetromino
            offset = -(offset + (offset > 0 ? 1 : -1));
            //grabbing the first row and checking the length of it
            if(offset > clonedPlayer.tetromino[0].length) {
                //rotate the tetromino back (-direction reverses the direction)
                rotate(clonedPlayer.tetromino, -direction)
                //set back to the original pos
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({ x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            //when reset, we want to reset at top. set y to 0
            pos: { x:STAGE_WIDTH / 2 - 2, y: 0 }, 
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])
 
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}