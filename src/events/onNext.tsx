import { Context } from "../context/Context";
import { GameState } from "../context/GameState";
import { GuessButtonState } from "../context/GuessButtonState";
import { QuizItem } from "../context/QuizModule";
import { delay, hideElementRef, randomInt, showElementRef } from "../utilities";

var randomizedGuessPoolIndex: number = -1;
///
export async function onNext(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = context;

    if (quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const quizData = quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const randomizedGuessPool = quizData.randomizedGuessPool;
    let currentGuessPool: string[] = [];

    hideElementRef(elements.loading);
    showElementRef(elements.buttons);
    showElementRef(elements.image);
    showElementRef(elements.question);
    showElementRef(elements.score);
    showElementRef(elements.progress);

    const answerSpot = randomInt(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let choiceSpot = 0; choiceSpot < guessButtonCount; choiceSpot++) {
        let itemAtChoiceSpot = currentItem;

        if (choiceSpot !== answerSpot) {
            itemAtChoiceSpot = selectRandomQuestionChoice();
        }

        currentGuessPool.push(itemAtChoiceSpot.key);
        assignQuestionToChoiceSpot(choiceSpot, itemAtChoiceSpot);
    }

    if (config.demoMode) {
        const spotButton = guessButtons[answerSpot].ref.current!;
        await delay(config.nextDelay);
        context.setGuessValue(spotButton.value);
        setGameState(GameState.RESULT);
        return;
    }

    setGameState(GameState.INPUT);
    return;

    function assignQuestionToChoiceSpot(
        choiceSpot: number,
        itemAtChoiceSpot: QuizItem,
    ) {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = itemAtChoiceSpot.name;
        spotButton.value = itemAtChoiceSpot.key;
        spotButton.className = GuessButtonState.NORMAL;
    }

    function selectRandomQuestionChoice(): QuizItem {
        let failSafeCounter = 0;
        while (++failSafeCounter < randomizedGuessPool.length + 2) {
            if (++randomizedGuessPoolIndex === randomizedGuessPool.length) {
                randomizedGuessPoolIndex = 0;
            }
            const choiceItem = randomizedGuessPool[randomizedGuessPoolIndex];
            if (choiceItem.answeredCorrectly) {
                continue;
            }
            if (choiceItem.duplicateItemKeys.includes(currentItem.key)) {
                continue;
            }
            if (currentGuessPool.includes(choiceItem.key)) {
                continue;
            }
            return choiceItem;
        }
        throw new Error("Failed to find a question choice.");
    }
}
