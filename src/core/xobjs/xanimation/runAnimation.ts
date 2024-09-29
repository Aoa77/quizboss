import anime, { AnimeParams } from "animejs";
import { applyTimePercentage } from "../../functions/applyPercentage";
import { getGlobalSpeed } from "./globalSpeed";

export function runAnimation(xp: AnimeParams): Promise<void> {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration, getGlobalSpeed());
    }
    ////
    const fin = anime(xp).finished;
    console.log({fin});
    return fin;
}

export function runAnimationSync(xp: AnimeParams): void {
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration, getGlobalSpeed());
    }
    anime(xp);
}