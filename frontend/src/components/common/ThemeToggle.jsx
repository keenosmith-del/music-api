import { useTheme } from "../../context/ThemeContext";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const dark = theme.mode === "dark";

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

                background: dark
                    ? "rgba(43,43,43,0.08)"
                    : "rgba(255,255,255,0.45)",

                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",

                boxShadow: dark
                    ? `
                0 6px 18px rgba(0,0,0,0.28),
                inset 0 1px 0 rgba(255,255,255,0.03)
              `
                    : `
                0 6px 18px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.8)
              `,

                transition: "all 220ms ease",
            }}
        >
            {/* Glass Lens toggle buttn*/}
            <div
                style={{
                    position: "absolute",

                    top: 4,

                    left: dark ? 4 : 84,

                    width: 60,
                    height: 30,

                    borderRadius: 9999,

                    background: dark
                        ? "rgba(255, 255, 255, 0.01)"
                        : "rgba(255,255,255,0.22)",

                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",

                    border: dark
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(255,255,255,0.7)",

                    boxShadow: dark
                        ? "0 6px 16px rgba(0,0,0,0.25)"
                        : `
                    0 8px 18px rgba(0,0,0,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `,

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