import { useContext } from 'react'
import { TileType } from '../types'
import PrintContentOnTile from '../utils/PrintContentOnTile'
import { BoardCtx } from '../context/BoardCtx'
import { GameCtx } from '../context/GameCtx'
import { PlayerActiveAnimatingTiles } from '../constants'
import './Tile.css';
const Tile = ({ tile }: { tile: TileType }) => {
    const { tileHeight, tileWidth, playerColors } = useContext(BoardCtx);
    const { game,updateGame } = useContext(GameCtx);
    const { canMove, piecesPosOfPlayers, activePlayer } = game;
    const style = {
        height: `${tileHeight}px`,
        width: `${tileWidth}px`,
        border: tile.border ? '1px solid grey' : '',
        backgroundColor: tile.color,
        position: 'relative' as 'relative'
    }
    // tile animation for curr active player.
    const animatingTilesForCurrPlayer = PlayerActiveAnimatingTiles[activePlayer];
    let classList = ''
    if (animatingTilesForCurrPlayer.indexOf(tile.id) != -1) {
        classList = 'tile_animate';
    }
    const handleClick = ()=>{
      updateGame('move_piece',tile.id);
    }
    return (
        <div onClick={handleClick} className={classList} style={style}>{PrintContentOnTile(tile.id, tileHeight, tileWidth, playerColors, canMove, piecesPosOfPlayers, activePlayer)}</div>
    )
}

export default Tile