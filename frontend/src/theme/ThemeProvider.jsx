import { useMemo, useState } from "react";
import { getTheme } from "./tokens";
import ThemeContext from "../context/ThemeContext";

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState("dark");

    const toggleTheme = () => {
        setMode((previous) => (previous === "dark" ? "light" : "dark"));
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}