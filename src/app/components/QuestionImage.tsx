import { AppState, getCurrentItem } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { useElementDivs } from "../../core/xelemental/useElementDivs";

export function QuestionImage(state: AppState) {
    const [image] = useElementDivs(ELEMENT.image);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
