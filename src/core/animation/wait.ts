import { getSpeedMultiplier } from "./useAnimationFactory";

///
export function wait(duration: number): Promise<void> {
    duration *= getSpeedMultiplier();
    return new Promise((resolve) => setTimeout(resolve, duration));
}
