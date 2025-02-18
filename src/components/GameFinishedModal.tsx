import { useContext } from 'react'
import  './GameFinishedModal.css';
import { useNavigate } from 'react-router-dom';
import { GameCtx } from '../context/GameCtx';
const GameFinishedModal = () => {
    const navigate = useNavigate();
    const {game,updateGame} = useContext(GameCtx);
    const handleResetGameClick = () => {
        updateGame('reset',null);
    }
    const homeBtnClickHandle = () => {
        navigate('/')
    }

    return (
        <div className='game_finished_modal_container'>
            <div className='game_finished_modal'>
                <h3>Game Finished !!</h3>
                <div><span>Winner</span><span>{game.playerFinishedOrder[0]}</span></div>
                <div><span>Runner Up</span><span>{game.playerFinishedOrder[1]}</span></div>
                <div><button onClick={handleResetGameClick}>Play Again</button><button onClick={homeBtnClickHandle}>Home</button></div>
            </div>
        </div>
    )
}

export default GameFinishedModal