import { AnimeParams } from "animejs";
import { EASING } from "./easings";
import { AnimationDefaultSettings } from "./config";
import { ScaleParams } from "./params";

export function scaleTo(p: ScaleParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration ?? AnimationDefaultSettings.config.scaleDuration,
        scale: p.scale,
    };
    if (p.easing) {
        params.easing = p.easing;
    }
    if (p.delay) {
        params.delay = p.delay;
    }
    if (p.endDelay) {
        params.endDelay = p.endDelay;
    }
    return params;
}

export function scaleImmediately(scale: number): AnimeParams {
    return scaleTo({ duration: 0, easing: EASING.linear, scale });
}


