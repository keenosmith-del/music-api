import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const dark = theme.mode === "dark";

    return (
        <button
            onClick={toggleTheme}
            style={{
                width: 40,
                height: 22,

                border: "none",
                outline: "none",
                cursor: "pointer",

                padding: 3,

                borderRadius: 9999,

                background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.45)",

                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",

                boxShadow: dark
                    ? "0 4px 18px rgba(0,0,0,0.25)"
                    : "0 4px 18px rgba(0,0,0,0.08)",

                transition: "all .25s ease",

                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: 20,
                    height: 20,

                    borderRadius: "50%",

                    background: dark
                        ? "rgba(240,240,235,0.95)"
                        : "rgba(40,40,40,0.85)",

                    transform: dark
                        ? "translateX(0)"
                        : "translateX(16px)",

                    transition: "all .25s ease",
                }}
            />
        </button>
    );
}