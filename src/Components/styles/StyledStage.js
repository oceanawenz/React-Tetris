import styled from 'styled-components';

export const StyledStage = style.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vh / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1rf);
`