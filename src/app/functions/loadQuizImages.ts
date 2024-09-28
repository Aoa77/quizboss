import { wait } from "../../core/xobjs/Xanimation";
import { LOADING } from "../constants/times";
import { QuizItem } from "../models/QuizItem";

export async function loadQuizImages(quizItems: QuizItem[]): Promise<void> {
    console.info("Loading quiz images...");
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await wait(LOADING.THROTTLE);
    }
}
