export enum ThemeFont {
    cursive = `"Rosarivo", cursive`,
    mono = `"Share Tech Mono", "Courier New", monospace`,
    sans = `"Strait", "Tahoma", sans-serif`,
    serif = `"Garamond", serif`,
}

export enum ThemeName {
    dark = "dark",
    light = "light",
}

export function parseThemeName(
    value: string | undefined | null,
    defaultValue: ThemeName,
): ThemeName {
    if (!value) {
        return defaultValue;
    }
    switch (value.toLowerCase().trim()) {
        case ThemeName.dark:
            return ThemeName.dark;
        case ThemeName.light:
            return ThemeName.light;
        default:
            return defaultValue;
    }
}

export enum TV {
    ///
    BODY_backgroundColor                 = "--tv-BODY_backgroundColor",
    MAIN_backgroundColor                 = "--tv-MAIN_backgroundColor",

    ///
    GuessPoints_CORRECT_color             = "--tv-GuessPoints_CORRECT_color",
    GuessPoints_WRONG_color            = "--tv-GuessPoints_WRONG_color",

    ///
    GuessButton_CORRECT_backgroundColor  = "--tv-GuessButton_CORRECT_backgroundColor",
    GuessButton_CORRECT_borderColor      = "--tv-GuessButton_CORRECT_borderColor",
    GuessButton_CORRECT_color            = "--tv-GuessButton_CORRECT_color",

    ///
    GuessButton_DIMMED_backgroundColor   = "--tv-GuessButton_DIMMED_backgroundColor",
    GuessButton_DIMMED_borderColor       = "--tv-GuessButton_DIMMED_borderColor",
    GuessButton_DIMMED_color             = "--tv-GuessButton_DIMMED_color",

    ///
    GuessButton_NORMAL_backgroundColor   = "--tv-GuessButton_NORMAL_backgroundColor",
    GuessButton_NORMAL_borderColor       = "--tv-GuessButton_NORMAL_borderColor",
    GuessButton_NORMAL_color             = "--tv-GuessButton_NORMAL_color",

    ///
    GuessButton_REVEAL_backgroundColor   = "--tv-GuessButton_REVEAL_backgroundColor",
    GuessButton_REVEAL_borderColor       = "--tv-GuessButton_REVEAL_borderColor",
    GuessButton_REVEAL_color             = "--tv-GuessButton_REVEAL_color",

    ///
    GuessButton_WRONG_backgroundColor    = "--tv-GuessButton_WRONG_backgroundColor",
    GuessButton_WRONG_borderColor        = "--tv-GuessButton_WRONG_borderColor",
    GuessButton_WRONG_color              = "--tv-GuessButton_WRONG_color",

    ///
    LoadingSpinner_fill                  = "--tv-LoadingSpinner_fill",
    LoadingSpinner_color                 = "--tv-LoadingSpinner_color",
    
    ///
    QuestionImage_shadow                 = "--tv-QuestionImage_shadow",
    QuestionText_color                   = "--tv-QuestionText_color",

    ///
    QuestionTimer_NORMAL_color           = "--tv-QuestionTimer_NORMAL_color",
    QuestionTimer_GOOD_color             = "--tv-QuestionTimer_GOOD_color",
    QuestionTimer_BAD_color              = "--tv-QuestionTimer_BAD_color",
    
    ///
    QuizProgress_color                   = "--tv-QuizProgress_color",
    QuizTitle_color                      = "--tv-QuizTitle_color",
}
