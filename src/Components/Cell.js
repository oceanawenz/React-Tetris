import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color}>{console.log('rerender')}</StyledCell>
)

//React memo will make sure it memorizes the Cell component when the acutal cell rerenders and changes that the tetromino is in and not the rest

export default React.memo(Cell)