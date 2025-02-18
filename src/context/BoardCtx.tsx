import { createContext, ReactNode } from 'react';
import { Board } from '../classes/Board';
let board;
const windowWidth = window.innerWidth;
if (windowWidth < 500) {
    board = new Board(windowWidth - 10, windowWidth - 10);
}
else {
    board = new Board();
}
export const BoardCtx = createContext<Board>(board)
const BoardCtxProvider = ({ children }: { children: ReactNode }) => {
    return <BoardCtx.Provider value={board}>{children}</BoardCtx.Provider>
}

export default BoardCtxProvider;