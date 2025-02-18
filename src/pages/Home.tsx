import { useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom'
import { GameModeType } from '../types';
const Home = () => {
    const navigate = useNavigate();
    const [showMode, setShowMode] = useState<'start' | 'onlineOroffline' | 'connecting'>('start');
    const handleStartBtnClick = () => {
        setShowMode('onlineOroffline');
    }
    const handleGamePlayButtonClick = (mode: GameModeType) => {
        if (mode == 'offline') {
            navigate('/gamePlay?mode=offline');
        }
        if (mode == 'online') {
            setShowMode('connecting');
        }
    };
    return (
        <div className="home_container">
            {showMode == 'start' && <button className='button_style_1 start_btn' onClick={handleStartBtnClick}>Start</button>}
            {showMode == 'onlineOroffline' && <button className='button_style_1 online_btn' onClick={handleGamePlayButtonClick.bind(null, 'online')}>Online</button>}
            {showMode == 'onlineOroffline' && <button className='button_style_1 offline_btn' onClick={handleGamePlayButtonClick.bind(null, 'offline')}>Offline</button>}
            {showMode == 'connecting' && <span>Connecting...</span>}
        </div>
    )
}

export default Home