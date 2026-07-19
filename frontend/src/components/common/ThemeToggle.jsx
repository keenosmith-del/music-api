import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const dark = theme.mode === "dark"

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: "relative",

                width: 150,
                height: 38,

                border: "none",
                outline: "none",
                cursor: "pointer",

                padding: 4,

                borderRadius: 9999,

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                background:
                    theme.mode === "dark"
                        ? "rgba(50, 50, 50, 0)"
                        : "rgba(225, 18, 18, 0)",

                boxShadow:
                    theme.mode === "dark"
                        ? "0 6px 18px rgba(0,0,0,0.22)"
                        : "0 1px 2px rgba(0,0,0,0.05)",

                transition: "all 220ms ease",
            }}
        >
            {/* Glass Lens toggle buttn*/}
            <div
                style={{
                    position: "absolute",

                    top: 4,

                    left: dark ? 4 : 85,

                    width: 60,
                    height: 30,

                    borderRadius: 9999,

                    background: dark
                        ? "rgba(16, 16, 16, 0)"
                        : "rgba(16, 16, 16, 0)",

                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",

                    border: dark
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(255, 255, 255, 0)",

                    boxShadow:
                        theme.mode === "dark"
                            ? "0 6px 18px rgba(0,0,0,0.22)"
                            : "0 1px 2px rgba(0,0,0,0.05)",

                    transition: "all 220ms ease",
                }}
            />

            {/* Moon = DARK */}
            <div
                style={{
                    // changes positioning of <Moon /> in pill 
                    width: 60,

                    display: "flex",
                    justifyContent: "center",

                    zIndex: 1,

                    transform: dark
                        ? "scale(0.88)"
                        : "scale(1.15)",

                    opacity: dark ? 1 : 0.35,

                    transition: "all 220ms ease",
                }}
            >
                <Moon
                    size={18}
                    strokeWidth={1}
                    color={theme.colors.text}
                />
            </div>

            {/* Sun = LIGHT */}
            <div
                style={{
                    width: 60,

                    display: "flex",
                    justifyContent: "center",

                    zIndex: 1,

                    transform: dark
                        ? "scale(1.15)"
                        : "scale(0.88)",

                    opacity: dark ? 0.35 : 1,

                    transition: "all 220ms ease",
                }}
            >
                <Sun
                    size={18}
                    strokeWidth={1.5}
                    color={theme.colors.text}
                />
            </div>
        </button>
    );
}