import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
    const [score, setScore ] = useState(0);
    const [rows, setRows ] = useState(0);
    const [level, setLevel ] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        //check if we have score
        if(rowsCleared > 0) {
            //this is how original tetris score is calculated
            //if we cleared 2 rows, we need to grab the value at index 1 in the line points array
            //level starts at 0
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            //keeps track of total rows cleared
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
}