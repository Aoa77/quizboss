import ButtonElement from "../elements/buttons/ButtonElement";
import ElementController from "../elements/ElementController";
import QuizItem from "../state/QuizItem";


export default function revealCorrectAnswer(
    correctButton: ButtonElement,
    correctButtonRef: HTMLButtonElement,
    currentItem: QuizItem,
    elements: ElementController,
    guessButtons: ButtonElement[],
    wrongGuesses: number[]
): void {
    for (let i = 0; i < guessButtons.length; i++) {
        if (wrongGuesses.includes(i)) {
            continue;
        }
        const guessButton = guessButtons[i];
        correctButton = guessButton;
        correctButtonRef = correctButton.ref.current!;
        currentItem.answeredCorrectly = true;
        break;
    }
    elements.blinkButton(correctButtonRef!);
}
