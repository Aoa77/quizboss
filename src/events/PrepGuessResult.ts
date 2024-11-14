import { AppContext } from "../game/context";
import { AppEvent } from "../game/events";
import { ButtonState } from "../game/buttons";

export async function PrepGuessResult() {
    const { state, flow } = AppContext.current(AppEvent.PrepGuessResult);
    const { buttonAnswerMap, guessButtonIndex, correctAnswerButtonIndex } =
        state;
    let { itemScore } = state;
    buttonAnswerMap.forEach((_item, idx) => {
        const item = _item!;
        if (idx === guessButtonIndex) {
            if (idx === correctAnswerButtonIndex) {
                item.buttonStyle = ButtonState.correct;
                return;
            }
            --itemScore;
            item.buttonStyle = ButtonState.wrong;
            return;
        }
        if (item.buttonStyle === ButtonState.normal) {
            item.buttonStyle = ButtonState.dimmed;
            return;
        }
    });

    flow.dispatch((state) => ({
        ...state,
        buttonAnswerMap,
        itemScore,
        eventName: AppEvent.RevealGuessResult,
    }));
}
