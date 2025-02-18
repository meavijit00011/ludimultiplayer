import { useContext } from 'react'
import './Dice.css';
import { GameCtx } from '../context/GameCtx';
import { PlayersType } from '../types';
const diceValArr = [null, 1, 5, 6, 3, 4, 2];

const Dice = ({ id }: { id: PlayersType }) => {
    const { game, updateGame } = useContext(GameCtx);
    const { diceNum } = game;

    const classList = `dice dice-one show-${diceValArr.indexOf(diceNum[id])}`;

    const handleClick = () => {
        updateGame('roll_dice', id);
    }

    return (
        <div onClick={handleClick}>
            <div className="game">
                <div className="container">
                    <div id='dice1' className={classList}>
                        <div id="dice-one-side-one" className='side one'>
                            <div className="dot one-1"></div>
                        </div>
                        <div id="dice-one-side-two" className='side two'>
                            <div className="dot two-1"></div>
                            <div className="dot two-2"></div>
                        </div>
                        <div id="dice-one-side-three" className='side three'>
                            <div className="dot three-1"></div>
                            <div className="dot three-2"></div>
                            <div className="dot three-3"></div>
                        </div>
                        <div id="dice-one-side-four" className='side four'>
                            <div className="dot four-1"></div>
                            <div className="dot four-2"></div>
                            <div className="dot four-3"></div>
                            <div className="dot four-4"></div>
                        </div>
                        <div id="dice-one-side-five" className='side five'>
                            <div className="dot five-1"></div>
                            <div className="dot five-2"></div>
                            <div className="dot five-3"></div>
                            <div className="dot five-4"></div>
                            <div className="dot five-5"></div>
                        </div>
                        <div id="dice-one-side-six" className='side six'>
                            <div className="dot six-1"></div>
                            <div className="dot six-2"></div>
                            <div className="dot six-3"></div>
                            <div className="dot six-4"></div>
                            <div className="dot six-5"></div>
                            <div className="dot six-6"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dice