import { useEffect, useState } from "react";
import { Game } from "../classes/Game";
import { UpdateGameActionType } from "../types";
import CheckIfPiecesCanMove from "../utils/CheckIfPiecesCanMove";
import ChangeActivePlayer from "../utils/ChangeActivePlayer";
import rollAudio from '../assets/rolldicesound.mp3';
import cutAudio from '../assets/cutAudio.mp3'
import { CanMove } from "../constants";
import { MovePieces } from "../utils/MovePieces";
const init_game = new Game();
const rollSound = new Audio(rollAudio);
const cutSound = new Audio(cutAudio);
export default function useUpdateGame() {
    const [game, setGame] = useState<Game>(init_game);
    const updateGame = (action: UpdateGameActionType, payload: any) => {
        const { activePlayer, piecesPosOfPlayers, diceNum, allowedToMove, gameFinished, playerFinishedOrder, quitGame, allowedToRoll, canMove } = game;

        //    action type roll dice
        if (action == 'roll_dice') {
            // 1. check if the request is coming from curr active player.
            if (activePlayer == payload && allowedToRoll == 'allowed') {
                let num = Math.floor((Math.random() * 6) + 1);
                const updatedDiceNums = diceNum;
                updatedDiceNums[activePlayer] = num;
                const whichPiecesCanMove = CheckIfPiecesCanMove(activePlayer, piecesPosOfPlayers[activePlayer], num);
                const updatedGame1 = new Game(piecesPosOfPlayers, updatedDiceNums, activePlayer, whichPiecesCanMove, true, gameFinished, playerFinishedOrder, quitGame, 'not_allowed');
                setGame(updatedGame1);
                rollSound.play();

                // if all pieces cannot move then change active player.
                let newActivePlayer = activePlayer;
                if (whichPiecesCanMove[0] == false && whichPiecesCanMove[1] == false && whichPiecesCanMove[2] == false && whichPiecesCanMove[3] == false) {
                    newActivePlayer = ChangeActivePlayer(activePlayer, playerFinishedOrder);
                    const updatedGame2 = new Game(piecesPosOfPlayers, updatedDiceNums, newActivePlayer, CanMove, false, gameFinished, playerFinishedOrder, quitGame, 'allowed');
                    setGame(updatedGame2);
                }
            }
        }
        // action type move piece.
        if (action == 'move_piece') {
            if (allowedToMove) {
                const { hasMoved, updatedPos, hasCutAnotherPiece, hasPieceFinished, playerHasFinished } = MovePieces(activePlayer, piecesPosOfPlayers, payload, diceNum[activePlayer]);
                if (hasCutAnotherPiece) {
                    cutSound.play();
                }
                // if player has finished then change active player.
                if (playerHasFinished) {
                    let tempPlayerFinishedOrder = playerFinishedOrder;
                    tempPlayerFinishedOrder.push(activePlayer);
                    const newUpdatedPlayer = ChangeActivePlayer(activePlayer, tempPlayerFinishedOrder);
                    const updatedGame = new Game(updatedPos, diceNum, newUpdatedPlayer, CanMove, false, gameFinished, tempPlayerFinishedOrder, quitGame, 'allowed');
                    setGame(updatedGame);
                }
                // if the dice number was 6 or the player has cut piece of other player then curr player get extra one move.
                else if (hasCutAnotherPiece || (diceNum[activePlayer] == 6 && !playerHasFinished && hasMoved) || (hasPieceFinished && !playerHasFinished)) {
                    const updatedGame = new Game(updatedPos, diceNum, activePlayer, CanMove, false, false, playerFinishedOrder, quitGame, 'allowed');
                    setGame(updatedGame);
                }
                // if piece has moved then change active player.
                else if (hasMoved) {
                    const newActivePlayer = ChangeActivePlayer(activePlayer, playerFinishedOrder);
                    const updatedGame = new Game(updatedPos, diceNum, newActivePlayer, CanMove, false, gameFinished, playerFinishedOrder, quitGame, 'allowed');
                    setGame(updatedGame);
                }
            }
        }
        // action type reset game
        if (action == 'reset') {
            const newGame = new Game();
            setGame(newGame);
        }
        // action type go back.
        if (action == 'goback') {
            const updatedGame = new Game(piecesPosOfPlayers, diceNum, activePlayer, canMove, allowedToMove, gameFinished, playerFinishedOrder, true, allowedToRoll);
            setGame(updatedGame);
        }
        // action type cancelgoback
        if (action == 'cancelgoback') {
            const updatedGame = new Game(
                piecesPosOfPlayers, diceNum, activePlayer, canMove, allowedToMove, gameFinished, playerFinishedOrder, false, allowedToRoll
            );
            setGame(updatedGame);
        }

    }
    // this effect run to check if game is finished.
    useEffect(() => {
        if (game.playerFinishedOrder.length > 2 && !game.gameFinished) {
            const updatedGame = new Game(game.piecesPosOfPlayers, game.diceNum, game.activePlayer, game.canMove, game.allowedToMove, true, game.playerFinishedOrder, game.quitGame, game.allowedToRoll);
            setGame(updatedGame);
        }
    }, [game])

    return { game, updateGame };
} 