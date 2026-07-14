import { useTheme } from "../../context/ThemeContext";

export default function AppCanvas({ children }) {
    const { theme } = useTheme();

    const dark = theme.mode === "dark";

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                position: "relative",

                background: dark
                    ? "#090909"
                    : "#F4F4F2",

                transition: "background 350ms ease",
            }}
        >
            {children}
        </div>
    );
}