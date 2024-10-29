import anime, { AnimeParams } from "animejs";
import { createRef } from "react";
import { AnimeContext, AnimeRefObject } from "./AnimeContext";
import { TransformRegex } from "./AnimeContext.constants";
import { AnimeTask } from "./AnimeTask";

export function useAnimeRef<T extends string>(id: T): AnimeRefObject {
    return useAnimeRefs(id, 1)[0];
}

export function useAnimeRefs<T extends string>(
    baseId: T,
    count: number,
): AnimeRefObject[] {
    const animRefs: AnimeRefObject[] = [];
    for (let i = 0; i < count; i++) {
        const id = `${baseId}-${i}`;
        const target = `#${id}`;
        const ref = createRef<HTMLElement>();

        const obj: AnimeRefObject = {
            id,
            ref,
            target,
            get opacity(): number | null {
                const el = this.ref.current as HTMLElement;
                const value = parseFloat(el?.style?.opacity ?? "-1");
                return value >= 0 ? value : null;
            },
            set opacity(value: number) {
                const el = this.ref.current as HTMLElement;
                el.style.opacity = value.toString();
            },
            get scale(): number | null {
                const el = this.ref.current as HTMLElement;
                const transform = el?.style?.transform;
                const scale = transform?.match(TransformRegex.scale);
                if (!scale) {
                    return null;
                }
                const value = parseFloat(scale?.[1] ?? "-1");
                return value >= 0 ? value : null;
            },
            set scale(value: number) {
                const el = this.ref.current as HTMLElement;
                el.style.transform = el.style.transform.replace(
                    TransformRegex.scale,
                    `scale(${value})`,
                );
            },
            build(params: AnimeParams) {
                return anime({
                    targets: target,
                    ...params,
                });
            },
            run(params: AnimeParams) {
                return AnimeTask.run(this.build(params));   
            }
        };
        AnimeContext.set(baseId, obj, i);
        animRefs.push(obj);
    }
    return animRefs;
}
