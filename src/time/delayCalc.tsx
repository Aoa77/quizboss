import { Duration } from "./Duration";
import GLOBAL from "./GLOBAL";
import { Multiplier } from "./Multiplier";

export default function delayCalc(
    duration: Duration,
    multiplier: Multiplier,
): number {
    if (duration <= 0) {
        throw new Error("Delay duration must be greater than 0.");
    }
    if (multiplier <= 0) {
        throw new Error("Delay multiplier must be greater than 0.");
    }
    return (duration * multiplier) * GLOBAL.DurationMultiplier;
}
