import { FlowContext } from "../../../../src/libs/flow-context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { wait } from "../../../core/animation/wait";
import { DemoMode } from "../../../../src/models/DemoMode";
import { TIME } from "../../constants/TIME";
import { EventName } from "../../../../src/models/EventName";

export async function onAwaitInput() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        //info("waiting for player input...");
        return;
    }

    //info("waiting for DEMO input...");
    await wait(TIME.DEMO_DELAY);

    // const spotButton = doDemoInput(state.answerButtonIndex, demoMode);
    setState({
        ...state,
        guessValue: "",//spotButton.dataValue,
        eventName: EventName.ShowGuessResult,
    });
}
