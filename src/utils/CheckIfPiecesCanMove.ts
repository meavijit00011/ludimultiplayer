import { PlayerPiecesDefaultPos, SafeZoneTiles } from "../constants";
import {  PiecesPosType, PlayersType } from "../types";
// this component check how many pieces of curr player can move with curr dice number.
const CheckIfPiecesCanMove = (playerId: PlayersType, piecesPosOfCurrPlayer: PiecesPosType, diceNum: number): boolean[] => {
    let arr = [false, false, false, false];
    for (let i = 1; i <= 4; i++) {
        const pieceId = `p${i}` as keyof typeof piecesPosOfCurrPlayer;
        const pos = piecesPosOfCurrPlayer[pieceId];
        const safeZoneInd = SafeZoneTiles[playerId].indexOf(pos);
        //   check if the piece is inside the safe zone.
        if (safeZoneInd != -1 && diceNum) {
            const nextInd = safeZoneInd + diceNum;
            if (nextInd <= 5) {
                arr[i-1] = true;
            }
        }
        // check if the piece is in default pos.
        else if (PlayerPiecesDefaultPos[playerId].p1 == pos || PlayerPiecesDefaultPos[playerId].p2 == pos || PlayerPiecesDefaultPos[playerId].p3 == pos || PlayerPiecesDefaultPos[playerId].p4 == pos) {
            if (diceNum == 6) {
                arr[i-1] = true;
            }
        }
        else {
            arr[i-1] = true;
        }
    }

    return arr;
}

export default CheckIfPiecesCanMove