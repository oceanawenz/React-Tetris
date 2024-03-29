import React from 'react';
import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

const Stage = ({ stage }) => (
    //when mapping through the stage array we get the row and each row is an array that holds a cell and for each cell we will render the cell component
    //set type to cell[0] because we initially set the 
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/> ))}
    </StyledStage>
)

export default Stage;