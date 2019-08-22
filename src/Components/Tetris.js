import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

//Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';


const Tetris = ( ) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    const movePlayer = direction => {
        //if we are not colliding with anything we move, otherwise we don't do anything
        if(!checkCollision(player, stage, {x: direction, y: 0})) {
            updatePlayerPos({ x: direction, y: 0 });
        }
   
    }

    const startGame = () => {
        console.log('test')
        //Reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0); 
        setLevel(0);
    }

    const drop = () => {
        //increase level when player has cleared 10 rows
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            //also increase speed
            setDropTime(1000 / (level +1) + 200);
        }



        if(!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            // Game OVer
            //if player hits the top of the are
            if(player.pos.y < 1) {
                console.log('Game Over!!!!')
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true });
        }
  
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            //down key is 40
            if(keyCode === 40) {
                console.log('interval on')
                setDropTime(1000 / (level +1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        //stop the interval when the player moves the tetromino down with the arrow key
        console.log('interval off')
        setDropTime(null);
        drop();
        
    }

    const move = ({ keyCode }) => {
        if(!gameOver) {
            //keycode for left arrow is 37
            if(keyCode === 37) {
                //movePlayer to the left -1 on x axis
                movePlayer(-1);
                //keycode for right arrow is 39
            } else if(keyCode === 39) {
                movePlayer(1);
                //keycode for down arrow is 40
            } else if(keyCode === 40) {
                dropPlayer();
                //keycode for up arrow is 38
            } else if (keyCode === 38) {
                //1 is the direction that is sent in, which means the tetromino will be rotated clockwise
                playerRotate(stage, 1)
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)
 
    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    )}
                <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;