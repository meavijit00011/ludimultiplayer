import Board from "../components/Board"
import gameStart from '../assets/gamestart.mp3';
const gameStartSound = new Audio(gameStart);
const GamePlay = () => {
  gameStartSound.play()
  return (
    <div>
        <Board></Board>
    </div>
  )
}

export default GamePlay