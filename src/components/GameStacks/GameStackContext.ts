import { createContext, useContext } from "react";
import { GameStack } from "../../App";



export const GameStackContext = createContext<GameStack | undefined>(undefined);

export function useGameStackContext() {
    const gameStack = useContext(GameStackContext);

    if (gameStack === undefined)    {
   throw new Error("useGameStackContext must be used with a GameStackContext");
    }

    return gameStack;
}

