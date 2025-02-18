import { PlayersType } from '../types'

const ChangeActivePlayer = (currPlayer: PlayersType, playerFinishedOrder: PlayersType[]): PlayersType => {
    let tempPlayer = currPlayer;
    while (true) {
        if (playerFinishedOrder.indexOf(tempPlayer) == -1 && tempPlayer != currPlayer) {
            return tempPlayer;
        }
        if (tempPlayer == 'player1') {
            tempPlayer = 'player2';
        }
        else if (tempPlayer == 'player2') {
            tempPlayer = 'player3';
        }
        else if (tempPlayer == 'player3') {
            tempPlayer = 'player4';
        }
        else {
            tempPlayer = 'player1';
        }
    }
}

export default ChangeActivePlayer