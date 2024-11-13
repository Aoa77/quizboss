import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../code/style";

interface Style {
    section: CSSProperties;
    digits: CSSProperties;
}

export function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    return {
        section: {
            opacity: 1,
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuestionTimer_NORMAL_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(4),
            marginTop: CssUnit.cqh(39),
            backgroundColor: "#ff00ff00",
        },
        digits: {
            opacity: 0,
            backgroundColor: "#00ffff00",
            display: "inline-block",
        },
    };
}
