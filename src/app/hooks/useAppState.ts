import { Dispatch, SetStateAction } from "react";
import { useStateFlow } from "../../core/hooks/useStateFlow";
import { AppState, createInitialState } from "../models/AppState";
import { GameState } from "../models/GameState";
import { onGameOver } from "../events/onGameOver";
import { onInit } from "../events/onInit";
import { onInput } from "../events/onInput";
import { onLoaded } from "../events/onLoaded";
import { onNext } from "../events/onNext";
import { onReady } from "../events/onReady";
import { onResult } from "../events/onResult";
import { AppSettings } from "../models/AppSettings";

///
let isLocalStorageInitialized = false;

///
export function useAppState(
    settings: AppSettings,
): [AppState, Dispatch<SetStateAction<AppState>>] {

    const flow = useStateFlow<AppState, GameState>({
        initialState: createInitialState(settings),
        getFlowEvent: (state) => {
            return state.gameState;
        },
        eventHandlers: new Map<GameState, (state: AppState) => void>([
            [GameState.INIT, onInit],
            [GameState.READY, onReady],
            [GameState.LOADING, onLoaded],
            [GameState.NEXT, onNext],
            [GameState.INPUT, onInput],
            [GameState.RESULT, onResult],
            [GameState.GAMEOVER, onGameOver],
        ]),
    });

    //////////////////
    if (isLocalStorageInitialized) {
        return flow;
    }
    isLocalStorageInitialized = true;

    ////////////
    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        const [state, setState] = flow;
        setState({ ...state, best: parseInt(local) });
    }

    //////////////////
    return flow;
}


