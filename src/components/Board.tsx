import Dice from "./Dice"
import './Board.css';
import { useContext } from "react";
import { BoardCtx } from "../context/BoardCtx";
import Tile from "./Tile";
import { GameCtx } from "../context/GameCtx";
import GameFinishedModal from "./GameFinishedModal";
import GameQuitModal from "./GameQuitModal";

const Board = () => {
    const { tileWidth, tileMap, playerColors, centerBorderSize } = useContext(BoardCtx);
    const {game,updateGame} = useContext(GameCtx)
    let centerStyle = {
        height: 0,
        width: 0,
        borderLeft: '',
        borderRight: '',
        borderTop: '',
        borderBottom: '',
        top: '',
        zIndex: '100',
        left: '',
        position: 'absolute' as 'absolute',
    };
    centerStyle.top = `${tileWidth*5.99}px`;
    centerStyle.borderLeft = `${centerBorderSize}px solid ${playerColors.player2.defaultColor}`;
    centerStyle.borderRight = `${centerBorderSize}px solid ${playerColors.player4.defaultColor}`;
    centerStyle.borderBottom = `${centerBorderSize}px solid ${playerColors.player1.defaultColor}`;
    centerStyle.borderTop = `${centerBorderSize}px solid ${playerColors.player3.defaultColor}`;
    centerStyle.left = `${tileWidth * 5.99}px`;
    const handleBack = ()=>{
        updateGame('goback',null);
    }
    return (
        <div className="board_container">
            {game.gameFinished && <GameFinishedModal></GameFinishedModal>}
            {game.quitGame && <GameQuitModal></GameQuitModal>}
            <button className="back_btn" onClick={handleBack}>Back</button>
            {/* dice section */}
            <div className="dice_section">
                <Dice id='player2'></Dice>
                <Dice id='player3'></Dice>
            </div>
            {/* board */}
            <div className="tile_container">
                <div style={centerStyle}></div>
                {tileMap.map(row => {
                    return <div className="row" key={Math.random()}>{row.map(tile => {
                        return <Tile key={Math.random()} tile={tile}></Tile>
                    })}</div>
                })}
            </div>
            {/* dice section */}
            <div className="dice_section">
                <Dice id='player1'></Dice>
                <Dice id='player4'></Dice>
            </div>
        </div>
    )
}

export default Board