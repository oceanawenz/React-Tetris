export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
//create an array from another array(stage height)
    Array.from(Array(STAGE_HEIGHT), () => 
        // for each row create a new array from the STAGE_WIDTH, and fill it with another array 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )