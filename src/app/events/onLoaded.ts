import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../constants/elements";
import { GameState } from "../models/GameState";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { fadeIn, fadeOut } from "../constants/fade";
import { wait } from "../../core/xobjs/Xanimation";
import { LOADING, PAUSE } from "../constants/times";
import { scaleBase, scaleScore } from "../constants/scale";

export async function onLoaded() {
    const [state, setState] = getAppState();
    const [loading, image, score] = getElementDivs(
        ELEMENT.loading,
        ELEMENT.image,
        ELEMENT.scoreValue,
    );

    if (state.quizModule === null) {
        return;
    }
    await wait(PAUSE.NORMAL);

    if (state.award > 0) {
        await score.runAnimation(scaleScore(240, 125, "linear"));
        score.startAnimation(scaleBase(42));
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    while (!currentItem || !currentItem.isLoaded) {
        await wait(LOADING.POLL);
    }

    await Promise.all([
        loading.runAnimation(fadeOut()),
        image.runAnimation(fadeIn()),
    ]);
 
    setState({ ...state, gameState: GameState.NEXT });
}
