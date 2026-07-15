import GlassPanel from "./GlassPanel";

import { useTheme } from "../../context/ThemeContext";

export default function GlassMenu({
    open,
    top,
    left,
    width = 230,
    children,
}) {
    const { theme } = useTheme();

    const dark = theme.mode === "dark";
    return (

        <div
            style={{
                position: "fixed",

                top,
                left,

                width,

                opacity: open ? 1 : 0,

                transform: open
                    ? "translateY(0)"
                    : "translateY(8px)",

                pointerEvents: open ? "auto" : "none",

                transition: "opacity 180ms ease, transform 180ms ease",

                zIndex: 500,
            }}
        >
            <div
                style={{
                    padding: 12,

                    borderRadius: 24,

                    background: theme.colors.glass,
                    border: `1px solid ${theme.colors.glassBorder}`,

                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",

                    boxShadow: dark
                        ? `
                0 8px 32px rgba(0,0,0,0.35),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `
                        : `
                0 10px 35px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.7)
              `,
                }}
            >
                {children}
            </div>
        </div>
    );
}