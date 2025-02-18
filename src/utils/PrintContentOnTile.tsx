import { ReactNode } from 'react'
import { CanMoveType, PiecesPosType, PlayerColorsType, PlayerPosType, PlayersType } from '../types';
import { CiStar } from "react-icons/ci";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
const arrows = [<FaLongArrowAltUp />,
<FaLongArrowAltRight />, <FaLongArrowAltDown />, <FaLongArrowAltLeft />]
import { ArrowTiles, PlayerPiecesDefaultPos, StarTiles } from '../constants';
import Piece from '../components/Piece';
let starStyle = {
    position: 'absolute' as 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: ''
};
let defaultPosStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: '#f5eef8',
    borderRadius: '50%',
    position: 'absolute' as 'absolute',
    top: '',
    zIndex: 1,
    left: '',
};
const defaultPosStyleCalc = (defaultInd: number) => {
    let calcStyle = defaultPosStyle;
    if (defaultInd == 0 || defaultInd == 1) {
        calcStyle = {
            ...calcStyle,
            top: '-3px'
        }
    }
    else {
        calcStyle = {
            ...calcStyle,
            top: '3px'
        }
    }
    if (defaultInd == 0 || defaultInd == 2) {
        calcStyle = {
            ...calcStyle,
            left: '-3px'
        }
    }
    else {
        calcStyle = {
            ...calcStyle,
            left: '3px'
        }
    };
    return calcStyle;
};
const checkIfThisIsDefaultPos = (tileId: number): number | null => {
    if (Object.values(PlayerPiecesDefaultPos.player1).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player1).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player2).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player2).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player3).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player3).indexOf(tileId);
    };
    if (Object.values(PlayerPiecesDefaultPos.player4).indexOf(tileId) != -1) {
        return Object.values(PlayerPiecesDefaultPos.player4).indexOf(tileId);
    }
    return null;
};
const checkForRotation = (tileId: number) => {
    let deg = 0;
    if ((tileId > 89 && tileId < 135 && tileId != 127 && tileId != 97)) {
        deg = 90;
    };
    return deg;
}
const PrintContentOnTile = (id: number, th: number, tw: number, PlayerColors: PlayerColorsType, canMove: CanMoveType, piecesPos: PlayerPosType, activePlayer: PlayersType): ReactNode => {
    let div = <div></div>
    // 1.check if star can be printed on the tile.
    for (let i = 0; i < 4; i++) {
        if (StarTiles[i] == id) {
            div = <div style={starStyle}><CiStar size={30} color='#cacfd2' /></div>
        }
    }
    // 2. check if arrow can be printed on that tile.
    for (let i = 0; i < 4; i++) {
        if (Object.values(ArrowTiles)[i] == id) {
            let tempStarStyle = { ...starStyle };
            tempStarStyle.color = PlayerColors[`player${i + 1}` as keyof typeof PlayerColors].defaultColor;
            div = <div style={tempStarStyle}>{arrows[i]}</div>
        }
    }
    // 3. check if this is a default piece's position tile.
    for (let i = 1; i <= 4; i++) {
        const playerId = `player${i}` as PlayersType;
        for (let j = 1; j <= 4; j++) {
            const pieceId = `p${j}` as keyof PiecesPosType;
            const currPos = PlayerPiecesDefaultPos[playerId][pieceId];
            // if this is default position tile.
            if (currPos == id) {
                div = <div style={defaultPosStyleCalc(j - 1)}></div>
            }
        }
    }
    // 4.Print Pieces....
    // find how many pieces exist on that tile.
    let tempPiecesArr: { piecePosType: string, playerId: PlayersType, pieceInd: number, thisPieceCanMove: boolean }[] = [];
    for (let i = 1; i <= 4; i++) {
        const currPlayer = `player${i}` as PlayersType;
        const currPlayerPos = piecesPos[currPlayer];
        for (let j = 1; j <= 4; j++) {
            const pieceId = `p${j}` as keyof PiecesPosType;
            const piecePos = currPlayerPos[pieceId];
            let ifDefaultPos = checkIfThisIsDefaultPos(piecePos);
            if (ifDefaultPos != null && piecePos == id) {
                if (currPlayer == activePlayer && canMove[j-1]) {
                    tempPiecesArr.push({ piecePosType: 'default', playerId: currPlayer, pieceInd: j, thisPieceCanMove: true })
                }
                else {
                    tempPiecesArr.push({ piecePosType: 'default', playerId: currPlayer, pieceInd: j, thisPieceCanMove: false })
                }

            }
            else if (piecePos == id) {
                if (currPlayer == activePlayer && canMove[j-1]) {
                    tempPiecesArr.push({ piecePosType: 'normal', playerId: currPlayer, pieceInd: j, thisPieceCanMove: true })
                }
                else {
                    tempPiecesArr.push({ piecePosType: 'normal', playerId: currPlayer, pieceInd: j, thisPieceCanMove: false })
                }
            }
        }
    };
    // print it one by one.
    div = <div style={{ height: '100%', width: '100%' }}>
        {div}
        {<div style={{ zIndex: 1000, position: 'relative', height: '100%', width: '100%', transform: `rotate(${checkForRotation(id)}deg)` }}>{tempPiecesArr.map((piece, ind) => {
            let size = piece.piecePosType == "default" ? th : 15;
            tempPiecesArr.length > 2 ? size = 12 : null;
            const color = PlayerColors[piece.playerId].pieceColor;
            let style = {};
            const spaceLeft = (tw - ((tempPiecesArr.length - 1) * 4) - size) / 2;
            const spaceFromTop = (tw - size) / 2 - 1;
            if (piece.piecePosType == 'default') {
                style = defaultPosStyleCalc(piece.pieceInd - 1);
            }
            else {
                style = {
                    height: `${size}px`,
                    width: `${size}px`,
                    position: 'absolute' as 'absolute',
                    left: `${(spaceLeft + ind * 4) - .5}px`,
                    top: `${spaceFromTop}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: piece.thisPieceCanMove ? '1px solid cyan' : '1px solid transparent',
                    borderRadius: '50%',
                    zIndex:piece.thisPieceCanMove? '1000' : ''
                }
            }
            return <Piece rotate={piece.thisPieceCanMove} style={style} color={color} size={size} key={Math.random()}></Piece>
        })}</div>}

    </div>

    return div;
}

export default PrintContentOnTile