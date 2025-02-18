import { useContext } from 'react'
import './GameQuitModal.css'
import { useNavigate } from 'react-router-dom'
import { GameCtx } from '../context/GameCtx';
const GameQuitModal = () => {
    const navigate = useNavigate();
    const { updateGame } = useContext(GameCtx);
    const handleGameQuit = () => {
        navigate('/');
        updateGame('reset',null)
    }
    const handleCancelClick = () => {
       updateGame('cancelgoback',null);
    }
    return (
        <div className='game_quit_modal_container'>
            <div className='game_quit_modal'>
                <h3>Are You Sure ??</h3>
                <div><button onClick={handleGameQuit}>Yes</button><button onClick={handleCancelClick}>Cancel</button></div>
            </div>
        </div>
    )
}

export default GameQuitModal