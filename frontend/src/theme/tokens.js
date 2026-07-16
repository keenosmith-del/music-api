import colors from "./colors";
import radius from "./radius";
import spacing from "./spacing";
import blur from "./blur";
import shadows from "./shadows";

import typography from "./typography";

export function getTheme(mode) {
    return {
        mode,
        colors: colors[mode],
        radius,
        spacing,
        blur,
        shadows: shadows[mode],
        typography,
    };
}