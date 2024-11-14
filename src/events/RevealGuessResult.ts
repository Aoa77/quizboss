import { AppContext } from "../core/context";
import { Anim } from "../animations";
import { AppEvent } from "../core/events";
import { ButtonState } from "../core/buttons";
import { TV } from "../core/themes";
import { $time, $ease, TimerStatus } from "../libs/anime-context";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { concludeFinalGuess } from "../animations/concludeFinalGuess";

export async function RevealGuessResult() {
    const { state, flow, timer } = AppContext.current(
        AppEvent.RevealGuessResult,
    );
    const { buttonAnswerMap, guessButtonIndex } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;

    const buttonRef = Anim.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: [1.0, 1.3],
        delay: 0,
        duration: $time.ticks(0.25),
        endDelay: 0,
        easing: $ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonState.wrong) {
        flow.dispatch((state) => ({
            ...state,
            eventName: AppEvent.ConcludeWrongGuess,
        }));
        return;
    }

    ///
    await timer.stop();
    const { secondsRemaining } = timer;

    const anim = Anim.QuestionTimer;
    let tv = TV.QuestionTimer_GOOD_color;
    if (timer.status === TimerStatus.TimedOut) {
        tv = TV.QuestionTimer_BAD_color;
    } else if (button.buttonStyle === ButtonState.reveal) {
        tv = TV.QuestionTimer_BAD_color;
    }
    anim.immediate({ color: ThemeVars.getRef(TV, tv) });

    ///
    const { itemScore } = state;
    let { quizScore } = state;
    _logScoreDetails(itemScore, quizScore, secondsRemaining);

    ///
    await concludeFinalGuess(
        buttonRef,
        buttonAnswerMap,
        guessButtonIndex,
        itemScore,
    );
    quizScore += itemScore;
    if (itemScore > 0) {
        quizScore += secondsRemaining;
    }
    flow.dispatch((state) => ({
        ...state,
        quizScore,
        eventName: AppEvent.ConcludeQuestion,
    }));
}

function _logScoreDetails(
    itemScore: number,
    quizScore: number,
    secondsRemaining: number,
) {
    console.group("SCORE DETAILS");
    console.info("itemScore", itemScore);
    console.info("quizScore", quizScore);
    console.info("secondsRemaining", secondsRemaining);
    console.groupEnd();
}
