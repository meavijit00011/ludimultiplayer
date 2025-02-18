import { createContext, ReactNode } from "react";
import { Game } from "../classes/Game";
import { GameContextType } from "../types";
import useUpdateGame from "../hooks/UpdateGame";
const init_game = new Game()
export const GameCtx = createContext<GameContextType>({ game: init_game, updateGame: () => { } });

export default function GameCtxProvider({ children }: { children: ReactNode }) {
    const { game, updateGame } = useUpdateGame();
    return <GameCtx.Provider value={{ game, updateGame }}>{children}</GameCtx.Provider>
}