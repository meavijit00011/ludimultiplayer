import { BoardHeight, BoardWidth, PlayerColors, TileMap } from "../constants.ts";
import { PlayerColorsType, TileMapType } from "../types";

export class Board {
    tileHeight: number;
    tileWidth: number;
    boardHeight: number;
    boardWidth: number;
    tileMap: TileMapType;
    playerColors: PlayerColorsType;
    centerBorderSize: number;
    constructor(boardHeight?: number, boardWidth?: number, playerColors?: PlayerColorsType, tileMap?: TileMapType) {
        this.boardHeight = boardHeight || BoardHeight;
        this.boardWidth = boardWidth || BoardWidth;
        this.tileHeight = (() => this.boardHeight / 15)();
        this.tileWidth = (() => this.boardWidth / 15)();
        this.tileMap = tileMap || TileMap;
        this.playerColors = playerColors || PlayerColors;
        this.centerBorderSize = (() => this.boardHeight / 10)();
    }
}