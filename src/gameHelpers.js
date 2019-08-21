export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
//create an array from another array(stage height)
    Array.from(Array(STAGE_HEIGHT), () => 
        // for each row create a new array from the STAGE_WIDTH, and fill it with another array 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for(let y = 0; y < player.tetromino.length; y += 1) {
        for(let x = 0; x < player.tetromino[y].length; x += 1) {

            // 1. Check that we're not on an actual Tetromino cell. Cell is not 0.
            if (player.tetromino[y][x] !== 0) {
                if (
                // 2. Check that our move is inside the game areas height (y)
                //we shouldn't go through the bottom of the play area
                !stage[y + player.pos.y + moveY] || 

                //3. Check that our move is inside the game areas width (x)

                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                //4. Check that the cell we're moving to isn't set to clear. check for the second index
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            } 
        }
    }
}